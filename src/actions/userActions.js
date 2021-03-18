import Axios from 'axios';

export const signin = (email, password) => async (dispatch) => {
    try {
        console.log(email)
        const { data } = await Axios.post('/api-auth/login/', { username : email, password });
        console.log(data)
        dispatch({ type: "USER_SIGNIN_SUCCESS", payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        console.log(error)
        dispatch({
            type: "USER_SIGNIN_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: 'USER_SIGNOUT' });
    document.location.href = '/signin';
  };
export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: "USER_REGISTER_REQUEST", payload: { email, password } });
    try {
      const { data } = await Axios.post('https://recommendationnews1.herokuapp.com/api/users/register', {
        name,
        email,
        password,
      });
      dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
      dispatch({ type: "USER_SIGNIN_SUCCESS", payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: 'USER_REGISTER_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
