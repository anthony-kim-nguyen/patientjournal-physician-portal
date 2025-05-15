from fastapi import APIRouter, Depends, Body
from fastapi.security import OAuth2PasswordBearer
from services.medication_request_service import *
from app.auth import decode_token
from services.auth_service import ensure_practitioner_role

# Router for all patient-related FHIR routes USED BY A PATIENT
router = APIRouter()

# Defines the OAuth2 password flow (used for extracting Bearer token)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# ========================
# CREATE /medicationrequest
# create a medication request
# ========================
@router.post("/medicationrequest")
def create_medication_request(req: dict = Body(...), token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return create_medication_request( req)