import requests
from fastapi import HTTPException
from app.config import FHIR_JPA_URL

# Create a Patient resource in FHIR server
def create_fhir_patient(first_name: str, last_name: str) -> str:
    payload = {
        "resourceType": "Patient",
        "name": [{
            "given": [first_name],
            "family": last_name
        }]
    }
    print(f"🌐 Sending Patient payload to FHIR server: {payload}")
    resp = requests.post(f"{FHIR_JPA_URL}/Patient", json=payload)

    if resp.status_code != 201:
        print(f"❌ Patient creation failed: {resp.status_code} - {resp.text}")
        raise HTTPException(status_code=500, detail="FHIR Patient creation failed")

    location = resp.headers.get("Location")
    if not location:
        print("❌ No Location header in Patient response")
        raise HTTPException(status_code=500, detail="No Location header returned by FHIR server")

    fhir_id = "/".join(location.split("/")[-4:-2])
    print(f"✅ FHIR Patient created with ID: {fhir_id}")
    return fhir_id

# Create a Practitioner resource in FHIR server
def create_fhir_practitioner(first_name: str, last_name: str) -> str:
    payload = {
        "resourceType": "Practitioner",
        "name": [{
            "given": [first_name],
            "family": last_name
        }]
    }
    print(f"🌐 Sending Practitioner payload to FHIR server: {payload}")
    resp = requests.post(f"{FHIR_JPA_URL}/Practitioner", json=payload)

    if resp.status_code != 201:
        print(f"❌ Practitioner creation failed: {resp.status_code} - {resp.text}")
        raise HTTPException(status_code=500, detail="FHIR Practitioner creation failed")

    location = resp.headers.get("Location")
    if not location:
        print("❌ No Location header in Practitioner response")
        raise HTTPException(status_code=500, detail="No Location header returned by FHIR server")

    fhir_id = "/".join(location.split("/")[-4:-2])
    print(f"✅ FHIR Practitioner created with ID: {fhir_id}")
    return fhir_id
