import React from "react";
import {Link } from "react-router-dom";
import { DualRing } from "react-css-spinners/dist/DualRing";

import './style.scss';

import Header from '../Header';

const List = ({ posts, themes, loading }) => {
    return (
        <>
            <Header />
            <div className="list">
                <h2 className="list-title">Liste des jeux</h2>
                <div className="list-items">
                    <p className="list-items-description">Retrouvez sur cette page la liste des sujets abordés sur le site :</p>
                    {loading && <DualRing color="#000" />}
                    {!loading && themes.map((theme) => (
                        <ul>
                            <li>
                                <h3 className="list-items-theme">{theme}</h3>
                                <ul>
                                    {posts.map((post) => post.attributes.theme.data.attributes.name === theme && (
                                        <li className="list-link">
                                            <Link to={`/posts/${post.attributes.slug}`} className="list-link">
                                                <p className="list-link-name">{post.attributes.title}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </>
    )
}

export default List;