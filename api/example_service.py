"""
template for an example service API.

services are defined in fastapi_app/main.py, then implemented in single service files like this one.

# This is a template for an example service API, return "hello world" when called.
"""

def example_hello_world():
    """
    Example service that returns a simple greeting.
    """
    return {"message": "Hello, world!"}