import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const Card = ({ post }) => {
    const { title, subtitle, slug, mainImage } = post;
    
    return (
        <li className="card">
            <img className="card-img" src={mainImage} alt={title} />
            <h3 className="card-title">{title}</h3>
            <h4 className="card-subtitle">{subtitle}</h4>
            <Link to={`/posts/${slug}`} className="card-link">
                <p className="card-link-text">Lire l'article</p>
                <svg
                    width="24" 
                    height="24"
                    xmlns="http://www.w3.org/2000/svg" 
                    className="card-link-svg"
                >
                    <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
                </svg>
            </Link>
        </li>
    )
}

Card.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        mainImage: PropTypes.string,
    }).isRequired,
};

export default Card;