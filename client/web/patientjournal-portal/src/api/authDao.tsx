import axios from 'axios';
import { API_BASE_URL } from './config';

// AUTH

export const registerUser = async (data) => {
    try {
      return await axios.post(`${API_BASE_URL}/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
    } catch (err) {
      console.error('❌ registerUser failed:', err);
      throw err;
    }
  };

export const loginUser = async (params: URLSearchParams) => {
    try {
      console.log('🔐 Login request:', params.toString());
  
      return await axios.post(`${API_BASE_URL}/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });
    } catch (err) {
      console.error('loginUser failed:', err);
      throw err;
    }
  };