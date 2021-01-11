import {combineReducers} from 'redux';
import {usersReducer} from './users';
import {usersDataReducer} from './usersData';

const reducers = combineReducers({
  usersState: usersReducer,
  usersDataState: usersDataReducer,
});

export default reducers;
