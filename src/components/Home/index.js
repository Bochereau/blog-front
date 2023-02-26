import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { DualRing } from "react-css-spinners/dist/DualRing";

import './style.scss';

import Card from '../Card';

const Home = ({ loading, posts, light, changeColor }) => {
    return (
        <div className={classNames ("home-posts", {"bk-p--light" : light === true, "bk-p--dark" : light === false})}>
            <ul className="home-posts-list">
                {loading && (
                    <div className="home-loading">
                        <DualRing color={classNames({"#000" : light === true, "#FFF" : light=== false})} />
                        <p className="home-loading-text">Veuillez Patientez</p>
                    </div>
                )}
                {!loading && posts.map((post) => (
                    <Card
                        key={post.id}
                        {...post}
                    />
                ))}
            </ul>
        </div>
    )
}

Home.propTypes = {
    loading: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    light: PropTypes.bool.isRequired,
    changeColor: PropTypes.func.isRequired,
}

export default Home;