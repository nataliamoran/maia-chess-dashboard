from fastapi.testclient import TestClient
from .api_main import app

client = TestClient(app)


# quick checks
def test_get():
    response = client.get("/api/dashboard/tests")
    assert response.status_code == 200

test_get()