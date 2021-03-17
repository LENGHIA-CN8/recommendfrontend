import Axios from 'axios';

export const createComment = (comment) => async (dispatch,getState) => {
    const {
        userSignin: { userInfo },
      } = getState();
    try {
        const {data} = await Axios.post(`https://recommendationnews1.herokuapp.com/api/comments/update`,comment, {
            headers: { Authorization: `Bearer ${userInfo.token}`
        } })
        dispatch({ type: 'COMMENT_CREATE_SUCCESS', payload: data });

    } catch (err){
        dispatch({ type: 'COMMENT_CREATE_FAIL', payload: err.message });
    }
}
export const getComment = () => async(dispatch) => {
    try {
        const { data } = await Axios.get(`https://recommendationnews1.herokuapp.com/api/comments`);
        dispatch({ type: 'COMMENT_LIST_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'COMMENT_LIST_FAIL', payload: error.message });
      }
}