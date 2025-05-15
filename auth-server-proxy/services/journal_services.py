from fastapi import HTTPException
from dao.fhir_server_dao import *
from services.patient_service import build_patient_reference
from app.config import FHIR_JPA_URL

JOURNAL_TAG_CODE = "journal-entry"
TAG_SYSTEM = "http://example.org/tags"
JOURNAL_ENTRY_TAG = {
    "system": "http://example.org/tags",
    "code": "journal-entry",
    "display": "Journal Entry"
}



# Create a new Observation resource tagged as "journal-entry"
def create_journal_entry(observation: dict, user: dict) -> dict:
    """Create a new Observation resource tagged as 'journal-entry' for the given patient."""
    if "fhir_id" not in user:
        raise HTTPException(status_code=400, detail="Missing user FHIR ID")


    observation["subject"] = {"reference": build_patient_reference(user["fhir_id"])}
    observation.setdefault("meta", {}).setdefault("tag", []).append(JOURNAL_ENTRY_TAG)

    return post_fhir_resource(f"{FHIR_JPA_URL}/Observation", observation)


# Get a single Observation resource by ID
def get_journal_entry_by_id(obs_id: str) -> dict:
    """Get a single Observation by ID."""
    return get_fhir_resource(f"{FHIR_JPA_URL}/Observation/{obs_id}")


# Get all Observation resources for the patient
# (these may include journal-entry tagged resources)
def get_my_journal(user):
    patient_id = user["fhir_id"].split("/")[1]
    return get_fhir_resource(
        f"{FHIR_JPA_URL}/Observation"
        f"?subject=Patient/{patient_id}"
        f"&_tag=journal-entry"
        f"&_sort=-date"
        f"&_count=40"
    )



# Update an existing Observation and ensure it is tagged as "journal-entry"
def update_journal_entry(obs_id: str, updated_obs: dict, user: dict) -> dict:
    """Update an existing Observation, ensuring patient association and 'journal-entry' tag."""
    if "fhir_id" not in user:
        raise HTTPException(status_code=400, detail="Missing user FHIR ID")

    updated_obs["subject"] = {"reference": build_patient_reference(user["fhir_id"])}
    updated_obs.setdefault("meta", {}).setdefault("tag", [])

    if not any(tag.get("code") == JOURNAL_TAG_CODE for tag in updated_obs["meta"]["tag"]):
        updated_obs["meta"]["tag"].append(JOURNAL_ENTRY_TAG)

    return put_fhir_resource(f"{FHIR_JPA_URL}/Observation/{obs_id}", updated_obs)


# Delete an Observation resource by ID
def delete_journal_entry(obs_id: str) -> dict:
    """Delete a journal-entry Observation by ID."""
    return delete_fhir_resource(f"{FHIR_JPA_URL}/Observation/{obs_id}")


#==========================================
#========USED BY PRACTITIONERS ONLY========
# GET ALL OBSERVATIONS TAGGED JOURNAL ENTRY FOR A PATIENT
def get_all_journal_entries_for_patient(patient_fhir_id: str) -> list[dict]:
    patient_ref = build_patient_reference(patient_fhir_id)

    params = {
        "subject": patient_ref,
        "_tag": f"{TAG_SYSTEM}|{JOURNAL_TAG_CODE}",
        "_sort": "-_lastUpdated",
        "_count": "40"
    }

    print(f"📌 Patient FHIR ID: {patient_fhir_id}")
    print(f"🔍 FHIR Query Params: {params}")

    try:
        response = search_fhir_resource(f"{FHIR_JPA_URL}/Observation", params)
        entries = response.get("entry", [])
        print(f"📦 FHIR Entry Count: {len(entries)}")
        return [entry["resource"] for entry in entries] if entries else []
    except Exception as e:
        print(f"❌ FHIR Fetch Error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch journal entries: {str(e)}")
