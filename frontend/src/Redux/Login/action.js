import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE } from "./actionTypes";

export const login = (details) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const res = await fetch(`https://arba-u5ed.onrender.com/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: LOGIN_SUCCESS, payload: { token: data.token, name: data.user } });
      } else {
        throw new Error(data.msg || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
      const res = await fetch(`https://arba-u5ed.onrender.com/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        // Handle success response if needed
        dispatch({ type: FORGOT_PASSWORD_SUCCESS });
      } else {
        throw new Error(data.msg || 'Request failed');
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
    }
  };
};

export const updatePassword = (id,newPassword) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    try {
      const response = await fetch('https://arba-u5ed.onrender.com/forgot-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ _id : id, password: newPassword }),
      });
      if (!response.ok) {
        throw new Error('Failed to update password');
      }
      const updatedPassword = await response.json();
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: updatedPassword });
    } catch (error) {
      dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: error.message });
    }
  };
};

export const updateProfile = (details) => {
  console.log(details)
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
      const res = await fetch(`https://arba-u5ed.onrender.com/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`, // Include JWT token in the request headers
        },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      if (res.ok) {
        // Handle success response if needed
        dispatch({ type: UPDATE_PROFILE_SUCCESS });
      } else {
        throw new Error(data.msg || 'Update failed');
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
    }
  };
};

export const logout = () => {
  localStorage.setItem('token', '');
  localStorage.setItem('user', '');
  return {
    type: LOGOUT,
  };
};
