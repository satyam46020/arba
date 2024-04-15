import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./actionTypes";

export const signup = (details) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });
      const res=await fetch('https://arba-u5ed.onrender.com/register', {
        method: 'POST',
        body: details,
      });
      // console.log(await res)
      dispatch({ type: SIGNUP_SUCCESS });
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE });
      // console.log(error)
    }
  }; 
};