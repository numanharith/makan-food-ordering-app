import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import {
  foodListReducer,
  foodDetailsReducer,
  foodDeleteReducer,
  foodAddReducer,
  foodEditReducer,
} from './reducers/foodReducers';
import { restaurantUserLoginReducer, restaurantUserRegReducer } from './reducers/restaurantReducers';
import { customerLoginReducer, customerRegReducer } from './reducers/customerReducers';

const reducer = combineReducers({
  foodList: foodListReducer,
  foodDetails: foodDetailsReducer,
  foodDelete: foodDeleteReducer,
  foodEdit: foodEditReducer,
  foodAdd: foodAddReducer,
  restaurantUserLogin: restaurantUserLoginReducer,
  restaurantUserReg: restaurantUserRegReducer,
  customerReg: customerRegReducer,
  customerLogin: customerLoginReducer,
});

const restaurantUserInfoFromStorage = localStorage.getItem('restaurantUserInfo')
  ? JSON.parse(localStorage.getItem('restaurantUserInfo'))
  : null;

const customerInfoFromStorage = localStorage.getItem('customerInfo')
  ? JSON.parse(localStorage.getItem('customerInfo'))
  : null;

const initialState = {
  restaurantUserLogin: { restaurantUserInfo: restaurantUserInfoFromStorage },
  customerLogin: { customerInfo: customerInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
