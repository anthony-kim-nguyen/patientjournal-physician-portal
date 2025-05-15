import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from main import app

client = TestClient(app)
HEADERS = {"Authorization": "Bearer faketoken"}

@pytest.fixture
def mock_patient_user():
    return {
        "username": "test_patient",
        "role": "patient",
        "fhir_id": "Patient/123"
    }

@pytest.fixture
def mock_practitioner_user():
    return {
        "username": "dr_smith",
        "role": "practitioner",
        "fhir_id": "Practitioner/456"
    }

@pytest.fixture
def mock_observation():
    return {
        "resourceType": "Observation",
        "status": "final",
        "code": {"text": "Mood"},
        "valueString": "Happy"
    }

def test_get_my_journal(mock_patient_user):
    with patch("controllers.journal_controller.decode_token", return_value=mock_patient_user), \
         patch("controllers.journal_controller.ensure_patient_role"), \
         patch("controllers.journal_controller.get_my_journal", return_value=[{"id": "1"}]):

        res = client.get("/my-journal", headers=HEADERS)
        assert res.status_code == 200
        assert res.json() == [{"id": "1"}]

def test_post_journal_entry(mock_patient_user, mock_observation):
    with patch("controllers.journal_controller.decode_token", return_value=mock_patient_user), \
         patch("controllers.journal_controller.ensure_patient_role"), \
         patch("controllers.journal_controller.create_journal_entry", return_value={"id": "new"}):

        res = client.post("/my-journal", json=mock_observation, headers=HEADERS)
        assert res.status_code == 200
        assert res.json()["id"] == "new"

def test_get_specific_entry(mock_patient_user):
    with patch("controllers.journal_controller.decode_token", return_value=mock_patient_user), \
         patch("controllers.journal_controller.ensure_patient_role"), \
         patch("controllers.journal_controller.get_journal_entry_by_id", return_value={"id": "123"}):

        res = client.get("/my-journal/123", headers=HEADERS)
        assert res.status_code == 200
        assert res.json()["id"] == "123"

def test_update_journal_entry(mock_patient_user):
    updated_data = {"valueString": "Calm"}
    with patch("controllers.journal_controller.decode_token", return_value=mock_patient_user), \
         patch("controllers.journal_controller.ensure_patient_role"), \
         patch("controllers.journal_controller.update_journal_entry", return_value={"updated": True}):

        res = client.put("/my-journal/123", json=updated_data, headers=HEADERS)
        assert res.status_code == 200
        assert res.json()["updated"] is True

def test_delete_journal_entry(mock_patient_user):
    with patch("controllers.journal_controller.decode_token", return_value=mock_patient_user), \
         patch("controllers.journal_controller.ensure_patient_role"), \
         patch("controllers.journal_controller.delete_journal_entry", return_value={"deleted": True}):

        res = client.delete("/my-journal/123", headers=HEADERS)
        assert res.status_code == 200
        assert res.json()["deleted"] is True

def test_get_all_entries_for_patient(mock_practitioner_user):
    with patch("controllers.journal_controller.decode_token", return_value=mock_practitioner_user), \
         patch("controllers.journal_controller.ensure_practitioner_role"), \
         patch("controllers.journal_controller.get_all_journal_entries_for_patient", return_value=[{"id": "entry1"}]):

        res = client.get("/journals/123", headers=HEADERS)
        assert res.status_code == 200
        assert res.json() == [{"id": "entry1"}]
