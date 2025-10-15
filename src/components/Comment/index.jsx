import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';
import AddComment from "../AddComment";
import { reverseDate, buildCommentTree } from "../../utils";
import {
  fetchComments,
  setReplyTo
} from "../../actions";

const CommentItem = ({ comment, light, level = 0, parentPseudo = null }) => {
  const dispatch = useDispatch();

  const handleReply = () => {
    dispatch(setReplyTo(comment._id, comment.pseudo));
    document.querySelector('.comment-add').scrollIntoView({ behavior: 'smooth' });
  };

  // Générer les initiales pour l'avatar
  const getInitials = (pseudo) => {
    return pseudo
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };


  return (
    <div 
      className={classNames("comment-item-wrapper", {
        "comment--reply": level > 0,
        "comment--level-1": level === 1,
        "comment--level-2": level === 2,
        "comment--level-3": level === 3
      })} 
      data-level={level}
    >
      <div className="comment-list-item">
        <div className="comment-list-item-box">
          {/* Avatar */}
          <div className="comment-list-item-avatar">
            {getInitials(comment.pseudo)}
          </div>
          
          {/* Contenu du commentaire */}
          <div className="comment-list-item-content-wrapper">
            {/* Informations de l'auteur */}
            <div className="comment-list-item-info">
              <div className="comment-list-item-info-header">
                <span className="comment-list-item-info-pseudo">{comment.pseudo}</span>
                <span className="comment-list-item-info-date">{reverseDate(comment.createdAt)}</span>
                {level > 0 && (
                  <span className="comment-list-item-info-badge">
                    {parentPseudo ? `Réponse à ${parentPseudo.toUpperCase()}` : 'Réponse'}
                  </span>
                )}
              </div>
            </div>
            
            {/* Contenu du commentaire */}
            <div className="comment-list-item-content">{comment.content}</div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="comment-list-item-actions">
          <button onClick={handleReply} className="comment-list-item-action reply">
            💬 Répondre
          </button>
        </div>
      </div>
      
      {/* Réponses récursives */}
      {comment.replies?.map((reply) => (
        <CommentItem key={reply._id} comment={reply} light={light} level={level + 1} parentPseudo={comment.pseudo} />
      ))}
    </div>
  );
};

const Comment = ({ postId, title, light }) => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments);

  // Récupérer les commentaires au chargement du composant
  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  const structuredComments = buildCommentTree(comments);

  return (
    <div className="comment">
      <div
        className={classNames("comment-title", {
          "bk-s--light": light === true,
          "bk-s--dark": light === false,
        })}
      >
        <h4 className="comment-title-text">Commentaires</h4>
      </div>
      <AddComment postId={postId} />
      <div className="comment-list">
        {structuredComments?.map(comment => (
          <CommentItem key={comment._id} comment={comment} light={light} />
        ))}
      </div>

    </div>
  );
};

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  light: PropTypes.bool.isRequired
};

export default Comment;