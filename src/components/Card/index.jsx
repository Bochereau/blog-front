import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MoveRight } from "lucide-react";

import './style.scss';

const Card = ({ post, isLCP = false }) => {
    const {
        title,
        subtitle,
        slug,
        mainImage,
        mainImageSmall,
        mainImageMedium,
        mainImageLarge,
    } = post;

    const fallback = mainImageMedium || mainImageSmall || mainImage;
    const srcSetParts = [];

    if (mainImageSmall) srcSetParts.push(`${mainImageSmall} 700w`);
    if (mainImageMedium) srcSetParts.push(`${mainImageMedium} 1400w`);
    if (mainImageLarge) srcSetParts.push(`${mainImageLarge} 2200w`);

    const srcSet = srcSetParts.length > 0 ? srcSetParts.join(", ") : undefined;
    
    return (
        <li className="card">
            <img
                className="card-img"
                src={fallback}
                srcSet={srcSet}
                sizes="(max-width: 600px) 100vw,
                       (max-width: 1200px) 80vw,
                       1200px"
                alt={title}
                loading={isLCP ? "eager" : "lazy"}
                fetchpriority={isLCP ? "high" : "auto"}
                decoding="async"
            />
            <h3 className="card-title">{title}</h3>
            <h4 className="card-subtitle">{subtitle}</h4>
            <Link to={`/posts/${slug}`} className="card-link">
                <p className="card-link-text">Lire l'article</p>
                <MoveRight className="card-link-icon" size={20} />
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
    isLCP: PropTypes.bool,
};

export default Card;