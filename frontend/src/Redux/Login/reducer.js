import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./actionTypes";


const initialState = {
  isAuth: false,
  token: "",
  isLoading: false,
  isError: false,
  user:""
};

const loginReducer = (state = initialState,{type,payload}) => {
  // console.log(payload)
  switch(type){
    case LOGIN_REQUEST:
      return{
        isAuth: false,
        token: "",
        isLoading: true,
        isError: false,
        name:""
      }
      case LOGIN_SUCCESS:
      return{
        isAuth: true,
        token: payload.token,
        isLoading: false,
        isError: false,
        name:payload.name
      }
      case LOGIN_FAILURE:
      return{
        isAuth: false,
        token: "",
        isLoading: false,
        isError: true,
        name:""
      }
      case LOGOUT:
      return{
        isAuth: false,
        token: "",
        isLoading: false,
        isError: true,
        name:""
      }
    default:
      return state;
  }
};

export { loginReducer };
