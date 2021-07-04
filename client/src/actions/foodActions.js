import {
  FOOD_LIST_REQUEST,
  FOOD_LIST_SUCCESS,
  FOOD_LIST_FAIL,
  FOOD_DETAILS_REQUEST,
  FOOD_DETAILS_SUCCESS,
  FOOD_DETAILS_FAIL,
  FOOD_DELETE_SUCCESS,
  FOOD_DELETE_FAIL,
  FOOD_DELETE_REQUEST,
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

export const deleteFood = (foodId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOOD_DELETE_REQUEST,
    });

    const {
      restaurantUserLogin: { restaurantUserInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${restaurantUserInfo.token}`,
      },
    };

    await axios.delete(`/api/foods/delete/${foodId}`, config);

    dispatch({
      type: FOOD_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FOOD_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
