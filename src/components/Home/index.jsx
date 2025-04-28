import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { changeColor } from "../../actions";

import "./style.scss";
import Card from "../Card";

const Home = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);
  const light = useSelector((state) => state.lightTheme);

  // const handleChangeColor = () => dispatch(changeColor());
  const publishedPosts = posts.filter(post => post.isPublished === true);

  return (
    <div
      className={classNames("home-posts", {
        "bk-p--light": light === true,
        "bk-p--dark": light === false,
      })}
    >
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
          publishedPosts.map((post) => (
            <Card key={post._id || post.id} post={post} />
          ))}
      </ul>
    </div>
  );
};

export default Home;
