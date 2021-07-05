import {
  RESTAURANT_USER_LOGIN_REQUEST,
  RESTAURANT_USER_LOGIN_SUCCESS,
  RESTAURANT_USER_LOGIN_FAIL,
  RESTAURANT_USER_LOGOUT,
  RESTAURANT_USER_REG_REQUEST,
  RESTAURANT_USER_REG_SUCCESS,
  RESTAURANT_USER_REG_FAIL,
  GET_RESTAURANTS_REQUEST,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAIL,
} from '../constants/restaurantConstants';

export const restaurantUserLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_USER_LOGIN_REQUEST:
      return { loading: true };
    case RESTAURANT_USER_LOGIN_SUCCESS:
      return { loading: false, restaurantUserInfo: action.payload };
    case RESTAURANT_USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case RESTAURANT_USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const restaurantUserRegReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_USER_REG_REQUEST:
      return { loading: true };
    case RESTAURANT_USER_REG_SUCCESS:
      return { loading: false, restaurantUserInfo: action.payload };
    case RESTAURANT_USER_REG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getRestaurantsReducer = (state = { restaurants: [] }, action) => {
  switch (action.type) {
    case GET_RESTAURANTS_REQUEST:
      return { loading: true, restaurants: [] };
    case GET_RESTAURANTS_SUCCESS:
      return { loading: false, restaurants: action.payload };
    case GET_RESTAURANTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
