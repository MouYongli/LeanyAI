from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from minio.error import S3Error
from minio_service.minio_client import upload_file, get_file, list_files, delete_file

app = FastAPI()

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
