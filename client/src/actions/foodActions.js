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
  FOOD_ADD_SUCCESS,
  FOOD_ADD_FAIL,
  FOOD_ADD_REQUEST,
  FOOD_EDIT_REQUEST,
  FOOD_EDIT_SUCCESS,
  FOOD_EDIT_FAIL,
  MY_FOOD_LIST_REQUEST,
  MY_FOOD_LIST_SUCCESS,
  MY_FOOD_LIST_FAIL,
  GET_PUBLIC_RESTAURANT_MENU_REQUEST,
  GET_PUBLIC_RESTAURANT_MENU_SUCCESS,
  GET_PUBLIC_RESTAURANT_MENU_FAIL
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

    await axios.delete(`/api/foods/${foodId}`, config);

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

export const addFood = (name, price, image) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOOD_ADD_REQUEST,
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
    
    const { data } = await axios.post('/api/foods/add', { name, price, image }, config);
    dispatch({
      type: FOOD_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FOOD_ADD_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const editFood = (food) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOOD_EDIT_REQUEST,
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

    const { data } = await axios.put(`/api/foods/${food._id}`, food, config);

    dispatch({
      type: FOOD_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FOOD_EDIT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get all foods belonging to restaurant user
export const listMyFoods = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_FOOD_LIST_REQUEST });

    const {
      restaurantUserLogin: { restaurantUserInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${restaurantUserInfo.token}`,
      },
    };

    // Request from API
    const { data } = await axios.get('/api/foods/mymenu', config);
    dispatch({
      type: MY_FOOD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_FOOD_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Customers gets restaurant's menu
export const publicRestaurantMenuAction = (restaurantId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PUBLIC_RESTAURANT_MENU_REQUEST });

    // Request from API
    const { data } = await axios.get(`/api/foods/restaurants/${restaurantId}`);
    dispatch({
      type: GET_PUBLIC_RESTAURANT_MENU_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PUBLIC_RESTAURANT_MENU_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};