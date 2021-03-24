import axios from 'axios';
import Axios from 'axios';
import Cookies  from 'js-cookie';

export const signin = (email, password) => async (dispatch) => {
    try {
        let formData = new FormData();
        formData.append('username', email);
        formData.append('password',password);
        // var csrftokenCookie = Cookies.get('csrftoken');
        // console.log(csrftokenCookie);
        // const data  = await Axios.get('http://localhost:8000/api-auth/login/?next=/', formData,{
        //   headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken":"5FqV6hwWsPkt6Q4lmNsUqaRcxF7V8BVqENF6eVtxlv4agZt6OhntdiQNGu7vRMlk" }
        // });
        // console.log(data)
        async function getcookie()  {                  // var csrftokenCookie = Cookies.get('csrftoken');
        var csrftokenCookie = Cookies.get('csrftoken');
        const data  = await Axios.post('/api-auth/login/?next=/', formData,{
          headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken":csrftokenCookie}
        });
        return data;

        

        }
        axios.get('/api-auth/login/?next=/', formData, { headers: {  "Content-Type": "multipart/form-data" }})
        .then( (response) => {
        
        getcookie().then(async function(result){
          var csrftokenCookie = Cookies.get('csrftoken');
          console.log(csrftokenCookie)
          const  { data }   = await Axios.get('/users/', formData,{
          headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken": csrftokenCookie }
         });
          var person = data.results.find((x) => x.username === email)
          console.log(person)
          dispatch({ type: "USER_SIGNIN_SUCCESS", payload: person });
          localStorage.setItem('userInfo', JSON.stringify(person));
        })

        //   const  { data }   = await Axios.get('/users/', formData,{
        //    headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken": csrftokenCookie }
        //  });
          // var person = data.results.find((x) => x.username === email)
          // console.log(person)
          // dispatch({ type: "USER_SIGNIN_SUCCESS", payload: person });
          // localStorage.setItem('userInfo', JSON.stringify(person));

        }).catch( function(error) {
          console.log(error);
        });
        // dispatch({ type: "USER_SIGNIN_SUCCESS", payload: data });
        // localStorage.setItem('userInfo', JSON.stringify(data));
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
      let formData = new FormData();
        formData.append('username', name);
        formData.append('password1',password);
        formData.append('password2',password);
        async function getcookie()  {                  
        var csrftokenCookie = Cookies.get('csrftoken');
        const data  = await Axios.post('/accounts/signup/', formData,{
          headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken":csrftokenCookie}
        });
        return data;
        }
        axios.get('/accounts/signup/', formData, { headers: {  "Content-Type": "multipart/form-data" }})
        .then( (response) => {
        
        getcookie().then(async function(result){
                dispatch({ type: "USER_REGISTER_SUCCESS", payload: result });
        })
      }).catch( function(error) {
        console.log(error);
      });

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
