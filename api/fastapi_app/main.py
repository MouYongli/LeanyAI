"""
This is a FastAPI application that provides endpoints for service.

api/example_service.py
This application allows users to create a service endpoint.
http://127.0.0.1:8000/example/
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from minio.error import S3Error
from minio_service.minio_client import upload_file, get_file, list_files, delete_file
from example_service import example_hello_world
from agent.agent_service import generate_plan


app = FastAPI()
# Enable CORS for front-end requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload(file: UploadFile = File(...)):
    try:
        upload_file(file.file, file.filename, file.content_type)
        return {"msg": "上传成功", "filename": file.filename}
    except S3Error as e:
        raise HTTPException(status_code=500, detail=str(e))


# 删除文件接口
@app.delete("/delete/{filename}")
def delete(filename: str):
    try:
        delete_file(filename)
        return {"msg": "删除成功", "filename": filename}
    except S3Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download/{filename}")
def download(filename: str):
    try:
        file_obj = get_file(filename)
        return StreamingResponse(file_obj, media_type="application/octet-stream")
    except S3Error:
        raise HTTPException(status_code=404, detail="文件不存在")

@app.get("/files/")
def show_files():
    try:
        files = list_files()
        return {"files": files}
    except S3Error as e:
        raise HTTPException(status_code=500, detail=str(e))

# create a example using the api.example_service.py template
@app.get("/example/")
def example_service():
    """
    Example service that returns a simple greeting.
    """
    return example_hello_world()

# simple without any parameters
@app.get("/agent/")
def agent_service():
    return generate_plan()