import axios from 'axios';
import { 
    GET_POSTS,
    getPosts,
    savePosts,
    isLoading,
    SEND_COMMENT,
    GET_THEME,
    saveThemes,
    SEND_MESSAGE,
    dispatchMessage,
    emptyFields,
} from '../actions';
import { sortedByIdArray } from '../utils';

axios.defaults.baseURL = 'https://limitbreak.vercel.app/api/';

const ajaxPost = (store) => (next) => (action) => {
    switch (action.type) {
      case GET_POSTS: {
        store.dispatch(isLoading(true));
        axios.get('posts/?populate=*')
        .then((res) => {
          const newPosts = res.data.data;
          store.dispatch(savePosts(sortedByIdArray(newPosts)));
        })
        .catch((error) => {
          console.error('error', error);
        })
        .finally(() => {
          store.dispatch(isLoading(false));
        });
        break;
      }

      case GET_THEME: {
        axios.get('themes')
        .then((res) => {
          const themes = res.data.data;
          const themesList = themes.map((theme) => theme.attributes.name)
          store.dispatch(saveThemes(themesList));
        })
        .catch((error) => {
          console.error('error', error);
        })
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
          store.dispatch(dispatchMessage("Merci pour votre commentaire"));
          store.dispatch(emptyFields());
          store.dispatch(getPosts());
        })
        .catch((error) => {
          console.error('une erreur est survenue', error);
        });
        break;
      }
      
      case SEND_MESSAGE: {
        const state = store.getState();
        axios.post('messages',
        {
          data: {
            name: state.pseudo,
            email: state.email,
            message: state.message,
          }
        })
        .then((res) => {
          store.dispatch(dispatchMessage("Votre message a été envoyé avec succès"));
          store.dispatch(emptyFields());
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