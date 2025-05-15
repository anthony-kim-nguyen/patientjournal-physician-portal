import pytest
from unittest.mock import patch
from services import patient_service

FAKE_FHIR_JPA_URL = "http://test-fhir-server.com/fhir"
PATIENT_ID = "216"
FULL_FHIR_ID = f"Patient/{PATIENT_ID}"
FAKE_USER = {"fhir_id": FULL_FHIR_ID}

@pytest.fixture(autouse=True)
def override_config(monkeypatch):
    monkeypatch.setattr("services.patient_service.FHIR_JPA_URL", FAKE_FHIR_JPA_URL)

def test_build_patient_reference_with_prefix():
    assert patient_service.build_patient_reference("Patient/216") == "Patient/216"

def test_build_patient_reference_without_prefix():
    assert patient_service.build_patient_reference("216") == "Patient/216"

def test_get_my_patient_resource():
    with patch("services.patient_service.get_fhir_resource") as mock_get:
        mock_get.return_value = {"id": "Patient/216", "resourceType": "Patient"}

        result = patient_service.get_my_patient_resource(FAKE_USER)
        assert result["id"] == "Patient/216"
        mock_get.assert_called_once_with(f"{FAKE_FHIR_JPA_URL}/Patient/216")

def test_get_all_patients():
    with patch("services.patient_service.get_fhir_resource") as mock_get:
        mock_get.return_value = {"entry": []}

        result = patient_service.get_all_patients()
        assert "entry" in result
        mock_get.assert_called_once_with(f"{FAKE_FHIR_JPA_URL}/Patient")

def test_get_patient_resource_with_raw_id():
    with patch("services.patient_service.get_fhir_resource") as mock_get:
        mock_get.return_value = {"id": "Patient/216"}

        result = patient_service.get_patient_resource("216")
        assert result["id"] == "Patient/216"
        mock_get.assert_called_once_with(f"{FAKE_FHIR_JPA_URL}/Patient/216")

def test_get_patient_resource_with_prefixed_id():
    with patch("services.patient_service.get_fhir_resource") as mock_get:
        mock_get.return_value = {"id": "Patient/216"}

        result = patient_service.get_patient_resource("Patient/216")
        assert result["id"] == "Patient/216"
        mock_get.assert_called_once_with(f"{FAKE_FHIR_JPA_URL}/Patient/216")
