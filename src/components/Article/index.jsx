import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostId } from "../../actions";

import Post from "../Post";
import Comment from "../Comment";
import Related from "../Related";

import { DualRing } from "react-css-spinners/dist/DualRing";
import "./style.scss";

const Article = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
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
        <DualRing color={"#000"} />
        <p className="article-loading-text">Chargement de l'article...</p>
      </div>
    );
  }

  if (!currentPost) {
    return <div className="article-notfound">Article introuvable</div>;
  }

  return (
    <div className="article">
      <Post {...currentPost} />
      <hr />
      {/* <Comment
        postId={currentPost._id}
        title={currentPost.title}
      />
      <hr /> */}
      <Related posts={posts} {...currentPost} />
    </div>
  );
};

export default Article;
