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
  myFoodListReducer,
  publicRestaurantMenuReducer,
} from './reducers/foodReducers';
import {
  getRestaurantsReducer,
  restaurantUserLoginReducer,
  restaurantUserRegReducer,
} from './reducers/restaurantReducers';
import { customerLoginReducer, customerRegReducer } from './reducers/customerReducers';
import { cartReducer } from './reducers/cartReduers';
import { changeOrderStatusReducer, customerGetsOrdersReducer, orderCreateReducer, restaurantGetsOrdersReducer } from './reducers/orderReducers';

const reducer = combineReducers({
  foodList: foodListReducer,
  myFoodList: myFoodListReducer,
  foodDetails: foodDetailsReducer,
  foodDelete: foodDeleteReducer,
  foodEdit: foodEditReducer,
  foodAdd: foodAddReducer,
  restaurantUserLogin: restaurantUserLoginReducer,
  restaurantUserReg: restaurantUserRegReducer,
  restaurantList: getRestaurantsReducer,
  publicRestaurantMenu: publicRestaurantMenuReducer,
  customerReg: customerRegReducer,
  customerLogin: customerLoginReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  customerGetsOrders: customerGetsOrdersReducer,
  restaurantGetsOrders: restaurantGetsOrdersReducer,
  changeOrderStatus: changeOrderStatusReducer,
});

const restaurantUserInfoFromStorage = localStorage.getItem('restaurantUserInfo')
  ? JSON.parse(localStorage.getItem('restaurantUserInfo'))
  : null;

const customerInfoFromStorage = localStorage.getItem('customerInfo')
  ? JSON.parse(localStorage.getItem('customerInfo'))
  : null;

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
  restaurantUserLogin: { restaurantUserInfo: restaurantUserInfoFromStorage },
  customerLogin: { customerInfo: customerInfoFromStorage },
  cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
