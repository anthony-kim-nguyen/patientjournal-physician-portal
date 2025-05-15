from dao.fhir_server_dao import *
from app.config import FHIR_JPA_URL

# === CarePlans ===
#   Create
def create_careplan(plan):
    return post_fhir_resource(f"{FHIR_JPA_URL}/CarePlan", plan)
#   Get one
def get_careplan_by_id( plan_id):
    return get_fhir_resource(f"{FHIR_JPA_URL}/CarePlan/{plan_id}")
#   Get all
def get_all_careplans_for_patient(patient_id):
    return get_fhir_resource(f"{FHIR_JPA_URL}/CarePlan?subject=Patient/{patient_id}")
#   Update
def update_careplan(plan_id, plan):
    return put_fhir_resource(f"{FHIR_JPA_URL}/CarePlan/{plan_id}", plan)
#   Delete
def delete_careplan( plan_id):
    return delete_fhir_resource(f"{FHIR_JPA_URL}/CarePlan/{plan_id}")

# Get the full careplan with references 
# Get the full careplan with referenced Questionnaires and Medications
def get_my_latest_careplan_full(user: dict):
    fhir_patient_id = user.get("fhir_id") or user.get("patient_id")
    print("🔍 FHIR ID from token:", fhir_patient_id)

    if not fhir_patient_id:
        raise HTTPException(status_code=400, detail="Missing FHIR patient ID in token")

    # 1. Fetch the latest CarePlan
    careplan_url = f"{FHIR_JPA_URL}/CarePlan"
    params = {
        "subject": fhir_patient_id,
        "_sort": "-_lastUpdated",
        "_count": 1
    }

    print("🌐 Fetching CarePlan with URL:", careplan_url)
    print("📦 Params:", params)

    bundle = search_fhir_resource(careplan_url, params)
    entries = bundle.get("entry", [])

    print("📊 Found", len(entries), "CarePlan entries")

    if not entries:
        raise HTTPException(status_code=404, detail="No CarePlan found")

    careplan = entries[0]["resource"]
    print("✅ CarePlan ID:", careplan.get("id"))

    # 2. Extract references from CarePlan activities
    questionnaire_ids = []
    medication_refs = []

    print("🔍 Parsing CarePlan activities...")
    for activity in careplan.get("activity", []):
        if "detail" in activity:
            canonical_refs = activity["detail"].get("instantiatesCanonical", [])
            for canonical in canonical_refs:
                if canonical.startswith("Questionnaire/"):
                    qid = canonical.split("/")[-1]
                    questionnaire_ids.append(qid)
                    print("🧾 Extracted Questionnaire ID:", qid)
        elif "reference" in activity:
            ref = activity["reference"].get("reference", "")
            if ref.startswith("MedicationRequest/"):
                medication_refs.append(ref)
                print("💊 Found reference:", ref)

    # 3. Fetch each referenced Questionnaire and MedicationRequest
    questionnaires = []
    for qid in questionnaire_ids:
        q_url = f"{FHIR_JPA_URL}/Questionnaire/{qid}"
        print("🌐 Fetching Questionnaire:", q_url)
        q_resp = get_fhir_resource(q_url)  # already a dict
        questionnaires.append(q_resp)

    medications = []
    for ref in medication_refs:
        m_url = f"{FHIR_JPA_URL}/{ref}"
        print("🌐 Fetching MedicationRequest:", m_url)
        m_resp = get_fhir_resource(m_url)  # already a dict
        medications.append(m_resp)

    # 4. Return the combined result
    return {
        "careplan": careplan,
        "questionnaires": questionnaires,
        "medications": medications
    }

# Get all CarePlan resources linked to the patient
def get_all_my_careplans(user):
    patient_id = user["fhir_id"].split("/")[1]
    return get_fhir_resource(f"{FHIR_JPA_URL}/CarePlan?subject=Patient/{patient_id}")
