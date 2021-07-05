import {
  FOOD_LIST_REQUEST,
  FOOD_LIST_SUCCESS,
  FOOD_LIST_FAIL,
  FOOD_DETAILS_REQUEST,
  FOOD_DETAILS_SUCCESS,
  FOOD_DETAILS_FAIL,
  FOOD_DELETE_REQUEST,
  FOOD_DELETE_SUCCESS,
  FOOD_DELETE_FAIL,
  FOOD_ADD_REQUEST,
  FOOD_ADD_SUCCESS,
  FOOD_ADD_FAIL,
  FOOD_EDIT_REQUEST,
  FOOD_EDIT_SUCCESS,
  FOOD_EDIT_FAIL,
  FOOD_EDIT_RESET,
  MY_FOOD_LIST_REQUEST,
  MY_FOOD_LIST_SUCCESS,
  MY_FOOD_LIST_FAIL,
  GET_PUBLIC_RESTAURANT_MENU_REQUEST,
  GET_PUBLIC_RESTAURANT_MENU_SUCCESS,
  GET_PUBLIC_RESTAURANT_MENU_FAIL,
} from '../constants/foodConstants';

export const foodListReducer = (state = { foods: [] }, action) => {
  switch (action.type) {
    case FOOD_LIST_REQUEST:
      return { loading: true, foods: [] };
    case FOOD_LIST_SUCCESS:
      return { loading: false, foods: action.payload };
    case FOOD_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const myFoodListReducer = (state = { foods: [] }, action) => {
  switch (action.type) {
    case MY_FOOD_LIST_REQUEST:
      return { loading: true, foods: [] };
    case MY_FOOD_LIST_SUCCESS:
      return { loading: false, foods: action.payload };
    case MY_FOOD_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const foodDetailsReducer = (state = { food: {} }, action) => {
  switch (action.type) {
    case FOOD_DETAILS_REQUEST:
      return { loading: true, ...state };
    case FOOD_DETAILS_SUCCESS:
      return { loading: false, food: action.payload };
    case FOOD_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const foodDeleteReducer = (state = { food: {} }, action) => {
  switch (action.type) {
    case FOOD_DELETE_REQUEST:
      return { loading: true };
    case FOOD_DELETE_SUCCESS:
      return { loading: false, success: true };
    case FOOD_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const foodAddReducer = (state = { food: {} }, action) => {
  switch (action.type) {
    case FOOD_ADD_REQUEST:
      return { loading: true };
    case FOOD_ADD_SUCCESS:
      return { loading: false, success: true };
    case FOOD_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const foodEditReducer = (state = { food: {} }, action) => {
  switch (action.type) {
    case FOOD_EDIT_REQUEST:
      return { loading: true };
    case FOOD_EDIT_SUCCESS:
      return { loading: false, success: true, food: action.payload };
    case FOOD_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case FOOD_EDIT_RESET:
      return { food: {} };
    default:
      return state;
  }
};

export const publicRestaurantMenuReducer = (state = { foods: [] }, action) => {
  switch (action.type) {
    case GET_PUBLIC_RESTAURANT_MENU_REQUEST:
      return { loading: true };
    case GET_PUBLIC_RESTAURANT_MENU_SUCCESS:
      return { loading: false, foods: action.payload };
    case GET_PUBLIC_RESTAURANT_MENU_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
