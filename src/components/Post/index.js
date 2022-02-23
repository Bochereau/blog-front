import React from "react";
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import classNames from "classnames";

import { reverseDate } from "../../utils";
import './style.scss';

const Post = ({ attributes, light }) => (
    <article className="post">
        <div className="post-header">
            <img className="post-header-img" src={`${attributes.picture.data.attributes.url}`} alt={attributes.title} />
            <h3 className={classNames ("post-header-title", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
                {attributes.title}
            </h3>
        </div>
        <p className="post-info">
            Publié le <time className="post-info-date" dateTime={attributes.createdAt}>{reverseDate(attributes.date)}</time> par <em className="post-info-author">{attributes.author}</em>
        </p>
        <div className="post-content">
            <p className="post-content-intro">{parse(attributes.introduction)}</p>
            {attributes.context !== '' && (
                <div className={classNames("post-content-context", {"frame-light": light === true, "frame-dark": light ===false})}>
                    <p className={classNames ("post-content-context-title", {"bk-t--light" : light === true, "bk-t--dark" : light === false})}>
                        Un peu de contexte
                    </p>
                    <p className="post-content-context-text">{parse(attributes.context)}</p>
                </div>
            )}
            <p className="post-content-main">{parse(attributes.content)}</p>
            {attributes.contact !== '' && (
                <div className={classNames("post-content-contact", {"frame-light": light === true, "frame-dark": light ===false})}>
                    <p className={classNames ("post-content-contact-title", {"bk-t--light" : light === true, "bk-t--dark" : light === false})}>
                        Premier contact
                    </p>
                    <p className="post-content-contact-text">{parse(attributes.contact)}</p>
                </div>
            )}
            <p className="post-content-outro">{parse(attributes.conclusion)}</p>
        </div>
    </article>
)

Post.propTypes = {
    attributes: PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        picture: PropTypes.array.isRequired,
        date: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        introduction: PropTypes.string.isRequired,
        context: PropTypes.string,
        content: PropTypes.string.isRequired,
        contact: PropTypes.string,
        conclusion: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
    light: PropTypes.bool.isRequired,
}

export default Post;