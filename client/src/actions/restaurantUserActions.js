import axios from 'axios';
import {
  RESTAURANT_USER_LOGIN_FAIL,
  RESTAURANT_USER_LOGIN_REQUEST,
  RESTAURANT_USER_LOGIN_SUCCESS,
} from '../constants/restaurantConstants';

export const restaurantLogin = (name, password, logo) => async (dispatch) => {
  try {
    dispatch({
      type: RESTAURANT_USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/restaurants/login', { name, password, logo }, config);

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
