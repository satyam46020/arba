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
      // console.log(data);
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: LOGIN_SUCCESS, payload: { token: data.token, name: data.user } });
      } else {
        throw new Error('Login failed');
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
      localStorage.setItem("userDetails",JSON.stringify(data));
      console.log(data)
      if (!res.ok) {
        localStorage.setItem('isEmail', JSON.stringify(false));
        throw new Error(data.msg || 'Request failed');
      } else {
        localStorage.setItem('isEmail', JSON.stringify(true));
        dispatch({ type: FORGOT_PASSWORD_SUCCESS});
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
    }
  };
};

export const updatePassword = (id, oldPassword, newPassword) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    try {
      const response = await fetch('https://arba-u5ed.onrender.com/forgot-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ _id : id, oldPassword, password: newPassword }),
      });
      if (!response.ok) {
        localStorage.setItem('isPasswordChanged', JSON.stringify(false));
        throw new Error('Failed to update password');

      }
      if (response.ok) {
        localStorage.setItem('isPasswordChanged', JSON.stringify(true));

      }
      const updatedPassword = await response.json();
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: updatedPassword });
    } catch (error) {
      dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: error.message });
    }
  };
};

export const updateProfile = (_id,fullName,userName,avatar) => {
  return async (dispatch) => {
    const payload=new FormData();
      payload.append('_id', _id);
      payload.append('fullName', fullName);
      payload.append('userName',userName);
      payload.append('avatar',avatar);
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
      const res = await fetch(`https://arba-u5ed.onrender.com/profile`, {
        method: "PATCH",
        body: payload
      });
      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data));
      
      if (res.ok) {
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
