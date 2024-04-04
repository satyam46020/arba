import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { loginReducer } from './Login/reducer';
import { signupReducer } from './Register/reducer';
// import { taskReducer} from './Task/reducer'

const rootReducer = combineReducers({loginReducer, signupReducer});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
