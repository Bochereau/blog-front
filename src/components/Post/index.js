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
            <p className="post-content-intro">{attributes.introduction}</p>
            <p className="post-content-main">{parse(attributes.content)}</p>
            <p className="post-content-outro">{attributes.conclusion}</p>
        </div>
    </article>
)

export default Post;