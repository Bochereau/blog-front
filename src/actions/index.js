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
