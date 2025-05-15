from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.security import OAuth2PasswordBearer
from services.practitioner_service import *
from app.auth import decode_token
from services.auth_service import ensure_practitioner_role


# Router for all patient-related FHIR routes USED BY A PATIENT
router = APIRouter()

# Defines the OAuth2 password flow (used for extracting Bearer token)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


#========USED BY PRACTITIONERS/CARETEAM===========
# === Practitioner self profile ===
@router.get("/practitioner")
def get_own_practitioner(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return get_practitioner_profile(user)


# === List all practitioners ===
@router.get("/practitioners")
def list_practitioners(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return get_all_practitioners()

