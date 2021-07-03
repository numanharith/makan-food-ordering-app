/* eslint-disable import/no-anonymous-default-export */
import {
  RESTAURANT_USER_REGISTER_SUCCESS,
  RESTAURANT_USER_REGISTER_FAIL,
  RESTAURANT_USER_LOGIN_SUCCESS,
  RESTAURANT_USER_LOGIN_FAIL,
  RESTAURANT_AUTH_ERROR,
  RESTAURANT_USER_LOGOUT_SUCCESS,
  RESTAURANT_USER_LOADING,
  RESTAURANT_USER_LOADED,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  restaurantUser: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESTAURANT_USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case RESTAURANT_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        restaurantUser: action.payload,
      };
    case RESTAURANT_USER_LOGIN_SUCCESS:
    case RESTAURANT_USER_REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case RESTAURANT_AUTH_ERROR:
    case RESTAURANT_USER_REGISTER_FAIL:
    case RESTAURANT_USER_LOGIN_FAIL:
    case RESTAURANT_USER_LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return{
        ...state,
        token: null,
        restaurantUser: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
