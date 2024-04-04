import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./actionTypes";

export const signup = (details) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });
      console.log(details);
      const res=await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });
      console.log(await res.json())
      dispatch({ type: SIGNUP_SUCCESS });
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE });
      console.log(error)
    }
  };
};