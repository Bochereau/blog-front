import React from "react";
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import classNames from "classnames";

import { reverseDate } from "../../utils";
import './style.scss';

const Post = ({
  light,
  title,
  slug,
  mainImage,
  createdAt,
  author,
  introduction,
  context,
  body,
  firstContact,
  conclusion,
  themes
}) => (
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

    {themes && (
      <div className="post-tags">
        {themes.map(theme => (
         <span key={theme._id} className="post-tags-item" style={{ backgroundColor: theme.color }}>
          {theme.name}
        </span>
        ))}
      </div>
    )}

    <div className="post-content">
      <p className="post-content-intro">{parse(introduction)}</p>

      {context && (
        <div className="post-content-context">
          <div className="post-content-context-triangle-top"></div>
          <p className="post-content-context-title">
            Un peu de contexte
          </p>
          <p className="post-content-context-text">{parse(context)}</p>
          <div className="post-content-context-triangle-bottom"></div>
        </div>
      )}

      {body && body.map((section, index) => (
        <div key={index} className="post-content-section">
          {section.subtitle && <h4 className="post-content-subtitle"><span>{parse(section.subtitle)}</span></h4>}
          {section.text && <p className="post-content-text">{parse(section.text)}</p>}
          {section.images && section.images.length > 0 && (
            <div className="post-content-images">
              {section.images && section.images.length > 0 && (
                <div className={`post-content-images has-${section.images.length}`}>
                  {section.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`illustration-${idx}`}
                      className="post-content-image"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {firstContact && (
        <div className="post-content-contact">
          <div className="post-content-contact-triangle-top"></div>
          <p className="post-content-contact-title">
            Premier contact
          </p>
          <p className="post-content-contact-text">{parse(firstContact)}</p>
          <div className="post-content-contact-triangle-bottom"></div>
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
  body: PropTypes.arrayOf(PropTypes.shape({
    subtitle: PropTypes.string,
    text: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string)
  })),
  firstContact: PropTypes.string,
  conclusion: PropTypes.string.isRequired,
};

export default Post;
