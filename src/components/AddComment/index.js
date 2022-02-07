import React from "react";
import classNames from 'classnames';

import './style.scss';

const AddComment = ({ 
    pseudo, 
    comment, 
    changeValue,
    sendComment,
    light,
 }) => {
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (pseudo !== '' && comment !== '') {
            sendComment();
        }
    }
    const handleChange = (evt) => {
        evt.preventDefault();
        changeValue(evt.target.value, evt.target.name);
    }
    return (
        <div className="comment-add">
            <h5 className={classNames ("comment-add-title", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
                Laisser un commentaire
            </h5>
            <form 
                className="comment-add-form" 
                onSubmit={handleSubmit}
            >
                <ul>
                    <li className="comment-add-form-item">
                        <label 
                            className="comment-add-form-item-label"
                            htmlFor="field-pseudo"
                        >
                            Pseudo :
                        </label>
                        <input
                            id="field-pseudo"
                            type="text"
                            name="pseudo"
                            placeholder="Ici votre pseudo"
                            maxLength="50"
                            className={ classNames ("comment-add-form-item-input", {
                                "ok" : pseudo !== ''
                            })}
                            value={pseudo}
                            onChange={handleChange}
                        />
                    </li>
                    <li className="comment-add-form-item">
                        <label 
                            className="comment-add-form-item-label"
                            htmlFor="field-comment"
                        >
                            Commentaire :
                        </label>
                        <textarea
                            id="field-comment"
                            name="comment"
                            placeholder="Ici votre commentaire"
                            rows="8"
                            className={ classNames ("comment-add-form-item-textarea", {
                                "ok" : comment !== ''
                            })}
                            value={comment}
                            onChange={handleChange}
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
