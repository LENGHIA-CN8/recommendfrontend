export const commentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'COMMENT_CREATE_SUCCESS':
          return { comments: action.payload, success: true };
        case 'COMMENT_CREATE_FAIL':
          return { error: action.payload };
        default:
            return state;
    }
}
export const commentListReducer = (state = {comments:[]} , action) => {
    switch (action.type) {
        case 'COMMENT_LIST_SUCCESS':
          return { ...state,comments: [...action.payload,...state.comments] };
        case 'COMMENT_LIST_FAIL':
          return { error: action.payload };
        default:
            return state;
    }
}
