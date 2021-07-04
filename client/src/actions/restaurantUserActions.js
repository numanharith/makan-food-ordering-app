import axios from 'axios';
import {
  RESTAURANT_USER_LOGIN_FAIL,
  RESTAURANT_USER_LOGIN_REQUEST,
  RESTAURANT_USER_LOGIN_SUCCESS,
  RESTAURANT_USER_LOGOUT,
  RESTAURANT_USER_REG_FAIL,
  RESTAURANT_USER_REG_REQUEST,
  RESTAURANT_USER_REG_SUCCESS,
} from '../constants/restaurantConstants';

// Restaurant user logins
export const restaurantLogin = (name, password) => async (dispatch) => {
  try {
    dispatch({
      type: RESTAURANT_USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/restaurants/login', { name, password }, config);
    dispatch({
      type: RESTAURANT_USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('restaurantUserInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: RESTAURANT_USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Restaurant user logouts
export const restaurantLogout = () => (dispatch) => {
  localStorage.removeItem('restaurantUserInfo');
  dispatch({ type: RESTAURANT_USER_LOGOUT });
};

// Restaurant user registers
export const restaurantReg = (name, password, logo) => async (dispatch) => {
  try {
    dispatch({
      type: RESTAURANT_USER_REG_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/restaurants/reg', { name, password, logo }, config);
    dispatch({
      type: RESTAURANT_USER_REG_SUCCESS,
      payload: data,
    });
    // Restaurant user automatically logs in after registration
    dispatch({
      type: RESTAURANT_USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('restaurantUserInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: RESTAURANT_USER_REG_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
