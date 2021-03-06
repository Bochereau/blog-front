import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';
import AddComment from "../../containers/AddComment";
import { reverseDate } from "../../utils";

const Comment = ({ attributes, light }) => (
    <div className="comment">
        <div className="comment-list">
            <h4 className={classNames ("comment-list-title", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
                {attributes.comments.data.length} {attributes.comments.data.length === 1 ? "commentaire" : "commentaires"} sur "{attributes.title}"
            </h4>
            {attributes.comments.data.map((comment) => (
                <div
                    key={comment.id}
                    className="comment-list-item"
                >
                    <p className="comment-list-item-info">
                        Par <em className="comment-list-item-info-pseudo">{comment.attributes.pseudo}</em> le <time className="comment-list-item-info-date">{reverseDate(comment.attributes.updatedAt)}</time> :
                    </p>
                    <p className="comment-list-item-content">{comment.attributes.content}</p>
                </div>
            ))}
        </div>
        <AddComment />
    </div>
)

Comment.propTypes = {
    attributes: PropTypes.shape({
        comments: PropTypes.shape({
            data: PropTypes.shape({
                id: PropTypes.number.isRequired,
                attributes: PropTypes.shape({
                    pseudo: PropTypes.string.isRequired,
                    content: PropTypes.string.isRequired,
                    updatedAt: PropTypes.string.isRequired,
                }).isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    light: PropTypes.bool.isRequired,
}

export default Comment;