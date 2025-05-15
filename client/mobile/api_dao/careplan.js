import { api } from './axiosConfig';


//get careplan with questionnaire and medication request references 
export const getFullCarePlan = async () => {
  try {
    const response = await api.get('/my-careplan/latest');
    console.log('📥 Fetched Full CarePlan:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching full care plan:', error);
    throw error;
  }
};
