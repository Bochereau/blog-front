import { 
    IS_LOADING,
    NEW_PSEUDO,
    NEW_COMMENT,
    SAVE_POSTS,
    GET_POST_ID
} from "../actions";

const initialState = {
    loading: true,
    posts: [],
    pseudo: '',
    comment: '',
    postId: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_LOADING:
        return {
          ...state,
          loading: action.bool,
        };
    case NEW_PSEUDO:
      return {
        ...state,
        pseudo: action.pseudo,
      };
      case NEW_COMMENT:
      return {
        ...state,
        comment: action.comment,
      };
    case SAVE_POSTS:
        return{
            ...state,
            posts: action.posts
        }
    case GET_POST_ID:
        return{
            ...state,
            postId: action.id
        }
    default:
      return state;
  }
};

export default reducer;