import { GET_FOODS, ADD_FOOD, DELETE_FOOD } from './types';

export const getFoods = () => {
  return {
    type: GET_FOODS,
  };
};

export const deleteFood = (foodId) => {
  return {
    type: DELETE_FOOD,
    payload: foodId
  };
};
