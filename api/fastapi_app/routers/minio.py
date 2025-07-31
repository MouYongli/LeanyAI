"""
MinIO 文件存储相关的 API 路由

包含文件上传、下载、删除和列表功能的端点。
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from minio.error import S3Error
from minio_service.minio_client import upload_file, get_file, list_files, delete_file

router = APIRouter(
    tags=["files"],
    responses={404: {"description": "Not found"}},
)


@router.post("/upload/")
async def upload(file: UploadFile = File(...)):
    """
    上传文件到 MinIO 存储。
    
    - **file**: 要上传的文件
    
    返回上传结果信息。
    """
    try:
        upload_file(file.file, file.filename, file.content_type)
        return {"msg": "上传成功", "filename": file.filename}
    except S3Error as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/delete/{filename}")
def delete(filename: str):
    """
    删除指定的文件。
    
    - **filename**: 要删除的文件名
    
    返回删除结果信息。
    """
    try:
        delete_file(filename)
        return {"msg": "删除成功", "filename": filename}
    except S3Error as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/download/{filename}")
def download(filename: str):
    """
    下载指定的文件。
    
    - **filename**: 要下载的文件名
    
    返回文件流。
    """
    try:
        file_obj = get_file(filename)
        return StreamingResponse(file_obj, media_type="application/octet-stream")
    except S3Error:
        raise HTTPException(status_code=404, detail="文件不存在")


@router.get("/files/")
def show_files():
    """
    获取所有文件的列表。
    
    返回文件名列表。
    """
    try:
        files = list_files()
        return {"files": files}
    except S3Error as e:
        raise HTTPException(status_code=500, detail=str(e))