import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

const API_BASE_URL = 'https://eh7tt3obg4.execute-api.us-west-1.amazonaws.com';//auth api
//const API_BASE_URL = 'http://52.53.216.247:8080/fhir'//fhir server
//const API_BASE_URL = 'http://192.168.4.29:8000';//local testing
//const API_BASE_URL = 'https://hapi.fhir.org/baseR4';
const router = useRouter(); 
// Setup base config
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    },
});

// Add response interceptor for handling 401 errors
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      console.warn("⛔ Token expired or invalid, logging out");

      // Clear storage
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('username');

      Alert.alert("Session Expired", "Please log in again.");
      router.push("/(auth)/login") // depends on your router

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
// Attach Bearer token to each request automatically
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export async function withAuth() {
  const token = await SecureStore.getItemAsync('authToken');
  if (!token) throw new Error('No auth token found in SecureStore');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
