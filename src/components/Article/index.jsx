import React, { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostId } from "../../actions";

import Post from "../Post";
import Comment from "../Comment";
import Related from "../Related";
import Loader from "../Loader";

import "./style.scss";

const Article = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);

  const currentPost = posts.find((post) => post.slug === slug);

  // Preload de l'image hero dès qu'on a le post → même URL que la home, meilleur cache + LCP plus rapide
  useLayoutEffect(() => {
    if (!currentPost) return;
    const url = currentPost.mainImageLarge || currentPost.mainImageMedium || currentPost.mainImage;
    if (!url) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
    return () => link.remove();
  }, [currentPost]);

  useEffect(() => {
    if (currentPost) {
      dispatch(getPostId(currentPost._id));
    }
  }, [currentPost, dispatch]);

  if (loading) {
    return <Loader text="Chargement de l'article..." className="article-loading" />;
  }

  if (!currentPost) {
    return <div className="article-notfound">Article introuvable</div>;
  }

  return (
    <div className="article">
      <Post {...currentPost} />
      <Comment
        postId={currentPost._id}
        title={currentPost.title}
      />
      <Related posts={posts} {...currentPost} />
    </div>
  );
};

export default Article;
