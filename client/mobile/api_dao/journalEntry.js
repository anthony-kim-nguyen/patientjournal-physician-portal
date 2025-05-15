import { api } from './axiosConfig'; // Make sure this points to your configured Axios instance

// CREATE a new Observation tagged as journal-entry
export const createJournalEntry = async (journalEntryData) => {
  try {
    console.log('Submitting Journal Entry Payload:', journalEntryData);

    const response = await api.post('/my-journal', journalEntryData);
    console.log('✅ Created Journal Entry:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating Journal Entry:', error);
    throw error;
  }
};

// GET 7 recent journal entries for the current patient
export const getMyJournalEntries = async () => {
  try {
    const response = await api.get('/my-journal');
    console.log('📖 My Journal Entries:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching journal entries:', error);
    throw error;
  }
};

// GET journal entry by ID
export const getJournalEntryById = async (obsId) => {
  try {
    const response = await api.get(`/my-journal/${obsId}`);
    console.log(`📄 Fetched Journal Entry ${obsId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching journal entry by ID:', error);
    throw error;
  }
};

// UPDATE journal entry
export const updateJournalEntry = async (obsId, updatedData) => {
  try {
    const response = await api.put(`/my-journal/${obsId}`, updatedData);
    console.log(`✏️ Updated Journal Entry ${obsId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error updating journal entry:', error);
    throw error;
  }
};

// DELETE journal entry
export const deleteJournalEntry = async (obsId) => {
  try {
    const response = await api.delete(`/my-journal/${obsId}`);
    console.log(`🗑️ Deleted Journal Entry ${obsId}:`, response.status);
    return response.status;
  } catch (error) {
    console.error('❌ Error deleting journal entry:', error);
    throw error;
  }
};

// PRACTITIONER: Get all journal entries for a patient by ID
export const getJournalEntriesForPatient = async (patientId) => {
  try {
    const response = await api.get(`/journals/${patientId}`);
    console.log(`👩‍⚕️ Journal Entries for Patient ${patientId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching patient journal entries:', error);
    throw error;
  }
};
