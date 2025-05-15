from dao.fhir_server_dao import *
from app.config import FHIR_JPA_URL

# === HELPER FUNCTION TO ENSURE PATIENT ID 
# === IS IN CORRECT FORMAT BEFORE SENDING REQ
# === TO FHIR RESOURCE SERVER
def build_patient_reference(fhir_id: str) -> str:
    """Ensure patient reference is in the correct format."""
    return fhir_id if fhir_id.startswith("Patient/") else f"Patient/{fhir_id}"
# =========== USED BY PATIENT ONLY ==============
# Get the full FHIR Patient resource for the user
def get_my_patient_resource(user):
    patient_id = build_patient_reference(user["fhir_id"])
    return get_fhir_resource(f"{FHIR_JPA_URL}/{patient_id}")


# =========== USED BY PRACTITIONER/CARE-TEAM ONLY ==============
# === List Patients ===
def get_all_patients():
    return get_fhir_resource(f"{FHIR_JPA_URL}/Patient")

# === Get one patient by id
def get_patient_resource(id):
    patient_id = build_patient_reference(id)
    return get_fhir_resource(f"{FHIR_JPA_URL}/{patient_id}")


