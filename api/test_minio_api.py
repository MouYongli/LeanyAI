import os
import requests

BASE_URL = os.getenv("API_BASE_URL", "http://127.0.0.1:8000")


def test_upload():
    files = {'file': ('testfile.txt', b'hello minio', 'text/plain')}
    resp = requests.post(f"{BASE_URL}/upload/", files=files)
    assert resp.status_code == 200, resp.text
    print('Upload:', resp.json())


def test_list_files():
    resp = requests.get(f"{BASE_URL}/files/")
    assert resp.status_code == 200, resp.text
    print('Files:', resp.json())
    assert 'testfile.txt' in resp.json().get('files', [])


def test_delete_file():
    # 需要后端实现删除接口 /delete/{filename}
    resp = requests.delete(f"{BASE_URL}/delete/testfile.txt")
    assert resp.status_code == 200, resp.text
    print('Delete:', resp.json())


def main():
    test_upload()
    test_list_files()
    test_delete_file()
    print('All tests passed.')


if __name__ == "__main__":
    main()
