import {
  IS_LOADING,
  SAVE_POSTS,
  GET_POST_ID,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  SAVE_THEMES,
  ADD_THEME,
  UPDATE_THEME,
  DELETE_THEME,
  CHANGE_VALUE,
  DISPATCH_MESSAGE,
  EMPTY_FIELDS,
  CHANGE_COLOR,
  HANDLE_API_ERROR,
  ADMIN_SAVE_ALL,
  ADMIN_SET_CURRENT
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
  lightTheme: true,
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
    case SAVE_POSTS:
      return {
        ...state,
        posts: action.posts,
      }
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p._id !== action.payload),
      };
    case SAVE_THEMES:
      return {
        ...state,
        themes: action.themes,
      }
    case ADD_THEME:
      return {
        ...state,
        themes: [...state.themes, action.theme],
      };
    case UPDATE_THEME:
      return {
        ...state,
        themes: state.themes.map((t) =>
          t._id === action.theme._id ? action.theme : t
        ),
      };
    case DELETE_THEME:
      return {
        ...state,
        themes: state.themes.filter((t) => t._id !== action.id),
      };
    case GET_POST_ID:
      return {
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
    case CHANGE_COLOR:
      return {
        ...state,
        lightTheme: !state.lightTheme,
      }
    case HANDLE_API_ERROR:
      return {
        ...state,
        alert: action.error,
        loading: false
      };
    case ADMIN_SAVE_ALL:
      return {
        ...state,
        list: action.posts,
      };
    case ADMIN_SET_CURRENT:
      return {
        ...state,
        current: action.post,
      };
    default:
      return state;
  }
};

export default reducer;