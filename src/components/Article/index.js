import React from "react";
import { useParams } from "react-router";

import './style.scss';

import Header from '../../containers/Header';
import Post from '../Post';
import Comment from '../Comment';

const Article = ({ posts, getPostId,light }) => {
    const { slug } = useParams();
    const currentPost = posts.find((post) => post.attributes.slug === slug);
    getPostId(currentPost.id);
    return (
        <div className="article">
            <Header />
            <Post 
                key={currentPost.id}
                light={light}
                {...currentPost}
            />
            <hr/>
            <Comment
                light={light}
                {...currentPost}
            />
        </div>
    )
}

export default Article;
