import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionTypes";

const initialState = {
  isAuth: false,
  token: "",
  isLoading: false,
  isError: false,
};

const signupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: payload,
        isLoading: false,
        isError: false,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export { signupReducer };
