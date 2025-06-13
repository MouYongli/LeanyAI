"""
This is a FastAPI application that provides endpoints for service.
http://127.0.0.1:8000/

Minio Service Endpoints:
| Method | Endpoint             | Description         |
|--------|----------------------|---------------------|
| POST   | /upload/             | Upload a file       |
| DELETE | /delete/{filename}   | Delete a file       |
| GET    | /download/{filename} | Download a file     |
| GET    | /files/              | List files          |

Agent Service Endpoints:
| Method | Endpoint      | Description                        |
|--------|---------------|------------------------------------|
| GET    | /agent/       | Get the latest agent plan          |
| POST   | /agent/plan   | Generate plan based on user message|
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from minio.error import S3Error
from minio_service.minio_client import upload_file, get_file, list_files, delete_file
from agent.agent_service import generate_plan, get_latest_plan


# Define request model for message
class MessageRequest(BaseModel):
    message: str


app = FastAPI()
# Enable CORS for front-end requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------Minio Service Endpoints----------------------------
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

# ----------------------------Agent Service Endpoints----------------------------
# simple without any parameters
@app.get("/agent/")
def agent_service():
    return get_latest_plan()

# accept message from frontend and generate plan
@app.post("/agent/plan")
def agent_plan_service(request: MessageRequest):
    """
    Generate plan based on user message.
    Expects JSON body: {"message": "user message text"}
    """
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message is required")
    
    return generate_plan(goal=request.message)