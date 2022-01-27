/* Loading Management */

// action use when something is loading
export const IS_LOADING = 'IS_LOADING';
export const isLoading = (bool) => ({
  type: IS_LOADING,
  bool,
});


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

// action to wrote a new pseudo
export const NEW_PSEUDO = 'NEW_PSEUDO';
export const newPseudo = (pseudo) => ({
  type: NEW_PSEUDO,
  pseudo,
})

// action to wrote a new comment
export const NEW_COMMENT = 'NEW_COMMENT';
export const newComment = (comment) => ({
  type: NEW_COMMENT,
  comment,
})

// action to send comment 
export const SEND_COMMENT = 'SEND_COMMENT';
export const sendComment = () => ({
  type: SEND_COMMENT,
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