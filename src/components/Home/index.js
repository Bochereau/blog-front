import React from "react";
import { DualRing } from "react-css-spinners/dist/DualRing";

import './style.scss';
import Card from '../Card';

const Home = ({ loading, posts }) => (
    <div className="home">
        <div className="home-header">
            <title>Limit Break</title>
            <h1 className="home-header-title">Limit Break</h1>
            <h2  className="home-header-subtitle">Le blog qui vous parle de jeux vidéo.</h2>
        </div>
        <div className="home-posts">
            <ul className="home-posts-list">
                {loading && <DualRing color="#000" />}
                {!loading && posts.map((post) => (
                    <Card
                        key={post.id}
                        {...post}
                    />
                ))}
            </ul>
        </div>
    </div>
)

export default Home;