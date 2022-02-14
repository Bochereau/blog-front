import React from "react";
import classNames from "classnames";
import { DualRing } from "react-css-spinners/dist/DualRing";

import './style.scss';

import Card from '../Card';

const Home = ({ loading, posts, light, changeColor }) => {
    return (
        <>
            <title>Limit Break</title>
            <div className="home">
                <div className={classNames ("home-header", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
                    <h1 className="home-header-title">Limit Break</h1>
                    <h2  className="home-header-subtitle">Le blog qui vous parle de jeux vidéo.</h2>
                    <div className="home-header-switch">
                        <label id="switch" class="switch">
                            <input type="checkbox" onChange={() => changeColor()} id="slider" checked={!light} />
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
                
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
            </div>
        </>
    )
    }
export default Home;