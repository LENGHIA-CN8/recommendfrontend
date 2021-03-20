import Axios from 'axios';
import Cookies  from 'js-cookie';

export const createComment = (comment) => async (dispatch,getState) => {
    const {
        userSignin: { userInfo },
      } = getState();
    try {
        var csrftokenCookie = Cookies.get('csrftoken');
        let formData = new FormData();
        formData.append('commentID', comment.CommentID);
        formData.append('articleID',comment.articleID);
        formData.append('userID',comment.userId);
        formData.append('content',comment.content);
        formData.append('time',comment.time);
        // formData.append('csrfmiddlewaretoken':csrftokenCookie);

        const {data} = await Axios.post(`/user_comment/`,formData, {
            headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken":csrftokenCookie }
    })
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