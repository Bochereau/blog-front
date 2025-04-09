import React from "react";
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import classNames from "classnames";

import { reverseDate } from "../../utils";
import './style.scss';

const Post = ({ light, title, slug, mainImage, createdAt, author, introduction, context, content, firstContact, conclusion }) => (
  <article className="post">
    <div className="post-header">
      {mainImage && (
        <img className="post-header-img" src={mainImage} alt={title} />
      )}
      <h3 className={classNames("post-header-title", {
        "bk-s--light": light === true,
        "bk-s--dark": light === false
      })}>
        {title}
      </h3>
    </div>

    <p className="post-info">
      Publié le <time className="post-info-date" dateTime={createdAt}>{reverseDate(createdAt)}</time> par <em className="post-info-author">{author}</em>
    </p>

    <div className="post-content">
      <p className="post-content-intro">{parse(introduction)}</p>

      {context && (
        <div className={classNames("post-content-context", {
          "frame-light": light,
          "frame-dark": !light
        })}>
          <p className={classNames("post-content-context-title", {
            "bk-t--light": light,
            "bk-t--dark": !light
          })}>
            Un peu de contexte
          </p>
          <p className="post-content-context-text">{parse(context)}</p>
        </div>
      )}

      <div className="post-content-main">{parse(content)}</div>

      {firstContact && (
        <div className={classNames("post-content-contact", {
          "frame-light": light,
          "frame-dark": !light
        })}>
          <p className={classNames("post-content-contact-title", {
            "bk-t--light": light,
            "bk-t--dark": !light
          })}>
            Premier contact
          </p>
          <p className="post-content-contact-text">{parse(firstContact)}</p>
        </div>
      )}

      <p className="post-content-outro">{parse(conclusion)}</p>
    </div>
  </article>
);

Post.propTypes = {
  light: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  mainImage: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  introduction: PropTypes.string.isRequired,
  context: PropTypes.string,
  content: PropTypes.string.isRequired,
  firstContact: PropTypes.string,
  conclusion: PropTypes.string.isRequired,
};

export default Post;
