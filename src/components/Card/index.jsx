import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MoveRight } from "lucide-react";

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
                <MoveRight size={20} />
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