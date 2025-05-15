import os
from dotenv import load_dotenv

load_dotenv()  # Loads .env file variables into the environment

FHIR_JPA_URL = os.getenv("FHIR_JPA_URL", "http://localhost:8080/fhir")
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost/db")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-key")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
