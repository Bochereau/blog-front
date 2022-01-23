import axios from 'axios';
import { 
    GET_POSTS, 
    savePosts,
    isLoading
} from '../actions';

axios.defaults.baseURL = 'http://localhost:1337/api';

const ajaxPost = (store) => (next) => (action) => {
    switch (action.type) {
      case GET_POSTS: {
        store.dispatch(isLoading(true));
        axios.get('posts/?populate=*')
        .then((res) => {
          const newPosts = res.data.data;
          const reversePosts = newPosts.reverse();
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
    default:
      next(action);
  }
};

export default ajaxPost;