import os
import requests

FASTAPI_PORT = os.getenv("FASTAPI_PORT", "8302")
BASE_URL = os.getenv("API_BASE_URL", f"http://localhost:{FASTAPI_PORT}")

# Test constants
TEST_FILENAME = "testfile.txt"
TEST_CONTENT = b"hello minio"


def test_upload():
    files = {'file': ('testfile.txt', b'hello minio', 'text/plain')}
    resp = requests.post(f"{BASE_URL}/upload/", files=files)
    assert resp.status_code == 200, resp.text
    print('Upload:', resp.json())


def test_list_files():
    # upload test file before listing
    files = {'file': (TEST_FILENAME, TEST_CONTENT, 'text/plain')}
    up = requests.post(f"{BASE_URL}/upload/", files=files)
    assert up.status_code == 200, up.text
    # list files
    resp = requests.get(f"{BASE_URL}/files/")
    assert resp.status_code == 200, resp.text
    files_list = resp.json().get('files', [])
    print('Files:', files_list)
    assert TEST_FILENAME in files_list


def test_delete_file():
    # upload test file before deletion
    files = {'file': (TEST_FILENAME, TEST_CONTENT, 'text/plain')}
    up = requests.post(f"{BASE_URL}/upload/", files=files)
    assert up.status_code == 200, up.text
    # delete file
    resp = requests.delete(f"{BASE_URL}/delete/{TEST_FILENAME}")
    assert resp.status_code == 200, resp.text
    print('Delete:', resp.json())
    # verify deletion
    resp2 = requests.get(f"{BASE_URL}/files/")
    assert resp2.status_code == 200, resp2.text
    files_list = resp2.json().get('files', [])
    assert TEST_FILENAME not in files_list


def main():
    # test_upload()
    test_list_files()
    # test_delete_file()
    print('All tests passed.')


if __name__ == "__main__":
    main()
