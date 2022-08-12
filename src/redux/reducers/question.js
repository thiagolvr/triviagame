import { SAVE_QUESTIONS } from '../../helpers/constants';

const INITIAL_STATE = [];
const questions = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_QUESTIONS:
    return payload;
  default:
    return state;
  }
};

export default questions;
