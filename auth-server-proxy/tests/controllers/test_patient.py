import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from main import app

client = TestClient(app)
HEADERS = {"Authorization": "Bearer faketoken"}

@pytest.fixture
def mock_patient_user():
    return {
        "username": "patientuser",
        "role": "patient",
        "fhir_id": "Patient/321"
    }

@pytest.fixture
def mock_practitioner_user():
    return {
        "username": "dr_strange",
        "role": "practitioner",
        "fhir_id": "Practitioner/789"
    }

def test_me_endpoint(mock_patient_user):
    with patch("controllers.patient_controller.decode_token", return_value=mock_patient_user), \
         patch("controllers.patient_controller.ensure_patient_role"), \
         patch("controllers.patient_controller.get_patient_resource", return_value={"id": "Patient/321"}):

        res = client.get("/me", headers=HEADERS)
        assert res.status_code == 200
        assert res.json()["id"] == "Patient/321"

def test_list_all_patients(mock_practitioner_user):
    with patch("controllers.patient_controller.decode_token", return_value=mock_practitioner_user), \
         patch("controllers.patient_controller.ensure_practitioner_role"), \
         patch("controllers.patient_controller.get_all_patients", return_value=[{"id": "Patient/1"}, {"id": "Patient/2"}]):

        res = client.get("/patients", headers=HEADERS)
        assert res.status_code == 200
        assert isinstance(res.json(), list)
        assert res.json()[0]["id"].startswith("Patient")

def test_list_single_patient_by_id(mock_practitioner_user):
    with patch("controllers.patient_controller.decode_token", return_value=mock_practitioner_user), \
         patch("controllers.patient_controller.ensure_practitioner_role"), \
         patch("controllers.patient_controller.get_patient_resource", return_value={"id": "Patient/123"}):

        res = client.get("/patients/123", headers=HEADERS)
        assert res.status_code == 200
        assert res.json()["id"] == "Patient/123"
