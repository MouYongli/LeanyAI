from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from minio.error import S3Error
from minio_client import upload_file, get_file

app = FastAPI()

@app.post("/upload/")
async def upload(file: UploadFile = File(...)):
    try:
        upload_file(file.file, file.filename, file.content_type)
        return {"msg": "上传成功", "filename": file.filename}
    except S3Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download/{filename}")
def download(filename: str):
    try:
        file_obj = get_file(filename)
        return StreamingResponse(file_obj, media_type="application/octet-stream")
    except S3Error:
        raise HTTPException(status_code=404, detail="文件不存在")
