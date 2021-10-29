from .testconf import test_app


def test_get_exisiting_lichess_user(test_app):
    response = test_app.get("/api/dashboard/lichess_users/maia1")
    assert response.status_code == 200
    assert response.json() is not None


def test_get_non_existing_lichess_user(test_app):
    response = test_app.get("/api/dashboard/lichess_users/th1s9acc8doe8snt9exis1t")
    assert response.status_code == 200
    assert response.json() is None


