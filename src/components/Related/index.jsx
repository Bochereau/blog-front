import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "./style.scss";

// Shuffle utilitaire
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

// Fonction pour récupérer les articles similaires
const createRelatedPosts = (posts, currentId, currentThemeIds, limit = 5) => {
  const related = posts.filter((post) => {
    if (post._id === currentId || !post.themes) return false;
    const themeIds = post.themes.map((t) => t._id);
    return themeIds.some((id) => currentThemeIds.includes(id));
  });

  const shuffledRelated = shuffleArray(related).slice(0, limit);

  if (shuffledRelated.length >= limit) {
    return shuffledRelated;
  }

  const others = posts.filter(
    (p) => p._id !== currentId && !related.some((r) => r._id === p._id)
  );

  const shuffledOthers = shuffleArray(others).slice(0, limit - shuffledRelated.length);

  return [...shuffledRelated, ...shuffledOthers];
};


const Related = ({ posts, _id, themes, light }) => {
  const currentThemeIds = themes.map((t) => t._id);

  const publishedPosts = posts.filter(post => post.isPublished === true);

  const relatedPosts = createRelatedPosts(publishedPosts, _id, currentThemeIds);

  return (
    <div className="related">
      <div
        className={classNames("related-title", {
          "bk-s--light": light === true,
          "bk-s--dark": light === false,
        })}
      >
        <h4 className="related-title-text">Articles Similaires</h4>
      </div>
      <div className="related-posts">
        {relatedPosts.map((post) => (
          <div className="related-posts-item" key={post._id}>
            <Link to={`/posts/${post.slug}`}>
              <img src={post.mainImage} alt={post.title} />
              <h5 className="related-posts-item-title">{post.title}</h5>
              <p className="related-posts-item-text">Cliquez pour accéder à l'article suivant :</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

Related.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  _id: PropTypes.string.isRequired,
  themes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  light: PropTypes.bool.isRequired,
};

export default Related;
