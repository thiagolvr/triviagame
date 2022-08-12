import {
  ADD_USER,
  SAVE_SCORE,
  SAVE_QUESTIONS,
  SAVE_ASSERTIONS,
  ADD_RANKING,
  RESET_SCORE,
} from '../../helpers/constants';

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
