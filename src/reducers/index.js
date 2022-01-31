import { 
    IS_LOADING,
    OPEN_MENU,
    NEW_PSEUDO,
    NEW_COMMENT,
    SAVE_POSTS,
    GET_POST_ID,
    SAVE_THEMES,
} from "../actions";

const initialState = {
    loading: true,
    menuOpen: false,
    posts: [],
    themes: [],
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
    case OPEN_MENU:
      return {
        ...state,
        menuOpen: !state.menuOpen,
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
            posts: action.posts,
        }
      case SAVE_THEMES:
        return{
            ...state,
            themes: action.themes,
        }
    case GET_POST_ID:
        return{
            ...state,
            postId: action.id,
        }
    default:
      return state;
  }
};

export default reducer;