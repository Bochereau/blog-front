import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const Card = ({ attributes }) => {
    return (
        <li className="card">
            <img className="card-img" src={`${attributes.mainImage}`} alt={attributes.title} />
            <h3 className="card-title">{attributes.title}</h3>
            <h4 className="card-subtitle">{attributes.subtitle}</h4>
            <Link to={`/posts/${attributes.slug}`} className="card-link">
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
    attributes: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        picture: PropTypes.object.isRequired,
    }).isRequired,
}

export default Card;