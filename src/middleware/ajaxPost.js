import axios from 'axios';
import emailjs from '@emailjs/browser';
import {
  getPosts,
  savePosts,
  isLoading,
  getTheme,
  saveThemes,
  dispatchMessage,
  emptyCommentFields,
  clearReplyTo,
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
      const { id, isPublished } = action;
      const payload = {
        isPublished,
        publishedAt: isPublished ? new Date().toISOString() : null,
      };
    
      api.put(`posts?_id=${id}`, payload)
        .then((response) => {
          store.dispatch(dispatchMessage(
            isPublished ? "L'article a bien été publié" : "L'article n'est plus publié"
          ));
        })
        .catch((error) => {
          store.dispatch(handleApiError(error.message || 'Erreur lors de la mise à jour de l\'article'));
          console.error('Error updating post:', error);
        });
      break;
    }

    case 'DELETE_POST': {
      api.delete(`posts?_id=${action.id}`)
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
          store.dispatch(getTheme());
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
          store.dispatch(getTheme());
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
          store.dispatch(getTheme());
        })
        .catch((error) => {
          store.dispatch(handleApiError(error));
          console.error('Erreur lors de la suppression du thème:', error);
        });
      break;
    }

    case 'FETCH_COMMENTS': {
      const { postId } = action;
      const url = postId ? `comments?postId=${postId}` : 'comments';
      api.get(url)
        .then((response) => {
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
          store.dispatch(emptyCommentFields());
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
          store.dispatch({ type: 'FETCH_COMMENTS' });
        })
        .catch((error) => {
          store.dispatch(handleApiError(error.message || 'Erreur lors de la suppression du commentaire'));
          console.error('Error deleting comment:', error);
        });
      break;
    }

    case 'SEND_MESSAGE': {
      // Service ID : service_c5onigh
      const { pseudo, email, message } = action;

      const templateParams = {
        name: pseudo,
        email: email,
        message,
      };

      const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log(EMAILJS_PUBLIC_KEY);

      console.log(templateParams);

      emailjs.send(
        "service_c5onigh",
        "template_gcnfaxi",
        templateParams,
        EMAILJS_PUBLIC_KEY
      ).then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          store.dispatch(dispatchMessage("Votre message a bien été envoyé."));
        }, (error) => {
          console.log('FAILED...', error);
          store.dispatch(dispatchMessage("Erreur lors de l'envoi du message."));
        });
      break;
    }

    default:
      next(action);
  }
};

export default ajaxPost;