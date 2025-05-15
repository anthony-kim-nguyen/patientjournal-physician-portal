import { api } from './config';

// Error handler utility
const handleError = (error, context) => {
  console.error(`❌ ${context} failed:`, error);
  throw error;
};

// ==========================
// PATIENTS
// ==========================

// Fetch all patients (FHIR Bundle)
export const fetchAllPatients = async () => {
  try {
    const response = await api.get('/patients');
    console.log('📦 fetchAllPatients response.data:', response.data); // Log the actual FHIR Bundle
    return response.data; // Return just the FHIR Bundle
  } catch (err) {
    handleError(err, 'fetchAllPatients');
  }
};

// Fetch a single patient by ID
export const fetchPatientById = async (patientId) => {
  try {
    const response = await api.get(`/patients/${patientId}`);
    console.log(`📄 fetchPatientById (${patientId}):`, response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'fetchPatientById');
  }
};

// ==========================
// PRACTITIONERS
// ==========================

export const fetchPractitionerProfile = async () => {
  try {
    const response = await api.get('/practitioner');
    console.log('👤 Practitioner profile:', response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'fetchPractitionerProfile');
  }
};

export const fetchAllPractitioners = async () => {
  try {
    const response = await api.get('/practitioners');
    console.log('👥 All practitioners:', response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'fetchAllPractitioners');
  }
};

// ==========================
// CAREPLANS
// ==========================

export const createCarePlan = async (data) => {
  try {
    const response = await api.post('/careplans', data);
    console.log('📘 Created CarePlan:', response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'createCarePlan');
  }
};

export const fetchCarePlanById = async (planId) => {
  try {
    const response = await api.get(`/careplans/${planId}`);
    console.log(`📄 Fetched CarePlan (${planId}):`, response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'fetchCarePlanById');
  }
};

export const updateCarePlan = async (planId, data) => {
  try {
    const response = await api.put(`/careplans/${planId}`, data);
    console.log(`✏️ Updated CarePlan (${planId}):`, response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'updateCarePlan');
  }
};

export const deleteCarePlan = async (planId) => {
  try {
    const response = await api.delete(`/careplans/${planId}`);
    console.log(`🗑️ Deleted CarePlan (${planId})`);
    return response.data;
  } catch (err) {
    handleError(err, 'deleteCarePlan');
  }
};

export const fetchCarePlansForPatient = async (patientId) => {
  try {
    const response = await api.get(`/patients/${patientId}/careplans`);
    console.log(`📋 CarePlans for Patient ${patientId}:`, response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'fetchCarePlansForPatient');
  }
};

// ==========================
// JOURNALS
// ==========================

export const fetchJournalEntriesForPatient = async (patientId) => {
  try {
    const response = await api.get(`/journals/${patientId}`);
    console.log(`📓 Journal entries for Patient ${patientId}:`, response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'fetchJournalEntriesForPatient');
  }
};

// ==========================
// OBSERVATIONS
// ==========================

export const createObservation = async (data) => {
  try {
    const response = await api.post('/observations', data);
    console.log('📈 Created Observation:', response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'createObservation');
  }
};

export const fetchObservationById = async (obsId) => {
  try {
    const response = await api.get(`/observations/${obsId}`);
    console.log(`📄 Fetched Observation (${obsId}):`, response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'fetchObservationById');
  }
};

export const updateObservation = async (obsId, data) => {
  try {
    const response = await api.put(`/observations/${obsId}`, data);
    console.log(`✏️ Updated Observation (${obsId}):`, response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'updateObservation');
  }
};

export const deleteObservation = async (obsId) => {
  try {
    const response = await api.delete(`/observations/${obsId}`);
    console.log(`🗑️ Deleted Observation (${obsId})`);
    return response.data;
  } catch (err) {
    handleError(err, 'deleteObservation');
  }
};

export const fetchObservationsForPatient = async (patientId) => {
  try {
    const response = await api.get(`/patients/${patientId}/observations`);
    console.log(`📊 Observations for Patient ${patientId}:`, response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'fetchObservationsForPatient');
  }
};

// ==========================
// QUESTIONNAIRES
// ==========================

export const createQuestionnaire = async (data) => {
  try {
    const response = await api.post('/questionnaire', data);
    console.log('📋 Created Questionnaire:', response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'createQuestionnaire');
  }
};

// ==========================
// MEDICATION REQUESTS
// ==========================

export const createMedicationRequest = async (data) => {
  try {
    const response = await api.post('/medicationrequest', data);
    console.log('💊 Created MedicationRequest:', response.data);
    return response.data;
  } catch (err) {
    handleError(err, 'createMedicationRequest');
  }
};
