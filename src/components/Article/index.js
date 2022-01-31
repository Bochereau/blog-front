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
    console.log(currentPost);
    return (
        <div className="article">
            <Header />
            <Post 
                key={currentPost.id}
                {...currentPost} 
            />
            <hr/>
            <Comment 
                {...currentPost}
            />
        </div>
    )
}

export default Article;
