import React from "react";

import { reverseDate } from "../../utils";
import './style.scss';

const Post = ({ attributes }) => (
    <article className="post">
        <div className="post-header">
            <img className="post-header-img" src={`${attributes.picture.data.attributes.url}`} alt={attributes.title} />
            <h3 className="post-header-title">{attributes.title}</h3>
        </div>
        <p className="post-info">
            Publié le <time className="post-info-date" dateTime={attributes.createdAt}>{reverseDate(attributes.date)}</time> par <em className="post-info-author">{attributes.author}</em>
        </p>
        <p className="post-content">{attributes.content}</p>
    </article>
)

export default Post;