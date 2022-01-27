import React from "react";
import { useParams } from "react-router";

import './style.scss';

import Header from '../Header';
import Post from '../Post';
import Comment from '../Comment';

const Article = ({ posts, getPostId }) => {
    const { slug } = useParams();
    const currentPost = posts.find((post) => post.attributes.slug === slug);
    getPostId(currentPost.id);
    return (
        <div className="article">
            <Header />
            <Post 
                key={currentPost.id} 
                {...currentPost} 
            />
            <hr/>
            <Comment 
                key={currentPost.id} 
                {...currentPost}
            />
        </div>
    )
}

export default Article;
