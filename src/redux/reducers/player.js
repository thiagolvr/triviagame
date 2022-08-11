import { ADD_USER, SAVE_SCORE } from '../actions';

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
  default:
    return state;
  }
};

export default player;

// case SAVE_SCORE:
//     if (state.score && state.score.length > 0) {
//       return {
//         score: state.score.reduce((acc, curr) => acc + curr),
//         payload,
//       };
//     }
//     return {
//       score: payload,
//     };

// case SAVE_SCORE:
//     if (state.score && state.score.length > 0) {
//       return {
//         score: [...state.score, payload],
//       };
//     }
//     return {
//       score: [payload],
//     };

// case SAVE_SCORE:
//     if (payload && state.score) {
//       sum = [...state.score, payload].reduce((acc, curr) => acc + curr);
//     }
//     return {
//       score: sum,
//     };

//     if (state.score && state.score.length > 0) {
//       return {
//         score: state.score.reduce((acc, curr) => acc + curr),
//         payload,
//       };
//     }
//     return {
//       score: payload,
//     };
