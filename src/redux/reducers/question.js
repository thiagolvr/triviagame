import { SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

const questionsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_QUESTIONS:
    return {
      questions: payload,
    };
  default:
    return state;
  }
};

export default questionsReducer;
