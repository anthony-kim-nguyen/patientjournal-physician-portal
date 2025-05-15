import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, Mock
from main import app

client = TestClient(app)
HEADERS = {"Authorization": "Bearer faketoken"}

@pytest.fixture
def patient_user():
    return {
        "username": "johnny",
        "role": "patient",
        "fhir_id": "Patient/123"
    }

@pytest.fixture
def practitioner_user():
    return {
        "username": "dr_house",
        "role": "practitioner",
        "fhir_id": "Practitioner/789"
    }

@pytest.fixture
def fhir_mock_response():
    mock = Mock()
    mock.content = b'{"id": "123", "resourceType": "Patient"}'
    mock.status_code = 200
    mock.headers = {"Content-Type": "application/fhir+json"}
    return mock

def test_patient_allowed_to_access_own_resource(patient_user, fhir_mock_response):
    with patch("controllers.fhir_proxy_controller.decode_token", return_value=patient_user), \
         patch("controllers.fhir_proxy_controller.requests.request", return_value=fhir_mock_response):

        res = client.get("/Patient/123", headers=HEADERS)
        assert res.status_code == 200
        assert res.json()["resourceType"] == "Patient"

def test_patient_forbidden_to_access_other_resource(patient_user):
    with patch("controllers.fhir_proxy_controller.decode_token", return_value=patient_user):
        res = client.get("/Patient/999", headers=HEADERS)
        assert res.status_code == 403
        assert res.json()["detail"] == "Access denied"

def test_practitioner_can_access_anything(practitioner_user, fhir_mock_response):
    with patch("controllers.fhir_proxy_controller.decode_token", return_value=practitioner_user), \
         patch("controllers.fhir_proxy_controller.requests.request", return_value=fhir_mock_response):

        res = client.get("/Patient/123", headers=HEADERS)
        assert res.status_code == 200
        assert res.json()["id"] == "123"

def test_invalid_token_rejected():
    with patch("controllers.fhir_proxy_controller.decode_token", side_effect=Exception("bad token")):
        res = client.get("/Patient/123", headers=HEADERS)
        assert res.status_code == 401
        assert res.json()["detail"] == "Invalid token"
