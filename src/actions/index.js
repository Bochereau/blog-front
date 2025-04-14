/* Loading Management */
// action use when something is loading
export const IS_LOADING = 'IS_LOADING';
export const isLoading = (bool) => ({
  type: IS_LOADING,
  bool,
});

/* Input management */
// action to change a field value
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const changeValue = (newValue, name) => ({
  type: CHANGE_VALUE,
  newValue,
  name,
});

/* Event message dispatch */
// action to dispatch message
export const DISPATCH_MESSAGE = 'DISPATCH_MESSAGE';
export const dispatchMessage = (message) => ({
  type: DISPATCH_MESSAGE,
  message,
})


/* Posts Management */
// action to fetch posts
export const GET_POSTS = 'GET_POSTS';
export const getPosts = () => ({
    type: GET_POSTS,
})
// action to save all Posts
export const SAVE_POSTS = 'SAVE_POSTS';
export const savePosts = (posts) => ({
    type: SAVE_POSTS,
    posts,
})
// action to get post id
export const GET_POST_ID = 'GET_POST_ID';
export const getPostId = (id) => ({
  type:GET_POST_ID,
  id,
})


/* Comments management */
// action to send comment 
export const SEND_COMMENT = 'SEND_COMMENT';
export const sendComment = () => ({
  type: SEND_COMMENT,
})

// action de vider les champs
export const EMPTY_FIELDS = 'EMPTY_FIELDS';
export const emptyFields = () => ({
  type: EMPTY_FIELDS,
})


/* Contact form management */
// action to send comment 
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const sendMessage = () => ({
  type: SEND_MESSAGE,
})

/* Game List management */
// action to fetch blog theme
export const GET_THEME = 'GET_THEME';
export const getTheme = () => ({
  type: GET_THEME,
})

// action to save themes 
export const SAVE_THEMES = 'SAVE_THEMES';
export const saveThemes = (themes) => ({
  type: SAVE_THEMES,
  themes,
})

// Création d'un thème
export const ADD_THEME = 'ADD_THEME';
export const addTheme = (theme) => ({
  type: ADD_THEME,
  theme,
});

// Mise à jour d’un thème
export const UPDATE_THEME = 'UPDATE_THEME';
export const updateTheme = (theme) => ({
  type: UPDATE_THEME,
  theme,
});

// Suppression d’un thème
export const DELETE_THEME = 'DELETE_THEME';
export const deleteTheme = (id) => ({
  type: DELETE_THEME,
  id,
});


/* Light/Dark theme management */
// action to switch between light/dark theme
export const CHANGE_COLOR = 'CHANGE_COLOR';
export const changeColor = (bool) => ({
  type: CHANGE_COLOR,
  bool,
})

export const HANDLE_API_ERROR = 'HANDLE_API_ERROR';
export const handleApiError = (error) => ({
  type: HANDLE_API_ERROR,
  error: error.message || 'Erreur serveur'
});

/* Admin Posts Management */
export const ADMIN_SAVE_ALL = 'ADMIN_SAVE_ALL';
export const adminSaveAll = (posts) => ({
  type: ADMIN_SAVE_ALL,
  posts,
});

export const ADMIN_SET_CURRENT = 'ADMIN_SET_CURRENT';
export const adminSetCurrent = (post) => ({
  type: ADMIN_SET_CURRENT,
  post,
});