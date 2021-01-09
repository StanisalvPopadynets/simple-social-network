import {combineReducers} from 'redux';
import {usersReducer} from './users';

const reducers = combineReducers({
  usersState: usersReducer,
});

export default reducers;
