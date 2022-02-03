import React from "react";
import {Link } from "react-router-dom";
import { DualRing } from "react-css-spinners/dist/DualRing";

import './style.scss';

import Header from '../Header';

const List = ({ posts, themes, loading }) => {
    
    function compare( a, b ) {
        if ( a.attributes.title < b.attributes.title ){
          return -1;
        }
        if ( a.attributes.title > b.attributes.title ){
          return 1;
        }
        return 0;
    }
    const newPosts = posts.sort( compare );

    return (
        <>
            <Header />
            <div className="list">
                <h2 className="list-title">Liste des jeux</h2>
                <div className="list-items">
                    <p className="list-items-description">Retrouvez sur cette page la liste des sujets abordés sur le site :</p>
                    {loading && <DualRing color="#000" />}
                    <ul>
                        {!loading && themes.map((theme) => (
                            <li key={theme.id}>
                                <h3 className="list-items-theme">{theme}</h3>
                                <ul>
                                    {newPosts.map((post) => post.attributes.theme.data.attributes.name === theme && (
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