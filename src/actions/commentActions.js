import Axios from 'axios';
import Cookies  from 'js-cookie';

const csrftokenCookie = Cookies.get('csrftoken');
export const createComment = (comment) => async (dispatch,getState) => {

    const {
        userSignin: { userInfo },
      } = getState();
    try {
        
        let formData = new FormData();
        formData.append('commentID', comment.CommentID);
        formData.append('articleID',comment.articleID);
        formData.append('userID',comment.userId);
        formData.append('content',comment.content);
        formData.append('time',comment.time);

        const {data} = await Axios.post(`/user_comment/post_comment/`,formData, {
            headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken":csrftokenCookie }
    })
        dispatch({ type: 'COMMENT_CREATE_SUCCESS', payload: data });

    } catch (err){
        dispatch({ type: 'COMMENT_CREATE_FAIL', payload: err.message });
    }
}
export const getComment = (articleID) => async(dispatch) => {
    let formData = new FormData();
    formData.append('articleID',articleID);

    try {
        const { data } = await Axios.post(`/user_comment/get_comment_by_articleID/`,formData,{
            headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken":csrftokenCookie }
    });
        dispatch({ type: 'COMMENT_LIST_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'COMMENT_LIST_FAIL', payload: error.message });
      }
}