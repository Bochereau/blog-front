import React from "react";

import './style.scss';

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
                        Par <em className="comment-list-item-info-pseudo">{comment.attributes.pseudo}</em> le <time className="comment-list-item-info-date">{comment.attributes.updatedAt}</time> :
                    </p>
                    <p className="comment-list-item-content">{comment.attributes.content}</p>
                </div>
            ))}
        </div>
        <div className="comment-add">
            <h5 className="comment-add-title">Laisser un commentaire</h5>
            <form className="comment-add-form">
                <ul>
                    <li className="comment-add-form-item">
                        <label 
                            className="comment-add-form-item-label"
                            for="pseudo"
                        >
                            Pseudo :
                        </label>
                        <input 
                            type="text" 
                            name="pseudo"
                            maxLength="50"
                            className="comment-add-form-item-input"
                        />
                    </li>
                    <li className="comment-add-form-item">
                        <label 
                            className="comment-add-form-item-label"
                            for="comment"
                        >
                            Commentaire :
                        </label>
                        <textarea 
                            name="comment"
                            rows="8"
                            className="comment-add-form-item-textarea"
                        />
                    </li>
                </ul>
                <input 
                    type="submit" 
                    value="Soumettre votre commentaire"
                    className="comment-add-form-submit off"
                />
            </form>
        </div>
    </div>
)


export default Comment;