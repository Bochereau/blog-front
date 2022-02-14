import React from "react";
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
            {attributes.context !== null && (
                <div className={classNames("post-content-context", {"frame-light": light === true, "frame-dark": light ===false})}>
                    <p className={classNames ("post-content-context-title", {"bk-t--light" : light === true, "bk-t--dark" : light === false})}>
                        Un peu de contexte
                    </p>
                    <p className="post-content-context-text">{parse(attributes.context)}</p>
                </div>
            )}
            <p className="post-content-main">{parse(attributes.content)}</p>
            {attributes.contact !== null && (
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

export default Post;