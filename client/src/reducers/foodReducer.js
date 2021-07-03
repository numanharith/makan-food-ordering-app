/* eslint-disable import/no-anonymous-default-export */
import { GET_FOODS, ADD_FOOD, DELETE_FOOD } from '../actions/types'

const initialState = {
  foods: [

  ]
}

export default function (state = initialState, action) {
  switch(action.type) {
    case GET_FOODS:
      return { ...state }
    // case DELETE_FOOD:
    
    default: 
      return state;
  }
}