from minio import Minio
from minio.error import S3Error
import os

MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT", "localhost:9000")
MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY", "minioadmin")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY", "minioadmin")
MINIO_BUCKET = os.getenv("MINIO_BUCKET", "test")

client = Minio(
    MINIO_ENDPOINT,
    access_key=MINIO_ACCESS_KEY,
    secret_key=MINIO_SECRET_KEY,
    secure=False
)

def ensure_bucket():
    if not client.bucket_exists(MINIO_BUCKET):
        client.make_bucket(MINIO_BUCKET)

def upload_file(file_obj, filename, content_type="application/octet-stream"):
    ensure_bucket()
    client.put_object(
        MINIO_BUCKET,
        filename,
        file_obj,
        length=-1,
        part_size=10*1024*1024,
        content_type=content_type
    )

def get_file(filename):
    return client.get_object(MINIO_BUCKET, filename)
