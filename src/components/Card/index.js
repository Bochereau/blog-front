import React from "react";
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './style.scss';

const Card = ({ attributes }) => {
    console.log(attributes);
    return (
    <li className="card">
        <img className="card-img" src={`${attributes.picture.data.attributes.url}`} alt={attributes.title} />
        <h3 className="card-title">{attributes.title}</h3>
        <h4 className="card-subtitle">{attributes.subtitle}</h4>
        <Link to={`/posts/${attributes.theme}`} className="card-link">
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


export default Card;