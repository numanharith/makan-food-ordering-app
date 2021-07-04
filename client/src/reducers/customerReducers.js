import {
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGIN_FAIL,
  CUSTOMER_LOGOUT,
  CUSTOMER_REG_REQUEST,
  CUSTOMER_REG_SUCCESS,
  CUSTOMER_REG_FAIL,
} from '../constants/customerConstants';

export const customerLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_LOGIN_REQUEST:
      return { loading: true };
    case CUSTOMER_LOGIN_SUCCESS:
      return { loading: false, customerInfo: action.payload };
    case CUSTOMER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const customerRegReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_REG_REQUEST:
      return { loading: true };
    case CUSTOMER_REG_SUCCESS:
      return { loading: false, customerInfo: action.payload };
    case CUSTOMER_REG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

