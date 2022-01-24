import axios from 'axios';
import { 
    GET_POSTS,
    getPosts,
    savePosts,
    isLoading,
    SEND_COMMENT,
} from '../actions';

axios.defaults.baseURL = 'https://blog-strapi-deploy.herokuapp.com/api/';

const ajaxPost = (store) => (next) => (action) => {
    switch (action.type) {
      case GET_POSTS: {
        store.dispatch(isLoading(true));
        axios.get('posts/?populate=*')
        .then((res) => {
          //console.log(res.data.data)
          const newPosts = res.data.data;
          const sortedPosts = newPosts.sort((a, b) => a.id - b.id)
          const reversePosts = sortedPosts.reverse();
          store.dispatch(savePosts(reversePosts));
        })
        .catch((error) => {
          console.error('error', error);
        })
        .finally(() => {
          store.dispatch(isLoading(false));
        });
        break;
      }
      case SEND_COMMENT: {
        const state = store.getState();
        axios.post('comments',
        {
          data: {
            pseudo: state.pseudo,
            content: state.comment,
            post: [{ id : state.postId}]
          }
        })
        .then((res) => {
          store.dispatch(getPosts());
        })
        .catch((error) => {
          console.error('une erreur est survenue', error);
        });
        break;
      }
    default:
      next(action);
  }
};

export default ajaxPost;