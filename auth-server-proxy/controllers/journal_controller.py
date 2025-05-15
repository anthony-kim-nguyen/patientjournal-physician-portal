from fastapi import APIRouter, Depends, Body
from fastapi.security import OAuth2PasswordBearer
from services.journal_services import *
from app.auth import decode_token
from services.auth_service import ensure_practitioner_role,ensure_patient_role


# Router for all patient-related FHIR routes USED BY A PATIENT
router = APIRouter()

# Defines the OAuth2 password flow (used for extracting Bearer token)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

#========USED BY PATIENTS===========
# ========================
# GET /my-journal
# Get all Observation resources tagged as journal entries for the patient
# ========================
@router.get("/my-journal")
def journal_entries(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_patient_role(user)
    return get_my_journal(user)

# ========================
# POST /my-journal
# Create a new Observation tagged as a journal entry
# ========================
@router.post("/my-journal")
def create_journal_bundle(bundle: dict = Body(...), token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_patient_role(user)

    # Check that it's a Bundle of type 'collection'
    if bundle.get("resourceType") != "Bundle" or bundle.get("type") != "collection":
        raise HTTPException(status_code=400, detail="Invalid Bundle format")

    entries = bundle.get("entry", [])
    if not entries:
        raise HTTPException(status_code=400, detail="No entries found in Bundle")

    results = []
    for entry in entries:
        resource = entry.get("resource")
        if resource:
            created = create_journal_entry(resource, user)
            results.append(created)

    return {
        "resourceType": "Bundle",
        "type": "batch-response",
        "entry": [{"response": {"status": "201 Created"}, "resource": r} for r in results]
    }




# ========================
# GET /my-journal/{obs_id}
# Fetch a specific journal entry Observation by its ID
# ========================
@router.get("/my-journal/{obs_id}")
def get_entry(obs_id: str, token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_patient_role(user)
    return get_journal_entry_by_id(user, obs_id)


# ========================
# PUT /my-journal/{obs_id}
# Update an existing Observation while preserving the journal-entry tag
# ========================
@router.put("/my-journal/{obs_id}")
def update_entry(obs_id: str, updated_obs: dict = Body(...), token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_patient_role(user)
    return update_journal_entry(user, obs_id, updated_obs)


# ========================
# DELETE /my-journal/{obs_id}
# Delete a specific Observation if the user is authorized
# ========================
@router.delete("/my-journal/{obs_id}")
def delete_entry(obs_id: str, token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_patient_role(user)
    return delete_journal_entry(user, obs_id)


#========USED BY CARE TEAM===========
# ========================
# GET /journals/{patient_id}
# Get all journal entries for a specific patient
# ========================
@router.get("/journals/{patient_id}")
def get_patient_journal_entries(patient_id: str, token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return get_all_journal_entries_for_patient(patient_id)


