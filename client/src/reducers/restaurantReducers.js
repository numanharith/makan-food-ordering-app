import {
  RESTAURANT_USER_LOGIN_REQUEST,
  RESTAURANT_USER_LOGIN_SUCCESS,
  RESTAURANT_USER_LOGIN_FAIL,
  RESTAURANT_USER_LOGOUT,
} from '../constants/restaurantConstants';

export const restaurantUserLoginReducer = (state = { foods: [] }, action) => {
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

