    ports:
      - "${FASTAPI_PORT}:8000"

${FASTAPI_PORT}在.env文件中定义。

environment是当前 service 要依赖或者使用的环境。

