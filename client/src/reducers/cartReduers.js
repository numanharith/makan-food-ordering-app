import { CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // Checks if food is from a different restaurant
      const item = action.payload;
      const diffRestaurant = state.cartItems.find((x) => x.restaurant !== item.restaurant);
      if (diffRestaurant) {
        return {
          ...state,
          cartItems: [...state.cartItems],
          error: 'You can only order from one restaurant at a time.'
        }
      }

      // Checks if food already exists in cart
      const existingItem = state.cartItems.find((x) => x.food === item.food);

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.food === existingItem.food ? item : x)),
          error: null
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          error: null
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.food !== action.payload),
        error: null
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state;
  }
};
