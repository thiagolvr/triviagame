import { combineReducers } from 'redux';
import player from './player';
import questions from './question';
import ranking from './ranking';

const rootReducer = combineReducers({ player, questions, ranking });

export default rootReducer;
