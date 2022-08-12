import {
  ADD_USER,
  SAVE_SCORE,
  SAVE_ASSERTIONS,
  RESET_SCORE,
} from '../../helpers/constants';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  gravatarEmail: '',
  score: 0,
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_USER:
    return {
      ...state,
      ...payload,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: +state.score + +payload,
    };
  case SAVE_ASSERTIONS:
    return {
      ...state,
      assertions: payload,
    };
  case RESET_SCORE:
    return {
      score: payload,
    };
  default:
    return state;
  }
};

export default player;
