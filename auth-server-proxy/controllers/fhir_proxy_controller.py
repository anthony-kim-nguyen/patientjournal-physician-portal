from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from starlette.responses import Response
import requests

from app.config import FHIR_JPA_URL
from app.auth import decode_token  

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# === Generic FHIR Proxy (without forwarding token) ===
@router.api_route("/{fhir_path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def proxy(fhir_path: str, request: Request, token: str = Depends(oauth2_scheme)):
    try:
        user = decode_token(token)
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    # Enforce patient access control
    if user["role"] == "patient":
        allowed_path = f"Patient/{user['fhir_id'].split('/')[1]}"
        if not fhir_path.startswith(allowed_path):
            raise HTTPException(status_code=403, detail="Access denied")

    # Construct full URL to FHIR server
    full_url = f"{FHIR_JPA_URL}/{fhir_path}"

    # Copy headers from incoming request (excluding 'host' and 'authorization')
    headers = {
        k: v for k, v in request.headers.items()
        if k.lower() not in ["host", "authorization"]
    }

    # Forward request body and method
    body = await request.body()
    resp = requests.request(request.method, full_url, headers=headers, data=body)

    # Return response from FHIR server
    return Response(
        content=resp.content,
        status_code=resp.status_code,
        media_type=resp.headers.get("Content-Type", "application/fhir+json")
    )
