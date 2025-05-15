from dao.fhir_server_dao import *
from app.config import FHIR_JPA_URL

# === MedicationRequest ===
def create_medication_request( req):
    return post_fhir_resource(f"{FHIR_JPA_URL}/MedicationRequest", req)