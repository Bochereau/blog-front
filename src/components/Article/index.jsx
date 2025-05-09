import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostId } from "../../actions";

import Post from "../Post";
import Comment from "../Comment";
import Related from "../Related";
import Footer from "../Footer";

import { DualRing } from "react-css-spinners/dist/DualRing";
import "./style.scss";

const Article = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const light = useSelector((state) => state.lightTheme);
  const loading = useSelector((state) => state.loading);

  const currentPost = posts.find((post) => post.slug === slug);

  useEffect(() => {
    if (currentPost) {
      dispatch(getPostId(currentPost._id));
    }
  }, [currentPost, dispatch]);

  if (loading) {
    return (
      <div className="article-loading">
        <DualRing color={light ? "#000" : "#FFF"} />
        <p className="article-loading-text">Chargement de l'article...</p>
      </div>
    );
  }

  if (!currentPost) {
    return <div className="article-notfound">Article introuvable</div>;
  }

  return (
    <div className="article">
      <Post light={light} {...currentPost} />
      <hr />
      {/* <Comment
        postId={currentPost._id}
        title={currentPost.title}
        light={light}
      />
      <hr /> */}
      <Related posts={posts} light={light} {...currentPost} />
      <Footer light={light} />
    </div>
  );
};

export default Article;
