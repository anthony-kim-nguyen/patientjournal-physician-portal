from fastapi import HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import HTTPException

from app.auth import hash_password, verify_password, create_access_token
from models.user import User
from services.registration_service import create_fhir_patient, create_fhir_practitioner
from dao.user_dao import get_user_by_username, create_user
from models.register_request import RegisterRequest

# Handles new user registration
def register_user(data: RegisterRequest, db: Session):
    print(f"📥 Attempting to register user: {data.username}")

    # Check if username already exists
    if get_user_by_username(db, data.username):
        print("❌ Username already exists")
        raise HTTPException(status_code=400, detail="Username already registered")

    # Create corresponding FHIR resource
    if data.role == "patient":
        print("🧾 Creating FHIR Patient")
        fhir_id = create_fhir_patient(data.first_name, data.last_name)
    elif data.role == "practitioner":
        print("🧾 Creating FHIR Practitioner")
        fhir_id = create_fhir_practitioner(data.first_name, data.last_name)
    else:
        print("❌ Invalid role provided")
        raise HTTPException(status_code=400, detail="Invalid role")

    # Hash password and save user to database
    user = User(
        username=data.username,
        hashed_password=hash_password(data.password),
        email=data.email,
        role=data.role,
        fhir_id=fhir_id
    )
    print("✅ User data prepared. Saving to DB...")
    create_user(db, user)
    print(f"✅ User '{user.username}' registered with FHIR ID: {user.fhir_id}")

    return {"msg": "User created", "username": user.username, "fhir_id": user.fhir_id}

# Handles user login using OAuth2PasswordRequestForm
def login_user(form: OAuth2PasswordRequestForm, db: Session):
    print(f"🔐 Login attempt: {form.username}")

    user = get_user_by_username(db, form.username)
    if not user:
        print("❌ User not found")
        raise HTTPException(status_code=400, detail="Incorrect credentials")

    if not verify_password(form.password, user.hashed_password):
        print("❌ Invalid password")
        raise HTTPException(status_code=400, detail="Incorrect credentials")

    token_data = {
        "sub": user.username,
        "role": user.role,
        "fhir_id": user.fhir_id
    }

    access_token = create_access_token(token_data)
    print(f"✅ Token issued for user: {user.username}")

    return {"access_token": access_token, "token_type": "bearer"}

# === Check for role patient ===
def ensure_patient_role(user):
    if user["role"] != "patient":
        raise HTTPException(status_code=403, detail="Only patients can access this route")
    
# === Check for role practitioner ===
def ensure_practitioner_role(user):
    if user["role"] != "practitioner":
        raise HTTPException(status_code=403, detail="Only practitioners can access this route")

