from pydantic import BaseModel, EmailStr
from typing import Literal

#client sends this request when registering user
class RegisterRequest(BaseModel):
    username: str
    password: str
    email: EmailStr
    first_name: str
    last_name: str
    role: Literal["patient","practitioner"]  # "patient" or "practitioner"
