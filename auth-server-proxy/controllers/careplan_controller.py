from fastapi import APIRouter, Depends, Body
from fastapi.security import OAuth2PasswordBearer
from services.careplan_services import *
from app.auth import decode_token
from services.auth_service import ensure_practitioner_role,ensure_patient_role

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

#========USED BY PATIENT===========
# ========================
# GET /my-careplans/latest/{patient_id}
# Fetch latest CarePlan linked to the authenticated patient
# ========================
@router.get("/my-careplan/latest")
def get_full_careplan(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_patient_role(user)
    return get_my_latest_careplan_full(user)

# ========================
# GET /my-careplans
# Fetch all CarePlans linked to the authenticated patient
# ========================
@router.get("/my-careplans")
def careplans(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_patient_role(user)
    return get_patient_careplans(user)



# === USED BY PRACTITIONERS/CARETEAM ONLY ===
# === CarePlan CRUD

# ========================
# CREATE /careplans
# Create careplan for patient
# ========================
@router.post("/careplans")
def create_careplan(careplan: dict = Body(...), token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return create_careplan( careplan)

# ========================
# GET /careplans/{plan_id}
# Get specific plan by id
# ========================
@router.get("/careplans/{plan_id}")
def get_careplan_by_id(plan_id: str, token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return get_careplan_by_id( plan_id)

# ========================
# GET /patients/ID/careplans
# Get plans for a patient
# ========================
@router.get("/patients/{patient_id}/careplans")
def get_patient_careplans(patient_id: str, token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return get_all_careplans_for_patient( patient_id)

# ========================
# UPDATE /careplans/{plan_id}
# update specific plan by id
# ========================
@router.put("/careplans/{plan_id}")
def update_careplan(plan_id: str, careplan: dict = Body(...), token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return update_careplan( plan_id, careplan)

# ========================
# DELETE /careplans/{plan_id}
# Delete specific plan by id
# ========================
@router.delete("/careplans/{plan_id}")
def delete_careplan(plan_id: str, token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return delete_careplan( plan_id)