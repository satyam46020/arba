import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./actionTypes";

export const signup = (details) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });
      console.log(details.get('avatar'));
      const res=await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: details,
      });
      console.log(await res)
      dispatch({ type: SIGNUP_SUCCESS });
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE });
      console.log(error)
    }
  }; 
};