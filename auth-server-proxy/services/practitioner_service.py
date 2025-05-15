from dao.fhir_server_dao import *
from app.config import FHIR_JPA_URL

# === Practitioner Profile ===
def get_practitioner_profile(user):
    return get_fhir_resource(f"{FHIR_JPA_URL}/{user['fhir_id']}")

def get_all_practitioners():
    return get_fhir_resource(f"{FHIR_JPA_URL}/Practitioner")



