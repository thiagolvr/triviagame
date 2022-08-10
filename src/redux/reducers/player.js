import { ADD_USER, SAVE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  gravatarEmail: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  const { name, gravatarEmail } = state;
  switch (action.type) {
  case ADD_USER:
    return {
      name,
      gravatarEmail,
      ...action.payload,
    };
  case SAVE_SCORE:
    console.log(typeof action.payload);
    return {
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;
