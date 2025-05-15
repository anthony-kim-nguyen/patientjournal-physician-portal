import axios from 'axios';
import Cookies from 'js-cookie';

export const API_BASE_URL = 'https://eh7tt3obg4.execute-api.us-west-1.amazonaws.com';//auth api
//const API_BASE_URL = 'http://52.53.216.247:8080/fhir'//fhir server
//export const API_BASE_URL = 'http://192.168.4.29:8000';//local testing
//const API_BASE_URL = 'https://hapi.fhir.org/baseR4';

// Setup base config
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    },
});
  
  // Attach token to all requests automatically
  api.interceptors.request.use(
    (config) => {
      const token = Cookies.get('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Optional: Handle 401 errors (token expired, etc.)
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.warn('⛔ Token expired or invalid, logging out');
        // Optionally clear token and redirect to login
      }
      return Promise.reject(error);
    }
  );
