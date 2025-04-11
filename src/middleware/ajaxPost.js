import axios from 'axios';
import { 
  savePosts,
  isLoading,
  saveThemes,
  dispatchMessage,
  emptyFields,
  handleApiError
} from '../actions';
import { sortedByIdArray } from '../utils';

// Configuration axios
const api = axios.create({
  baseURL: 'https://limitbreak.vercel.app/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const ajaxPost = (store) => (next) => (action) => {
  switch (action.type) {
    case 'GET_POSTS': {
      store.dispatch(isLoading(true));
      api.get('posts')
        .then((res) => {
          if (res.data && res.data.data) {
            const newPosts = res.data.data;
            store.dispatch(savePosts(sortedByIdArray(newPosts)));
          } else {
            throw new Error('Invalid response format');
          }
        })
        .catch((error) => {
          store.dispatch(handleApiError(error));
          console.error('Error fetching posts:', error);
        })
        .finally(() => {
          store.dispatch(isLoading(false));
        });
      break;
    }
    case 'GET_THEME': {
      api.get('themes')
        .then((res) => {
          console.log(res)
          if (res.data && res.data.data) {
            let themesList;
            // Gestion des deux formats de réponse
            if (Array.isArray(res.data.data)) {
              themesList = res.data.data;
            }
            store.dispatch(saveThemes(themesList));
          }
        })
        .catch((error) => {
          store.dispatch(dispatchMessage('Erreur lors du chargement des thèmes'));
          console.error('Error fetching themes:', error);
        });
      break;
    }

    case 'SEND_COMMENT': {
      const { pseudo, comment, postId } = store.getState();
      api.post('comments', {
        postId,
        pseudo,
        content: comment
      })
      .then(() => {
        store.dispatch(dispatchMessage("Merci pour votre commentaire"));
        store.dispatch(emptyFields());
        store.dispatch({ type: 'GET_POSTS' });
      })
      .catch((error) => {
        store.dispatch(handleApiError(error));
        console.error('Error sending comment:', error);
      });
      break;
    }
    
    case 'SEND_MESSAGE': {
      const { pseudo, email, message } = store.getState();
      api.post('messages', {
        name: pseudo,
        email,
        message
      })
      .then(() => {
        store.dispatch(dispatchMessage("Votre message a été envoyé avec succès"));
        store.dispatch(emptyFields());
      })
      .catch((error) => {
        store.dispatch(handleApiError(error));
        console.error('Error sending message:', error);
      });
      break;
    }

    default:
      next(action);
  }
};

export default ajaxPost;