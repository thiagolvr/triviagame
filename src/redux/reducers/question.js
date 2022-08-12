import { SAVE_QUESTIONS } from '../../helpers/constants';

const questions = (state = [], { type, payload }) => {
  switch (type) {
  case SAVE_QUESTIONS:
    return payload;
  default:
    return state;
  }
};

export default questions;
