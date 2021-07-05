import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  CUSTOMER_ORDERS_REQUEST,
  CUSTOMER_ORDERS_SUCCESS,
  CUSTOMER_ORDERS_FAIL,
  RESTAURANT_ORDERS_REQUEST,
  RESTAURANT_ORDERS_SUCCESS,
  RESTAURANT_ORDERS_FAIL,
  CHANGE_ORDER_STATUS_REQUEST,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_FAIL,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const customerGetsOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_ORDERS_REQUEST:
      return {
        loading: true,
        orders: []
      };
    case CUSTOMER_ORDERS_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };
    case CUSTOMER_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const restaurantGetsOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case RESTAURANT_ORDERS_REQUEST:
      return {
        loading: true,
        orders: []
      };
    case RESTAURANT_ORDERS_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };
    case RESTAURANT_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const changeOrderStatusReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case CHANGE_ORDER_STATUS_REQUEST:
      return {
        loading: true,
      };
    case CHANGE_ORDER_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CHANGE_ORDER_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
