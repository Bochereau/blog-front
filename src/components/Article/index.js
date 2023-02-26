import React from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router";

import './style.scss';

import Post from '../Post';
import Comment from '../Comment';
import Related from '../Related';
import Footer from '../Footer';

const Article = ({ posts, getPostId,light }) => {
    const { slug } = useParams();
    const currentPost = posts.find((post) => post.attributes.slug === slug);
    getPostId(currentPost.id);
    return (
        <div className="article">
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
            <hr/>
            <Related 
                posts={posts}
                light={light}
                {...currentPost}
            />
            <Footer 
                light={light}
            />
        </div>
    )
}

Article.propTypes = {
    posts: PropTypes.shape({
        id: PropTypes.number.isRequired,
        attributes: PropTypes.object.isRequired,
    }).isRequired,
    getPostId: PropTypes.number.isRequired,
    light: PropTypes.bool.isRequired,
}

export default Article;
