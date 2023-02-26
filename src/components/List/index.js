import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import {Link } from "react-router-dom";
import { DualRing } from "react-css-spinners/dist/DualRing";
import { sortedByNameArray } from '../../utils';

import './style.scss';

const List = ({ 
    posts,
    themes,
    loading,
    light,
}) => {
    const clonePostsArray = [...posts];
    const newArray = sortedByNameArray(clonePostsArray);
    return (
        <>
            <div className="list">
                <h2 className={classNames ("list-title", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
                    Liste des articles
                </h2>
                <div className="list-items">
                    <p className="list-items-description">Retrouvez sur cette page la liste des sujets abordés sur le site :</p>
                    {loading && <DualRing color="#000" />}
                    {!loading && (
                        <ul>
                            {themes.map((theme) => (
                                <li key={theme.id}>
                                    <h3 className="list-items-theme">{theme}</h3>
                                    <ul>
                                        {newArray.map((post) => post.attributes.theme.data.attributes.name === theme && (
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
                    )}
                </div>
            </div>
        </>
    )
}

List.propTypes = {
    posts: PropTypes.shape({
        id: PropTypes.number.isRequired,
        attributes: PropTypes.shape({
            slug: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            theme: PropTypes.object.isRequired,
        }).isRequired,
    }).isRequired,
    themes: PropTypes.arrayOf(PropTypes.string).isRequired,
    loading: PropTypes.bool.isRequired,
    light: PropTypes.bool.isRequired,
}

export default List;