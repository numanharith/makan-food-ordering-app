import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  RESTAURANT_USER_REGISTER_SUCCESS,
  RESTAURANT_USER_REGISTER_FAIL,
  RESTAURANT_USER_LOGIN_SUCCESS,
  RESTAURANT_USER_LOGIN_FAIL,
  RESTAURANT_AUTH_ERROR,
  RESTAURANT_USER_LOGOUT_SUCCESS,
  RESTAURANT_USER_LOADING,
  RESTAURANT_USER_LOADED,
} from './types';

// Check token and load restaurant user
export const loadRestaurantUser = () => (dispatch, getState) => {
  // Restaurant user loading
  dispatch({ type: RESTAURANT_USER_LOADING });

  // Fetch restaurant user from API
  axios
    .get('/api/restaurantAuth/restaurant', tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: RESTAURANT_USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: RESTAURANT_AUTH_ERROR,
      });
    });
};

// Register new restaurant user
export const registerRestaurantUser =
  ({ name, password }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Request body
    const body = JSON.stringify({ name, password });

    axios
      .post('/api/restaurantAuth/register', body, config)
      .then((res) =>
        dispatch({
          type: RESTAURANT_USER_REGISTER_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, 'RESTAURANT_USER_REGISTER_FAIL'));
        dispatch({
          type: RESTAURANT_USER_REGISTER_FAIL,
        });
      });
  };

export const logoutRestaurant = () => {
  return {
    type: RESTAURANT_USER_LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().restaurantAuth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add token to header if there's one
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
