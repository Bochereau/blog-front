import { 
    IS_LOADING,
    SAVE_POSTS,
} from "../actions";

const initialState = {
    loading: true,
    posts: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_LOADING:
        return {
          ...state,
          loading: action.bool,
        };
    case SAVE_POSTS:
        return{
            ...state,
            posts: action.posts
        }
    default:
      return state;
  }
};

export default reducer;