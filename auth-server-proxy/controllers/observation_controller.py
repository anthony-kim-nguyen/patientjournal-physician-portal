from fastapi import APIRouter, Depends, Body
from fastapi.security import OAuth2PasswordBearer
from app.auth import decode_token
from services.observation_service import *
from services.auth_service import ensure_practitioner_role

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# === Observation CRUD ===
@router.post("/observations")
def create_obs(obs: dict = Body(...), token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return create_observation_as_practitioner( obs)
# === Get a single Observation by ID ===
@router.get("/observations/{obs_id}")
def get_obs_by_id(obs_id: str, token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return get_observation_by_id( obs_id)

# === Get all Observations for a patient ===
@router.get("/patients/{patient_id}/observations")
def get_patient_observations(patient_id: str, token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return get_all_observations_for_patient( patient_id)

#=== update one Observation for a patient ===
@router.put("/observations/{obs_id}")
def update_obs(obs_id: str, obs: dict = Body(...), token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return update_observation_as_practitioner( obs_id, obs)

#=== Delete one Observation for a patient ===
@router.delete("/observations/{obs_id}")
def delete_obs(obs_id: str, token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    ensure_practitioner_role(user)
    return delete_observation_as_practitioner( obs_id)