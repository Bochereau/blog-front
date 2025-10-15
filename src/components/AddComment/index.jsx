import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import { changeValue, sendComment, clearReplyTo } from "../../actions";

import "./style.scss";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pseudo = useSelector((state) => state.pseudo);
  const comment = useSelector((state) => state.comment);
  const light = useSelector((state) => state.lightTheme);
  const replyTo = useSelector((state) => state.replyTo);
  const replyToPseudo = useSelector((state) => state.replyToPseudo);

  // Auto-resize du textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [comment]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (pseudo !== "" && comment !== "" && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await dispatch(sendComment());
        // Reset après envoi réussi
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (evt) => {
    dispatch(changeValue(evt.target.value, evt.target.name));
  };

  const handleCancelReply = () => {
    dispatch(clearReplyTo());
  };

  const isFormValid = pseudo.trim() !== "" && comment.trim() !== "";
  const pseudoLength = pseudo.length;
  const maxPseudoLength = 50;

  return (
    <div className={classNames("comment-add", {
      "comment-add--focused": isFocused
    })}>
      <div className="comment-add-header">
        <h5 className="comment-add-title">
          💬 Laisser un commentaire
        </h5>
      </div>

      {replyTo && (
        <div className="comment-add-reply">
          <span className="comment-add-reply-text">
            En réponse à <strong>{replyToPseudo}</strong>
          </span>
          <button 
            onClick={handleCancelReply} 
            className="comment-add-reply-cancel"
            type="button"
          >
            ✕ Annuler
          </button>
        </div>
      )}

      <form className="comment-add-form" onSubmit={handleSubmit}>
        <div className="comment-add-form-group">
          <div className="comment-add-form-field">
            <label className="comment-add-form-label" htmlFor="field-pseudo">
              Pseudo
            </label>
            <div className="comment-add-form-input-wrapper">
              <input
                id="field-pseudo"
                type="text"
                name="pseudo"
                placeholder="Un pseudo ?"
                maxLength={maxPseudoLength}
                className={classNames("comment-add-form-input", {
                  "comment-add-form-input--valid": pseudo.trim() !== "",
                  "comment-add-form-input--error": pseudoLength > maxPseudoLength * 0.9
                })}
                value={pseudo}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <div className="comment-add-form-counter">
                {pseudoLength}/{maxPseudoLength}
              </div>
            </div>
          </div>

          <div className="comment-add-form-field">
            <label className="comment-add-form-label" htmlFor="field-comment">
              Commentaire
            </label>
            <textarea
              ref={textareaRef}
              id="field-comment"
              name="comment"
              placeholder="Partagez ce que vous voulez à propos de cet article..."
              className={classNames("comment-add-form-textarea", {
                "comment-add-form-textarea--valid": comment.trim() !== "",
                "comment-add-form-textarea--focused": isFocused
              })}
              value={comment}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </div>

        <div className="comment-add-form-actions">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={classNames("comment-add-form-submit", {
              "comment-add-form-submit--enabled": isFormValid && !isSubmitting,
              "comment-add-form-submit--disabled": !isFormValid || isSubmitting
            })}
          >
            {isSubmitting ? (
              <>
                <span className="comment-add-form-submit-spinner"></span>
                Envoi en cours...
              </>
            ) : (
              "Publier le commentaire"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;