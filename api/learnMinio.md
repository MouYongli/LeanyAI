
# MinIO 快速入门与开发教程

## 1. S3 与 MinIO 概念简介

### 什么是 S3？

S3（Simple Storage Service）是亚马逊云（AWS）推出的对象存储服务。它以“桶（Bucket）”为单位组织数据，支持大规模、弹性、高可用的数据存储。S3 的核心特性：

- **对象存储**：数据以对象形式存储，每个对象有唯一 key 和元数据。
- **桶（Bucket）**：对象的逻辑容器，类似于文件夹。
- **RESTful API**：通过 HTTP API 进行数据的上传、下载、管理。
- **高可用与扩展性**：适合大规模数据存储。

S3 已成为对象存储的事实标准，许多第三方存储系统（如 MinIO）都兼容 S3 API。

### 什么是 MinIO？

MinIO 是一个高性能、分布式的对象存储服务，完全兼容 Amazon S3 API。它常用于本地部署、私有云、混合云等场景，适合存储图片、视频、备份等非结构化数据。

- **对象存储**：以对象（Object）为单位存储数据，每个对象包含数据本身、元数据和唯一标识符。
- **Bucket（桶）**：类似于文件系统中的文件夹，用于组织和隔离对象。
- **兼容 S3 API**：可以用 S3 的 SDK 或工具访问 MinIO。

## 2. MinIO Python 客户端基本用法

本项目使用 [minio](https://github.com/minio/minio-py) Python SDK 进行对象存储操作。

### 2.1 连接 MinIO

```python
from minio import Minio
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
```

- `MINIO_ENDPOINT`：MinIO 服务地址。
- `MINIO_ACCESS_KEY`/`MINIO_SECRET_KEY`：访问密钥。
- `MINIO_BUCKET`：默认桶名。

### 2.2 Bucket 操作

#### 检查并创建 Bucket

```python
def ensure_bucket():
    if not client.bucket_exists(MINIO_BUCKET):
        client.make_bucket(MINIO_BUCKET)
```

- `bucket_exists(bucket)`：检查桶是否存在。
- `make_bucket(bucket)`：创建桶。

### 2.3 文件操作

#### 上传文件

```python
def upload_file(file_obj, filename, content_type="application/octet-stream"):
    ensure_bucket()
    file_obj.seek(0, os.SEEK_END)
    file_size = file_obj.tell()
    file_obj.seek(0)
    client.put_object(
        MINIO_BUCKET,
        filename,
        file_obj,
        length=file_size,
        part_size=10*1024*1024,
        content_type=content_type
    )
```

- `put_object(bucket, object_name, data, length, part_size, content_type)`：上传对象。
- `file_obj`：文件对象。
- `filename`：对象名（在桶中的文件名）。

#### 下载文件

```python
def get_file(filename):
    return client.get_object(MINIO_BUCKET, filename)
```

- `get_object(bucket, object_name)`：下载对象。

#### 列出文件

```python
def list_files():
    ensure_bucket()
    return [obj.object_name for obj in client.list_objects(MINIO_BUCKET)]
```

- `list_objects(bucket)`：列出桶内所有对象。

## 3. 开发建议

- **环境变量**：建议通过环境变量配置 MinIO 连接信息，便于开发和部署。
- **异常处理**：实际开发中建议捕获 `minio.error.S3Error` 等异常，提升健壮性。
- **桶命名规范**：桶名建议全小写，避免特殊字符。

## 4. 进阶阅读

- [MinIO 官方文档](https://docs.min.io/docs/)
- [minio-py SDK 文档](https://min.io/docs/minio/linux/developers/python/minio-py.html)

---

本教程结合本项目代码，帮助你边开发边理解 MinIO 的基本用法。建议在 `minio_client.py` 中多尝试不同的对象存储操作，加深理解。
