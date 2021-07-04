import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// Reducers
import { foodListReducer, foodDetailsReducer, foodDeleteReducer } from './reducers/foodReducers';
import { restaurantUserLoginReducer, restaurantUserRegReducer } from './reducers/restaurantReducers';

const reducer = combineReducers({
  foodList: foodListReducer,
  foodDetails: foodDetailsReducer,
  foodDelete: foodDeleteReducer,
  restaurantUserLogin: restaurantUserLoginReducer,
  restaurantUserReg: restaurantUserRegReducer,
});

const restaurantUserInfoFromStorage = localStorage.getItem('restaurantUserInfo')
  ? JSON.parse(localStorage.getItem('restaurantUserInfo'))
  : null;

const initialState = {
  restaurantUserLogin: { restaurantUserInfo: restaurantUserInfoFromStorage }
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
