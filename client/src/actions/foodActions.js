import {
  FOOD_LIST_REQUEST,
  FOOD_LIST_SUCCESS,
  FOOD_LIST_FAIL,
  FOOD_DETAILS_REQUEST,
  FOOD_DETAILS_SUCCESS,
  FOOD_DETAILS_FAIL,
} from '../constants/foodConstants';
import axios from 'axios';

export const listFoods = () => async (dispatch) => {
  try {
    dispatch({ type: FOOD_LIST_REQUEST });

    // Request from API
    const { data } = await axios.get('/api/foods');
    dispatch({
      type: FOOD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FOOD_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listFoodDetails = (foodId) => async (dispatch) => {
  try {
    dispatch({ type: FOOD_DETAILS_REQUEST });

    // Request from API
    const { data } = await axios.get(`/api/foods/${foodId}`);
    dispatch({
      type: FOOD_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FOOD_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
