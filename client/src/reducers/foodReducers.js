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
