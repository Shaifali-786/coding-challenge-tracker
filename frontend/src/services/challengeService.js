import axios from 'axios';

/**
 * Challenge API Service
 * Handles all API calls related to challenges
 */

const API_URL = '/api/challenges';

/**
 * Get all challenges for logged in user
 */
export const getChallenges = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/**
 * Get single challenge by ID
 */
export const getChallenge = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

/**
 * Create new challenge
 */
export const createChallenge = async (challengeData) => {
  const response = await axios.post(API_URL, challengeData);
  return response.data;
};

/**
 * Update challenge
 */
export const updateChallenge = async (id, challengeData) => {
  const response = await axios.put(`${API_URL}/${id}`, challengeData);
  return response.data;
};

/**
 * Delete challenge
 */
export const deleteChallenge = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

/**
 * Toggle day completion status
 */
export const toggleDayCompletion = async (challengeId, dayNumber, notes = '') => {
  const response = await axios.put(
    `${API_URL}/${challengeId}/day/${dayNumber}`,
    { notes }
  );
  return response.data;
};

/**
 * Get challenge progress summary
 */
export const getChallengeProgress = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/progress`);
  return response.data;
};
