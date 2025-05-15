import { api } from './axiosConfig';

//get my patient profile
export const getPatientProfile = async () => {
  try {
    const res = await api.get('/me');
    return res.data;
  } catch (error) {
    console.error('❌ Error fetching patient profile:', error);
    throw error;
  }
};
