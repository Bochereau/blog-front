import React from "react";
import classNames from "classnames";
import {Link } from "react-router-dom";
import { DualRing } from "react-css-spinners/dist/DualRing";

import './style.scss';


import Header from '../../containers/Header';

const List = ({ posts, themes, loading, light }) => {
    return (
        <>
            <Header />
            <div className="list">
                <h2 className={classNames ("list-title", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
                    Liste des jeux
                </h2>
                <div className="list-items">
                    <p className="list-items-description">Retrouvez sur cette page la liste des sujets abordés sur le site :</p>
                    {loading && <DualRing color="#000" />}
                    <ul>
                        {!loading && themes.map((theme) => (
                            <li key={theme.id}>
                                <h3 className="list-items-theme">{theme}</h3>
                                <ul>
                                    {posts.map((post) => post.attributes.theme.data.attributes.name === theme && (
                                        <li key={post.attributes.slug} className="list-link">
                                            <Link to={`/posts/${post.attributes.slug}`} className="list-link">
                                                <p className="list-link-name">{post.attributes.title}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default List;