import asyncio
from tenacity import retry, stop_after_attempt, wait_random_exponential
from openai import AzureOpenAI, Stream
from openai.types.chat import ChatCompletion
from typing import Optional, List
from litellm import token_counter, cost_per_token
from ..core.registry import register_model
from .model_utils import Cost, cost_manager
from .model_configs import AzureOpenAIConfig
from .base_model import BaseLLM

@register_model(config_cls=AzureOpenAIConfig, alias=["azure_openai_llm", "azure_llm"])
class AzureOpenAILLM(BaseLLM):
    """
    Azure OpenAI LLM client.
    Uses Azure OpenAI endpoint, key, deployment and api_version from AzureOpenAIConfig.
    """
    def init_model(self):
        config: AzureOpenAIConfig = self.config
        # initialize Azure OpenAI client
        self._client = self._init_client(config)
        # ignore internal config fields and control params not accepted by Azure API
        self._default_ignore_fields = [
            "llm_type", "azure_key", "azure_endpoint", "api_version",
            "output_response", "stream"
        ]

    def _init_client(self, config: AzureOpenAIConfig):
        return AzureOpenAI(
            api_key=config.azure_key,
            azure_endpoint=config.azure_endpoint,
            api_version=config.api_version,
        )
    
    def formulate_messages(self, prompts: List[str], system_messages: Optional[List[str]] = None) -> List[List[dict]]:
        """
        Convert input prompts and optional system messages into Azure chat-completion message format.
        """
        if system_messages:
            assert len(prompts) == len(system_messages), (
                f"the number of prompts ({len(prompts)}) is different from the number of system_messages ({len(system_messages)})"
            )
        else:
            system_messages = [None] * len(prompts)
        messages_list: List[List[dict]] = []
        for prompt, sys_msg in zip(prompts, system_messages):
            msgs: List[dict] = []
            if sys_msg:
                msgs.append({"role": "system", "content": sys_msg})
            msgs.append({"role": "user", "content": prompt})
            messages_list.append(msgs)
        return messages_list

    def get_stream_output(self, response: Stream, output_response: bool = True) -> str:
        output = ""
        for raw_chunk in response:
            # Some responses yield (chunk,) tuples
            chunk = raw_chunk[0] if isinstance(raw_chunk, tuple) and raw_chunk else raw_chunk
            # ensure there is at least one choice and a delta
            if not getattr(chunk, 'choices', None) or not getattr(chunk.choices[0], 'delta', None):
                continue
            content = getattr(chunk.choices[0].delta, 'content', None)
            if not content:
                continue
            if output_response:
                print(content, end="", flush=True)
            output += content
        if output_response and output:
            print("")
        return output

    @retry(wait=wait_random_exponential(min=1, max=60), stop=stop_after_attempt(5))
    def single_generate(self, messages: List[dict], **kwargs) -> str:
        # Determine streaming vs non-streaming
        stream = kwargs.get("stream", self.config.stream)
        output_response = kwargs.get("output_response", self.config.output_response)
        # Prepare parameters, exclude internal control flags
        params = self.config.get_set_params(ignore=self._default_ignore_fields)
        params.pop('stream', None)
        params.pop('output_response', None)
        # override with any allowed kwargs
        for k, v in kwargs.items():
            if k in params:
                params[k] = v
        # Call Azure OpenAI API
        if stream:
            response = self._client.chat.completions.create(messages=messages, stream=True, **params)
            output = self.get_stream_output(response, output_response=output_response)
            cost = self._stream_cost(messages, output)
        else:
            response = self._client.chat.completions.create(messages=messages, **params)
            output = response.choices[0].message.content
            if output_response:
                print(output)
            cost = self._completion_cost(response)
        # Update cost metrics
        self._update_cost(cost)
        return output

    def batch_generate(self, batch_messages: List[List[dict]], **kwargs) -> List[str]:
        return [self.single_generate(messages=msgs, **kwargs) for msgs in batch_messages]

    def _completion_cost(self, response: ChatCompletion) -> Cost:
        input_tokens = response.usage.prompt_tokens
        output_tokens = response.usage.completion_tokens
        input_cost, output_cost = cost_per_token(
            model=self.config.model, prompt_tokens=input_tokens, completion_tokens=output_tokens
        )
        return Cost(input_tokens=input_tokens, output_tokens=output_tokens, input_cost=input_cost, output_cost=output_cost)

    def _stream_cost(self, messages: List[dict], output: str) -> Cost:
        model = self.config.model
        input_tokens = token_counter(model=model, messages=messages)
        output_tokens = token_counter(model=model, text=output)
        input_cost, output_cost = cost_per_token(
            model=model, prompt_tokens=input_tokens, completion_tokens=output_tokens
        )
        return Cost(input_tokens=input_tokens, output_tokens=output_tokens, input_cost=input_cost, output_cost=output_cost)

    def _update_cost(self, cost: Cost):
        cost_manager.update_cost(cost=cost, model=self.config.model)