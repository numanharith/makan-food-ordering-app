import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import {
  CHANGE_ORDER_STATUS_FAIL,
  CHANGE_ORDER_STATUS_REQUEST,
  CHANGE_ORDER_STATUS_SUCCESS,
  CUSTOMER_ORDERS_FAIL,
  CUSTOMER_ORDERS_REQUEST,
  CUSTOMER_ORDERS_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  RESTAURANT_ORDERS_FAIL,
  RESTAURANT_ORDERS_REQUEST,
  RESTAURANT_ORDERS_SUCCESS,
} from '../constants/orderConstants';

export const createOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem('cartItems');
    dispatch({
      type: ORDER_CREATE_RESET,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const customerGetsOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CUSTOMER_ORDERS_REQUEST,
    });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: CUSTOMER_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_ORDERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const restaurantGetsOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESTAURANT_ORDERS_REQUEST,
    });

    const {
      restaurantUserLogin: { restaurantUserInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${restaurantUserInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/restaurant`, config);

    dispatch({
      type: RESTAURANT_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESTAURANT_ORDERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// RESTAURANT USER CHANGES ORDER STATUS
export const changeOrderStatusAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHANGE_ORDER_STATUS_REQUEST,
    });

    const {
      restaurantUserLogin: { restaurantUserInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${restaurantUserInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/orders/${order._id}`, order, config);

    dispatch({
      type: CHANGE_ORDER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_ORDER_STATUS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
