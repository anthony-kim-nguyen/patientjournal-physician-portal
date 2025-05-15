import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

from main import app

client = TestClient(app)

FAKE_TOKEN = "Bearer faketoken"
HEADERS = {"Authorization": FAKE_TOKEN}

@pytest.fixture
def mock_patient_user():
    mock_user = {
        "sub": "antwonwonton",
        "role": "patient",
        "fhir_id": "216"
    }
    

    return mock_user

@pytest.fixture
def mock_practitioner_user():
    mock_user = {
        "sub": "drobama",
        "role": "practitioner",
        "fhir_id": "233"
        
    }

    return mock_user

@pytest.fixture
def careplan_data():
    return {
        "resourceType": "CarePlan",
        "status": "active",
        "subject": {"reference": "Patient/216"}
    }

def test_get_my_latest_careplan(mock_patient_user):
    with patch("controllers.careplan_controller.decode_token", return_value=mock_patient_user), \
         patch("controllers.careplan_controller.ensure_patient_role"), \
         patch("controllers.careplan_controller.get_my_latest_careplan_full", return_value={"id": "latest"}):

        res = client.get("/my-careplan/latest", headers=HEADERS)
        assert res.status_code == 200
        assert res.json() == {"id": "latest"}

def test_get_my_careplans(mock_patient_user):
    with patch("controllers.careplan_controller.decode_token", return_value=mock_patient_user), \
         patch("controllers.careplan_controller.ensure_patient_role"), \
         patch("controllers.careplan_controller.get_patient_careplans", return_value=[{"id": "1"}]):

        res = client.get("/my-careplans", headers=HEADERS)
        assert res.status_code == 200
        assert res.json() == [{"id": "1"}]

def test_create_careplan(mock_practitioner_user, careplan_data):
    with patch("controllers.careplan_controller.decode_token", return_value=mock_practitioner_user), \
         patch("controllers.careplan_controller.ensure_practitioner_role"), \
         patch("controllers.careplan_controller.create_careplan", return_value={"created": True}):

        res = client.post("/careplans", headers=HEADERS, json=careplan_data)
        assert res.status_code == 200
        assert res.json()["created"] is True

def test_get_careplan_by_id(mock_practitioner_user):
    with patch("controllers.careplan_controller.decode_token", return_value=mock_practitioner_user), \
         patch("controllers.careplan_controller.ensure_practitioner_role"), \
         patch("controllers.careplan_controller.get_careplan_by_id", return_value={"id": "abc"}):

        res = client.get("/careplans/abc", headers=HEADERS)
        assert res.status_code == 200
        assert res.json() == {"id": "abc"}

def test_get_patient_careplans(mock_practitioner_user):
    with patch("controllers.careplan_controller.decode_token", return_value=mock_practitioner_user), \
         patch("controllers.careplan_controller.ensure_practitioner_role"), \
         patch("controllers.careplan_controller.get_all_careplans_for_patient", return_value=[{"id": "1"}]):

        res = client.get("/patients/123/careplans", headers=HEADERS)
        assert res.status_code == 200
        assert res.json() == [{"id": "1"}]

def test_update_careplan(mock_practitioner_user):
    update_payload = {"status": "completed"}
    with patch("controllers.careplan_controller.decode_token", return_value=mock_practitioner_user), \
         patch("controllers.careplan_controller.ensure_practitioner_role"), \
         patch("controllers.careplan_controller.update_careplan", return_value={"updated": True}):

        res = client.put("/careplans/999", headers=HEADERS, json=update_payload)
        assert res.status_code == 200
        assert res.json()["updated"] is True

def test_delete_careplan(mock_practitioner_user):
    with patch("controllers.careplan_controller.decode_token", return_value=mock_practitioner_user), \
         patch("controllers.careplan_controller.ensure_practitioner_role"), \
         patch("controllers.careplan_controller.delete_careplan", return_value={"deleted": True}):

        res = client.delete("/careplans/999", headers=HEADERS)
        assert res.status_code == 200
        assert res.json()["deleted"] is True
