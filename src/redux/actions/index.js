export const ADD_USER = 'ADD_USER';
export const SAVE_SCORE = 'SAVE_SCORE';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});

export const saveScore = (payload) => ({
  type: SAVE_SCORE,
  payload,
});

export const saveQuestions = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});
