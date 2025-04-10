import React from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";

import './style.scss';

import Post from '../Post';
import Comment from '../Comment';
import Related from '../Related';
import Footer from '../Footer';

const Article = ({ posts, getPostId, light }) => {
  const { slug } = useParams();
  const currentPost = posts.find((post) => post.slug === slug);

  if (!currentPost) {
    return <div>Article introuvable</div>;
  }

  getPostId(currentPost._id);

  return (
    <div className="article">
      <Post light={light} {...currentPost} />
      <hr />
      {/* <Comment light={light} {...currentPost} /> */}
      <hr />
      <Related posts={posts} light={light} {...currentPost} />
      <Footer light={light} />
    </div>
  );
};

Article.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
  getPostId: PropTypes.func.isRequired,
  light: PropTypes.bool.isRequired,
};

export default Article;
