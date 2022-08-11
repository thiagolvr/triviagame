export const ADD_USER = 'ADD_USER';
export const SAVE_SCORE = 'SAVE_SCORE';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_ASSERTIONS = 'SAVE_ASSERTIONS';
export const ADD_RANKING = 'ADD_RANKING';
export const RESET_SCORE = 'RESET_SCORE';

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

export const saveAssertions = (payload) => ({
  type: SAVE_ASSERTIONS,
  payload,
});

export const addRanking = (payload) => ({
  type: ADD_RANKING,
  payload,
});

export const resetScore = (payload) => ({
  type: RESET_SCORE,
  payload,
});
