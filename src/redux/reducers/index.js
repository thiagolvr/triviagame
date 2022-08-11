import { combineReducers } from 'redux';
import player from './player';
import questionsReducer from './question';

const rootReducer = combineReducers({ player, questionsReducer });

export default rootReducer;
