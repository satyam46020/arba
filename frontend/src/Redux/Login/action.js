import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE, LOGOUT } from "./actionTypes"

export const login=(details)=>{
    return async (dispatch)=>{
        try {
            dispatch({type:LOGIN_REQUEST})
            let res = await fetch(`http://localhost:5000/login`,{
              method : "POST",
              headers : {
                "content-type" : "application/json"
              },
              body : JSON.stringify(details)
            })
            let data = await res.json();
            localStorage.setItem('token', data.token);
            console.log( data )
            dispatch({type:LOGIN_SUCCESS,payload:{token:data.token,name:data.name}})
        } catch (error) {
            dispatch({type:LOGIN_FAILURE})
            
        }
    }
}
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
