from dao.fhir_server_dao import *
from app.config import FHIR_JPA_URL

# === Questionnaire ===
def create_questionnaire(questionnaire):
    return post_fhir_resource(f"{FHIR_JPA_URL}/Questionnaire", questionnaire)
