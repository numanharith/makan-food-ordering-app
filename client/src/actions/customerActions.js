import axios from 'axios';
import {
  CUSTOMER_LOGIN_FAIL,
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGOUT,
  CUSTOMER_REG_FAIL,
  CUSTOMER_REG_REQUEST,
  CUSTOMER_REG_SUCCESS,
} from '../constants/customerConstants';

// Customer user logins
export const customerLoginAction = (name, password) => async (dispatch) => {
  try {
    dispatch({
      type: CUSTOMER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/customers/login', { name, password }, config);
    dispatch({
      type: CUSTOMER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('customerInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CUSTOMER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Customer user logouts
export const customerLogoutAction = () => (dispatch) => {
  localStorage.removeItem('customerInfo');
  dispatch({ type: CUSTOMER_LOGOUT });
};

// Customer user registers
export const customerRegAction = (name, password) => async (dispatch) => {
  try {
    dispatch({
      type: CUSTOMER_REG_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/customers/reg', { name, password }, config);
    dispatch({
      type: CUSTOMER_REG_SUCCESS,
      payload: data,
    });
    // customer user automatically logs in after registration
    dispatch({
      type: CUSTOMER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('customerInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CUSTOMER_REG_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
