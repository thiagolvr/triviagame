import { ADD_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_USER:
    return {
      ...state,
      ...payload,
    };
  default:
    return state;
  }
};

export default player;
