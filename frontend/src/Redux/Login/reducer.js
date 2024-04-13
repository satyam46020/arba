import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS
} from "./actionTypes";

const initialState = {
  isAuth: "",
  token: "",
  isLoading: false,
  isError: false,
  user: ""
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: "true",
        token: payload.token,
        isLoading: false,
        isError: false,
        user: payload.name
      };
    case FORGOT_PASSWORD_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false
      };
    case LOGIN_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
    case UPDATE_PASSWORD_FAILURE:
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isAuth: "false",
        isLoading: false,
        isError: true,
        user: ""
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: "",
        token: "",
        isLoading: false,
        isError: false,
        user: ""
      };
    default:
      return state;
  }
};

export { loginReducer };
