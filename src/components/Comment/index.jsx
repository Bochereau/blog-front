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

const CommentItem = ({ comment, light, level = 0 }) => {
  const dispatch = useDispatch();

  const handleReply = () => {
    dispatch(setReplyTo(comment._id, comment.pseudo));
    document.querySelector('.comment-add').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={classNames({"comment--reply": level > 0})} style={{ marginLeft: `${level * 8}px` }}>
      <div className="comment-list-item">
        <div className="comment-list-item-box">
          <p className="comment-list-item-info">
            {level > 0 && (
              <p>&#x21aa;</p>
            )}
            Par <em className="comment-list-item-info-pseudo">{comment.pseudo}</em> le{" "}
            <time className="comment-list-item-info-date">{reverseDate(comment.createdAt)}</time> :
          </p>
          <p className="comment-list-item-content">{comment.content}</p>
        </div>
        <div className="comment-list-item-actions">
          <button onClick={handleReply} className="comment-list-item-action reply">Répondre</button>
        </div>
      </div>
      {comment.replies?.map((reply) => (
        <CommentItem key={reply._id} comment={reply} light={light} level={level + 1} />
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
      <div className="comment-list">
        {structuredComments?.map(comment => (
          <CommentItem key={comment._id} comment={comment} light={light} />
        ))}
      </div>

      <AddComment postId={postId} />
    </div>
  );
};

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  light: PropTypes.bool.isRequired
};

export default Comment;