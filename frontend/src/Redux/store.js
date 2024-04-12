import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { loginReducer } from './Login/reducer';
import { signupReducer } from './Register/reducer';
import { productReducer } from './Product/reducer';
import { categoryReducer } from './Category/reducer';
import cartReducer from './Cart/reducer';

const rootReducer = combineReducers({loginReducer, signupReducer, productReducer, categoryReducer, cartReducer});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
