import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";
import Card from "../Card";

const Home = () => {
  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);

  const publishedPosts = posts.filter(post => post.isPublished === true);

  return (
    <div className="home-posts">
      <ul className="home-posts-list">
        {loading && (
          <div className="home-loading">
            <div className="home-loading-box">
              <span className="home-loading-box-title"></span>
              <span className="home-loading-box-subtitle"></span>
              <span className="home-loading-box-button"></span>
            </div>
            <div className="home-loading-box">
              <span className="home-loading-box-title"></span>
              <span className="home-loading-box-subtitle"></span>
              <span className="home-loading-box-button"></span>
            </div>
          </div>
        )}
        {!loading &&
          publishedPosts.map((post, index) => (
            <Card
              key={post._id || post.id}
              post={post}
              isLCP={index < 2}
            />
          ))}
      </ul>
    </div>
  );
};

export default Home;
