import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { DualRing } from "react-css-spinners/dist/DualRing";
import { changeColor } from "../../actions";

import "./style.scss";
import Card from "../Card";

const Home = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);
  const light = useSelector((state) => state.lightTheme);

  const handleChangeColor = () => dispatch(changeColor());

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
            <DualRing color={light ? "#000" : "#FFF"} />
            <p className="home-loading-text">Veuillez patienter</p>
          </div>
        )}
        {!loading &&
          posts.map((post) => (
            <Card key={post._id || post.id} post={post} />
          ))}
      </ul>
    </div>
  );
};

export default Home;
