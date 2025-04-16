import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import { changeValue, sendComment, clearReplyTo } from "../../actions";

import "./style.scss";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();

  const pseudo = useSelector((state) => state.pseudo);
  const comment = useSelector((state) => state.comment);
  const light = useSelector((state) => state.lightTheme);
  const replyTo = useSelector((state) => state.replyTo);
  const replyToPseudo = useSelector((state) => state.replyToPseudo);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (pseudo !== "" && comment !== "") {
      dispatch(sendComment());
    }
  };

  const handleChange = (evt) => {
    dispatch(changeValue(evt.target.value, evt.target.name));
  };

  const handleCancelReply = () => {
    dispatch(clearReplyTo());
  };

  return (
    <div className="comment-add">
      <h5
        className={classNames("comment-add-title", {
          "bk-s--light": light,
          "bk-s--dark": !light,
        })}
      >
        Laisser un commentaire
      </h5>

      {replyTo && (
        <div className="comment-add-reply-info">
          <p>En réponse à <strong>{replyToPseudo}</strong></p>
          <button onClick={handleCancelReply} className="comment-add-reply-cancel">
            Annuler la réponse
          </button>
        </div>
      )}

      <form className="comment-add-form" onSubmit={handleSubmit}>
        <ul>
          <li className="comment-add-form-item">
            <label className="comment-add-form-item-label" htmlFor="field-pseudo">
              Pseudo :
            </label>
            <input
              id="field-pseudo"
              type="text"
              name="pseudo"
              placeholder="Ici votre pseudo"
              maxLength="50"
              className={classNames("comment-add-form-item-input", {
                ok: pseudo !== "",
              })}
              value={pseudo}
              onChange={handleChange}
            />
          </li>

          <li className="comment-add-form-item">
            <label className="comment-add-form-item-label" htmlFor="field-comment">
              Commentaire :
            </label>
            <textarea
              id="field-comment"
              name="comment"
              placeholder="Ici votre commentaire"
              rows="8"
              className={classNames("comment-add-form-item-textarea", {
                ok: comment !== "",
              })}
              value={comment}
              onChange={handleChange}
            />
          </li>
        </ul>

        <input
          type="submit"
          value="Soumettre votre commentaire"
          className={classNames("comment-add-form-submit", {
            off: pseudo === "" || comment === "",
            on: pseudo !== "" && comment !== "",
          })}
        />
      </form>
    </div>
  );
};

export default AddComment;