import axios from 'axios';
import {
  savePosts,
  isLoading,
  saveThemes,
  dispatchMessage,
  emptyFields,
  handleApiError,
  saveComments,
  addComment
} from '../actions';

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
            store.dispatch(savePosts(newPosts));
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

    case 'ADD_POST': {
      api.post('posts', action.payload)
        .then((res) => {
          store.dispatch(getPosts());
        })
        .catch((error) => {
          store.dispatch(handleApiError(error));
          console.error('Erreur lors de l\'ajout du post:', error);
        });
      break;
    }

    case 'UPDATE_POST': {
      const { _id, ...postData } = action.payload;
      api.put(`posts?_id=${_id}`, postData)
        .catch((error) => {
          store.dispatch(handleApiError(error));
          console.error('Erreur lors de la modification du post:', error);
        });
      break;
    }

    case 'UPDATE_POST_STATUS': {
      const { id, posted } = action;
      api.put(`posts?_id=${id}`, { posted })
        .then((response) => {
          store.dispatch(dispatchMessage(posted ? "L'article a bien été publié" : "L'article n'est plus publié"));
        })
        .catch((error) => {
          store.dispatch(handleApiError(error.message || 'Erreur lors de la mise à jour de l\'article'));
          console.error('Error updating post:', error);
        });
      break;
    }

    case 'DELETE_POST': {
      api.delete(`posts?_id=${action.payload}`)
        .then(() => {
          store.dispatch(getPosts());
        })
        .catch((error) => {
          store.dispatch(handleApiError(error));
          console.error('Erreur lors de la suppression du post:', error);
        });
      break;
    }

    case 'GET_THEME': {
      api.get('themes')
        .then((res) => {
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

    case 'ADD_THEME': {
      api.post('themes', action.payload)
        .then(() => {
          store.dispatch({ type: 'GET_THEME' });
        })
        .catch((error) => {
          store.dispatch(handleApiError(error));
          console.error('Erreur lors de l’ajout du thème:', error);
        });
      break;
    }

    case 'UPDATE_THEME': {
      const { _id, name, color } = action.payload;
      api.put(`themes?_id=${_id}`, { name, color })
        .then(() => {
          store.dispatch({ type: 'GET_THEME' });
        })
        .catch((error) => {
          store.dispatch(handleApiError(error));
          console.error('Erreur lors de la modification du thème:', error);
        });
      break;
    }

    case 'DELETE_THEME': {
      api.delete(`themes?_id=${action.payload}`)
        .then(() => {
          store.dispatch({ type: 'GET_THEME' });
        })
        .catch((error) => {
          store.dispatch(handleApiError(error));
          console.error('Erreur lors de la suppression du thème:', error);
        });
      break;
    }

    case 'FETCH_COMMENTS': {
      const { postId } = action;
      api.get(`comments?postId=${postId}`)
        .then((response) => {
          console.log(response);
          store.dispatch(saveComments(response.data));
        })
        .catch((error) => {
          store.dispatch(handleApiError(error.message || 'Erreur lors de la récupération des commentaires'));
          console.error('Error fetching comments:', error);
        });
      break;
    }

    case 'SEND_COMMENT': {
      const { pseudo, comment, postId, replyTo } = store.getState();
      const payload = {
        postId,
        pseudo,
        content: comment,
      };

      if (replyTo) {
        payload.replyTo = replyTo;
      }

      api.post('comments', payload)
        .then((response) => {
          store.dispatch(addComment(response.data.comment));
          store.dispatch(dispatchMessage("Merci pour votre commentaire"));
          store.dispatch(emptyFields());
          store.dispatch(clearReplyTo());
        })
        .catch((error) => {
          store.dispatch(handleApiError(error.message || 'Erreur lors de l\'envoi du commentaire'));
          console.error('Error sending comment:', error);
        });
      break;
    }

    case 'UPDATE_COMMENT': {
      const { id, content } = action;
      api.put(`comments?id=${id}`, { content })
        .then((response) => {
          store.dispatch({ type: 'UPDATE_COMMENT_SUCCESS', id, content });
          store.dispatch(dispatchMessage("Commentaire mis à jour"));
        })
        .catch((error) => {
          store.dispatch(handleApiError(error.message || 'Erreur lors de la mise à jour du commentaire'));
          console.error('Error updating comment:', error);
        });
      break;
    }

    case 'DELETE_COMMENT': {
      const { id } = action;
      api.delete(`comments?id=${id}`)
        .then((response) => {
          store.dispatch({ type: 'DELETE_COMMENT_SUCCESS', id });
          store.dispatch(dispatchMessage("Commentaire supprimé"));
        })
        .catch((error) => {
          store.dispatch(handleApiError(error.message || 'Erreur lors de la suppression du commentaire'));
          console.error('Error deleting comment:', error);
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