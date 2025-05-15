from fastapi import FastAPI
from mangum import Mangum
from models.user import Base
from app.database import engine
from controllers.auth_controller import router as auth_controller
from controllers.patient_controller import router as patient_controller
from controllers.practitioner_controller import router as practitioner_controller
from controllers.careplan_controller import router as careplan_controller
from controllers.journal_controller import router as journal_controller
from controllers.observation_controller import router as observation_controller
from controllers.questionnaire_controller import router as questionnaire_controller
from controllers.medication_request_controller import router as medication_controller
from controllers.fhir_proxy_controller import router as default_fhir_controller
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()
#cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create tables if not already made 
Base.metadata.create_all(bind=engine)

# default route - test if reachable
@app.get("/ping")
def root():
    return {"message": "pong"}
# Register routers (controllers)
app.include_router(auth_controller)
app.include_router(patient_controller)
app.include_router(practitioner_controller)
app.include_router(careplan_controller)
app.include_router(journal_controller)
app.include_router(observation_controller)
app.include_router(questionnaire_controller)
app.include_router(medication_controller)
app.include_router(default_fhir_controller)

# List available routes for debugging
for route in app.routes:
    print(f"📍 {route.path} → methods: {route.methods}")

# AWS Lambda handler, handles context exchange from API gateway
handler = Mangum(app)
