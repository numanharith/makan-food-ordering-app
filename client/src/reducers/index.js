import { combineReducers } from 'redux'
import foodReducer from './foodReducer'
import errorReducer from './errorReducer'
import restaurantAuthReducer from './restaurantAuthReducer'

export default combineReducers({
  food: foodReducer,
  error: errorReducer,
  restaurantAuth: restaurantAuthReducer
})