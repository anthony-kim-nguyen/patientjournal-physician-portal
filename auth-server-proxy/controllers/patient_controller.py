from fastapi import APIRouter, Depends, Body, HTTPException
from fastapi.security import OAuth2PasswordBearer
from services.patient_service import *
from services.auth_service import ensure_patient_role, ensure_practitioner_role
from app.auth import decode_token

# Router for all patient-related FHIR routes USED BY A PATIENT
router = APIRouter()

# Defines the OAuth2 password flow (used for extracting Bearer token)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

#========USED BY PATIENT===========
# ========================
# GET /me
# Return the full Patient resource for the authenticated user
# ========================
@router.get("/me")
def me(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_patient_role(user)
    return get_my_patient_resource(user)



#========USED BY CARE TEAM===========
# === List all patients ===
@router.get("/patients")
def list_patients(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return get_all_patients()

# === List one patient by id ===
@router.get("/patients/{patient_id}")
def list_patients(patient_id: str, token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return get_patient_resource( patient_id)





