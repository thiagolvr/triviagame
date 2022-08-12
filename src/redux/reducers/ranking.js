import { ADD_RANKING } from '../../helpers/constants';

const ranking = (state = [], { type, payload }) => {
  switch (type) {
  case ADD_RANKING:
    return [...state, payload];

  default:
    return state;
  }
};

export default ranking;
