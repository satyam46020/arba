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

// Fetch cart items
export const fetchCart = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CART_REQUEST });
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      // console.log(data)
      dispatch({ type: FETCH_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_CART_FAILURE, payload: error.message });
    }
  };
};

// Add to cart
export const addToCart = (productId) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TO_CART_REQUEST });
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      console.log(data)
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADD_TO_CART_FAILURE, payload: error.message });
    }
  };
};

// Update cart item quantity
export const updateCart = (itemId, quantity) => {
  console.log(itemId)
  return async (dispatch) => {
    dispatch({ type: UPDATE_CART_REQUEST });
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5000/cart/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }

      const data = await response.json();
      
      dispatch({ type: UPDATE_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: UPDATE_CART_FAILURE, payload: error.message });
    }
  };
};

