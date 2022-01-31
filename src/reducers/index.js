import { 
    IS_LOADING,
    OPEN_MENU,
    SAVE_POSTS,
    GET_POST_ID,
    SAVE_THEMES,
    CHANGE_VALUE,
    DISPATCH_MESSAGE,
    EMPTY_FIELDS,
} from "../actions";

const initialState = {
    loading: true,
    menuOpen: false,
    posts: [],
    themes: [],
    pseudo: '',
    comment: '',
    email: '',
    message: '',
    postId: null,
    alert: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        loading: action.bool,
      };
    case CHANGE_VALUE:
    return {
        ...state,
        [action.name]: action.newValue,
      };
    case OPEN_MENU:
      return {
        ...state,
        menuOpen: !state.menuOpen,
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
    case DISPATCH_MESSAGE:
      return {
        ...state,
        alert: action.message,
      }
    case EMPTY_FIELDS:
      return {
        ...state,
        pseudo: '',
        comment: '',
        email: '',
        message: '',
      }
    default:
      return state;
  }
};

export default reducer;