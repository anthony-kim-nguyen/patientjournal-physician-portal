from fastapi import APIRouter, Depends, Body
from fastapi.security import OAuth2PasswordBearer
from services.questionnaire_service import *
from app.auth import decode_token
from services.auth_service import ensure_practitioner_role


# Router for all patient-related FHIR routes USED BY A PATIENT
router = APIRouter()

# Defines the OAuth2 password flow (used for extracting Bearer token)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# === create Questionnaire for a patient ===
@router.post("/questionnaire")
def create_careplan(req: dict = Body(...), token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return create_careplan( req)