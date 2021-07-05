import {
  GET_RESTAURANTS_REQUEST,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAIL,
} from '../constants/restaurantConstants';
import axios from 'axios';

export const getRestaurantsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_RESTAURANTS_REQUEST });

    // Request from API
    const { data } = await axios.get('/api/restaurants');
    dispatch({
      type: GET_RESTAURANTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
