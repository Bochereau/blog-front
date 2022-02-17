import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import classNames from 'classnames';
import { createRelatedPosts } from '../../utils';

import './style.scss';

const Related = ({ posts, id, light }) => {
    const newPosts = createRelatedPosts(posts, id);
    return (
        <div className="related">
            <h4 className={classNames ("related-title", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
                Articles Similaires
            </h4>
            <div className="related-posts">
                {newPosts.map((post) => (
                    <div 
                        className="related-posts-item"
                        key={post.id}
                    >
                        <Link 
                            to={`/posts/${post.attributes.slug}`}
                        >
                            <img src={post.attributes.picture.data.attributes.url} alt={post.attributes.title} />
                            <h5 className="related-posts-item-title">{post.attributes.title}</h5>
                            <p className="related-posts-item-text">Cliquez pour accéder à l'article suivant : </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

Related.propTypes = {
    posts: PropTypes.shape({
        id: PropTypes.number.isRequired,
        attributes: PropTypes.shape({
            title: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            picture: PropTypes.array.isRequired,
        }).isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    light: PropTypes.bool.isRequired,
}

export default Related;