import requests
from fastapi import HTTPException

# Headers required for FHIR-compliant requests
FHIR_HEADERS = {
    "Accept": "application/fhir+json",
    "Content-Type": "application/fhir+json"
}

# ======================================================
# GET a FHIR resource by URL
# Returns parsed JSON content as a Python dictionary
# Raises HTTPException on error
# ======================================================
def get_fhir_resource(url: str) -> dict:
    resp = requests.get(url, headers=FHIR_HEADERS)
    if resp.status_code != 200:
        raise HTTPException(status_code=resp.status_code, detail=f"Failed to fetch resource: {url}")
    return resp.json()

# ======================================================
# POST a new FHIR resource to the specified URL
# Expects a dictionary payload (FHIR resource)
# Returns created resource as a dictionary
# Raises HTTPException on error
# ======================================================
def post_fhir_resource(url: str, data: dict) -> dict:
    resp = requests.post(url, headers=FHIR_HEADERS, json=data)
    if resp.status_code != 201:
        raise HTTPException(status_code=resp.status_code, detail="Failed to create resource")
    return resp.json()

# ======================================================
# PUT (update) an existing FHIR resource
# Expects a full resource payload as a dictionary
# Returns updated resource as a dictionary
# Raises HTTPException on error
# ======================================================
def put_fhir_resource(url: str, data: dict) -> dict:
    resp = requests.put(url, headers=FHIR_HEADERS, json=data)
    if resp.status_code not in (200, 201):  # 201 if created during PUT
        raise HTTPException(status_code=resp.status_code, detail="Failed to update resource")
    return resp.json()

# ======================================================
# DELETE a FHIR resource at the specified URL
# Returns a success message on HTTP 204
# Raises HTTPException on error
# ======================================================
def delete_fhir_resource(url: str) -> dict:
    resp = requests.delete(url, headers=FHIR_HEADERS)
    if resp.status_code != 204:
        raise HTTPException(status_code=resp.status_code, detail="Failed to delete resource")
    return {"msg": "Deleted successfully"}

# ======================================================
# SEARCH FHIR resources with query parameters
# Returns parsed search Bundle (as a dictionary)
# Raises HTTPException on error
# ======================================================
def search_fhir_resource(url: str, params: dict) -> dict:
    resp = requests.get(url, headers=FHIR_HEADERS, params=params)
    if resp.status_code != 200:
        raise HTTPException(status_code=resp.status_code, detail="FHIR search failed")
    return resp.json()
