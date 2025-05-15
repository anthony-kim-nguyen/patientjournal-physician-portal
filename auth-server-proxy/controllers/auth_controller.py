from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from services.auth_service import register_user, login_user
from models.register_request import RegisterRequest

router = APIRouter()

# used for registering
@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    return register_user(data, db)
# used for login
@router.post("/token")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return login_user(form, db)
