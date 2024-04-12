import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE
} from './actionTypes';

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  localStorage.setItem('cart', JSON.stringify(state.cartItems.length));
  switch (action.type) {
    case FETCH_CART_REQUEST:
      case ADD_TO_CART_REQUEST:
        case UPDATE_CART_REQUEST:
          return {
            ...state,
        loading: true,
        error: null,
      };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
        error: null,
      };
      case ADD_TO_CART_SUCCESS:
        const newItem = action.payload;
        const existingItemIndex = state.cartItems.findIndex(item => 
          item.productId === newItem.productId && item.owner === newItem.owner
        );
        
        if (existingItemIndex !== -1) {
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[existingItemIndex].quantity ++;
          return {
            ...state,
            cartItems: updatedCartItems
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, newItem]
          };
        }
        case UPDATE_CART_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false,
        error: null,
      };
      case FETCH_CART_FAILURE:
        case ADD_TO_CART_FAILURE:
          case UPDATE_CART_FAILURE:
            default:
              return state;
            }
          };
          
          export default cartReducer;
          