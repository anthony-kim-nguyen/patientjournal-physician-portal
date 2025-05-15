import pytest
from unittest.mock import patch
from fastapi import HTTPException
from services import journal_services

FAKE_FHIR_URL = "http://fhir.test/Observation"
MOCK_USER = {"fhir_id": "Patient/123"}

@pytest.fixture
def observation():
    return {
        "resourceType": "Observation",
        "status": "final",
        "code": {"text": "Mood"},
        "valueString": "Happy"
    }

def test_create_journal_entry_success(observation):
    with patch("services.journal_services.build_patient_reference", return_value="Patient/123") as mock_ref, \
         patch("services.journal_services.post_fhir_resource", return_value={"id": "abc"}) as mock_post:

        result = journal_services.create_journal_entry(observation, MOCK_USER)

        assert result["id"] == "abc"
        assert observation["subject"]["reference"] == "Patient/123"
        assert any(tag["code"] == "journal-entry" for tag in observation["meta"]["tag"])

def test_create_journal_entry_missing_fhir_id(observation):
    with pytest.raises(HTTPException) as exc:
        journal_services.create_journal_entry(observation, {})

    assert exc.value.status_code == 400
    assert "Missing user FHIR ID" in str(exc.value.detail)

def test_get_journal_entry_by_id():
    with patch("services.journal_services.get_fhir_resource", return_value={"id": "abc"}) as mock_get:
        result = journal_services.get_journal_entry_by_id("abc")
        assert result["id"] == "abc"
        mock_get.assert_called_once_with(f"{journal_services.FHIR_JPA_URL}/Observation/abc")

def test_get_my_journal():
    with patch("services.journal_services.get_fhir_resource", return_value={"entry": []}) as mock_get:
        result = journal_services.get_my_journal(MOCK_USER)
        assert "entry" in result
        mock_get.assert_called_once()

def test_update_journal_entry_adds_tag():
    updated = {
        "resourceType": "Observation",
        "meta": {"tag": []}
    }

    with patch("services.journal_services.build_patient_reference", return_value="Patient/123") as mock_ref, \
         patch("services.journal_services.put_fhir_resource", return_value={"updated": True}) as mock_put:

        result = journal_services.update_journal_entry("abc", updated, MOCK_USER)
        assert result["updated"] is True
        assert any(tag["code"] == "journal-entry" for tag in updated["meta"]["tag"])
        mock_put.assert_called_once_with(f"{journal_services.FHIR_JPA_URL}/Observation/abc", updated)

def test_update_journal_entry_missing_fhir_id():
    with pytest.raises(HTTPException) as exc:
        journal_services.update_journal_entry("abc", {}, {})

    assert exc.value.status_code == 400
    assert "Missing user FHIR ID" in str(exc.value.detail)

def test_delete_journal_entry():
    with patch("services.journal_services.delete_fhir_resource", return_value={"deleted": True}) as mock_delete:
        result = journal_services.delete_journal_entry("abc")
        assert result["deleted"] is True
        mock_delete.assert_called_once_with(f"{journal_services.FHIR_JPA_URL}/Observation/abc")

def test_get_all_journal_entries_for_patient_success():
    mock_response = {
        "entry": [
            {"resource": {"id": "1"}},
            {"resource": {"id": "2"}}
        ]
    }

    with patch("services.journal_services.build_patient_reference", return_value="Patient/123") as mock_ref, \
         patch("services.journal_services.search_fhir_resource", return_value=mock_response) as mock_search:

        result = journal_services.get_all_journal_entries_for_patient("123")
        assert isinstance(result, list)
        assert result[0]["id"] == "1"

def test_get_all_journal_entries_for_patient_failure():
    with patch("services.journal_services.build_patient_reference", return_value="Patient/123"), \
         patch("services.journal_services.search_fhir_resource", side_effect=Exception("connection failed")):

        with pytest.raises(HTTPException) as exc:
            journal_services.get_all_journal_entries_for_patient("123")

        assert exc.value.status_code == 500
        assert "Failed to fetch journal entries" in str(exc.value.detail)
