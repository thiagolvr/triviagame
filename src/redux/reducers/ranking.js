import { ADD_RANKING } from '../../helpers/constants';

const INITIAL_STATE = [];

const ranking = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_RANKING:
    return [...state, payload];

  default:
    return state;
  }
};

export default ranking;
