import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';
import AddComment from "../../containers/AddComment";
import { reverseDate } from "../../utils";

const Comment = ({ comments, title, light }) => (
  <div className="comment">
    <div className="comment-list">
      <h4 className={classNames("comment-list-title", {
        "bk-s--light": light,
        "bk-s--dark": !light
      })}>
        {comments.length} {comments.length === 1 ? "commentaire" : "commentaires"} sur "{title}"
      </h4>

      {comments.map((comment) => (
        <div key={comment._id} className="comment-list-item">
          <p className="comment-list-item-info">
            Par <em className="comment-list-item-info-pseudo">{comment.pseudo}</em> le <time className="comment-list-item-info-date">{reverseDate(comment.createdAt)}</time> :
          </p>
          <p className="comment-list-item-content">{comment.content}</p>
        </div>
      ))}
    </div>

    <AddComment />
  </div>
);

Comment.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      pseudo: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  light: PropTypes.bool.isRequired
};

export default Comment;
