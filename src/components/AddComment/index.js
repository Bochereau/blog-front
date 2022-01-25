import React from "react";
import classNames from 'classnames';

import './style.scss';

const AddComment = ({ pseudo, changePseudo, comment, changeComment, sendComment }) => {
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (pseudo !== '' && comment !== '') {
            sendComment();
            changePseudo('');
            changeComment('');
        }
    }
    return (
        <div className="comment-add">
            <h5 className="comment-add-title">Laisser un commentaire</h5>
            <form className="comment-add-form" onSubmit={handleSubmit}>
                <ul>
                    <li className="comment-add-form-item">
                        <label 
                            className="comment-add-form-item-label"
                            htmlFor="pseudo"
                        >
                            Pseudo :
                        </label>
                        <input
                            type="text"
                            name="pseudo"
                            maxLength="50"
                            className="comment-add-form-item-input"
                            value={pseudo}
                            onChange={evt => changePseudo(evt.target.value)}
                        />
                    </li>
                    <li className="comment-add-form-item">
                        <label 
                            className="comment-add-form-item-label"
                            htmlFor="comment"
                        >
                            Commentaire :
                        </label>
                        <textarea 
                            name="comment"
                            rows="8"
                            className="comment-add-form-item-textarea"
                            value={comment}
                            onChange={evt => changeComment(evt.target.value)}
                        />
                    </li>
                </ul>
                <input
                    type="submit" 
                    value="Soumettre votre commentaire"
                    className={ classNames ("comment-add-form-submit", {
                        "off" : pseudo === '' || comment === '', 
                        "on" : pseudo !== '' && comment !== ''
                    })}
                />
            </form>
        </div>
    )
}
export default AddComment;
