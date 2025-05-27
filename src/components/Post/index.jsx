import React, { useState, useEffect } from "react";
import parse from 'html-react-parser';
import classNames from "classnames";

import { reverseDate } from "../../utils";
import './style.scss';

const Post = ({
  title,
  subtitle,
  mainImage,
  publishedAt,
  author,
  introduction,
  context,
  body,
  firstContact,
  conclusion,
  themes
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (images, index) => {
    setModalImages(images);
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImages([]);
    setCurrentIndex(0);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % modalImages.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector(".post");
      if (!article) return;

      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollTop = window.scrollY;
      const scrollPosition = scrollTop - article.offsetTop;
      const totalScrollable = articleHeight - windowHeight;

      const progress = Math.min(100, Math.max(0, (scrollPosition / totalScrollable) * 100));

      const progressBar = document.getElementById("reading-progress");
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <article className="post">
      <div className="reading-progress-container">
        <div className="reading-progress-bar" id="reading-progress" />
      </div>      
      <div className="post-header">
        {mainImage && (
          <img className="post-header-img" src={mainImage} alt={title} />
        )}
        <h3 className="post-header-title">
          {title}
        </h3>
      </div>


      <h4 className="post-subtitle">{subtitle}</h4>

      <p className="post-info">
        Publié le <time className="post-info-date" dateTime={publishedAt}>{publishedAt && reverseDate(publishedAt)}</time> par <em className="post-info-author">{author}</em>
      </p>

      {themes && (
        <div className="post-tags">
          {themes.map(theme => (
            <span key={theme._id} className="post-tags-item" style={{ backgroundColor: theme.color }}>
              {theme.name}
            </span>
          ))}
        </div>
      )}

      <div className="post-content">
        <p className="post-content-intro" style={{ whiteSpace: 'pre-line' }}>{parse(introduction)}</p>

        {context && (
          <div className="post-content-context">
            <p className="post-content-context-title">
              Un peu de contexte
            </p>
            <p className="post-content-context-text" style={{ whiteSpace: 'pre-line' }}>{parse(context)}</p>
          </div>
        )}

        {body && body.map((section, index) => (
          <div key={index} className="post-content-section">
            {section.subtitle && <h4 className="post-content-subtitle"><span>{parse(section.subtitle)}</span></h4>}
            {section.text && (
              <div className="post-content-section-body">
                <p className="post-content-section-text" style={{ whiteSpace: 'pre-line' }}>{parse(section.text)}</p>
              </div>
            )}
            {section.images && section.images.length > 0 && (
              <div className={`post-content-images has-${section.images.length}`}>
                {section.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`illustration-${idx}`}
                    className="post-content-image"
                    onClick={() => openModal(section.images, idx)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {firstContact && (
          <div className="post-content-contact">
            <p className="post-content-contact-title">
              Premier contact
            </p>
            <p className="post-content-contact-text" style={{ whiteSpace: 'pre-line' }}>{parse(firstContact)}</p>
          </div>
        )}

        <p className="post-content-outro" style={{ whiteSpace: 'pre-line' }}>{parse(conclusion)}</p>
      </div>

      {isModalOpen && (
        <div className="image-modal">
          <button className="close-btn" onClick={closeModal}>×</button>
          {modalImages.length > 1 && (
            <button className="prev-btn" onClick={prevImage}>‹</button>
          )}
          <img src={modalImages[currentIndex]} alt="image large" />
          {modalImages.length > 1 && (
            <button className="next-btn" onClick={nextImage}>›</button>
          )}
        </div>
      )}
    </article>
  )
};

export default Post;
