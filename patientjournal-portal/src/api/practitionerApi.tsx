import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from './config';

const getAuthHeaders = () => {
  const token = Cookies.get('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// === Practitioner ===
export const fetchPractitionerProfile = async () => {
  const res = await axios.get(`${API_BASE_URL}/practitioner`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

// === Patients ===
export const fetchAllPatients = async () => {
  const res = await axios.get(`${API_BASE_URL}/patients`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

// === Practitioners ===
export const fetchAllPractitioners = async () => {
  const res = await axios.get(`${API_BASE_URL}/practitioners`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

// === Patient Journal ===
export const fetchPatientJournal = async (patientId: string) => {
  const res = await axios.get(`${API_BASE_URL}/patients/${patientId}/journal`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

// === Observations ===
export const createObservation = async (obs: object) => {
  const res = await axios.post(`${API_BASE_URL}/observations`, obs, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

export const fetchObservationById = async (obsId: string) => {
  const res = await axios.get(`${API_BASE_URL}/observations/${obsId}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

export const fetchAllObservationsForPatient = async (patientId: string) => {
  const res = await axios.get(`${API_BASE_URL}/patients/${patientId}/observations`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

export const updateObservation = async (obsId: string, obs: object) => {
  const res = await axios.put(`${API_BASE_URL}/observations/${obsId}`, obs, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

export const deleteObservation = async (obsId: string) => {
  const res = await axios.delete(`${API_BASE_URL}/observations/${obsId}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

// === CarePlans ===
export const createCarePlan = async (careplan: object) => {
  const res = await axios.post(`${API_BASE_URL}/careplans`, careplan, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

export const fetchCarePlanById = async (planId: string) => {
  const res = await axios.get(`${API_BASE_URL}/careplans/${planId}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

export const fetchCarePlansForPatient = async (patientId: string) => {
  const res = await axios.get(`${API_BASE_URL}/patients/${patientId}/careplans`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

export const updateCarePlan = async (planId: string, careplan: object) => {
  const res = await axios.put(`${API_BASE_URL}/careplans/${planId}`, careplan, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

export const deleteCarePlan = async (planId: string) => {
  const res = await axios.delete(`${API_BASE_URL}/careplans/${planId}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};
