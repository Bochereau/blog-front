import React from "react";

import './style.scss';
import AddComment from "../../containers/AddComment";
import { reverseDate } from "../../utils";

const Comment = ({ attributes }) => (
    <div className="comment">
        <div className="comment-list">
            <h4 className="comment-list-title">
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


export default Comment;