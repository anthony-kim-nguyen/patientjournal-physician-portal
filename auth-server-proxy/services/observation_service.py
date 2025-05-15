from dao.fhir_server_dao import *
from app.config import FHIR_JPA_URL

# === Observations ===
def create_observation_as_practitioner(obs):
    return post_fhir_resource(f"{FHIR_JPA_URL}/Observation", obs)

def update_observation_as_practitioner(obs_id, obs):
    return put_fhir_resource(f"{FHIR_JPA_URL}/Observation/{obs_id}", obs)

def delete_observation_as_practitioner(obs_id):
    return delete_fhir_resource(f"{FHIR_JPA_URL}/Observation/{obs_id}")

def get_observation_by_id(obs_id):
    return get_fhir_resource(f"{FHIR_JPA_URL}/Observation/{obs_id}")

def get_all_observations_for_patient( patient_id):
    return get_fhir_resource(f"{FHIR_JPA_URL}/Observation?subject=Patient/{patient_id}")
