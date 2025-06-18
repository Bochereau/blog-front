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
  const [modalCaptions, setModalCaptions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (images, captions, index) => {
    setModalImages(images);
    setModalCaptions(captions || []);
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImages([]);
    setModalCaptions([]);
    setCurrentIndex(0);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % modalImages.length);
  };

  // Gestionnaire pour fermer la modal en cliquant en dehors de l'image
  const handleModalClick = (e) => {
    // Fermer seulement si on clique sur le conteneur de la modal (pas sur l'image)
    if (e.target.classList.contains('modal-image')) {
      closeModal();
    }
  };

  // Gestionnaire pour fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

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

  // Fonction pour traiter les images et légendes d'une section
  const processImagesData = (section) => {
    // Si section.images est un tableau d'objets avec url et caption
    if (section.images && section.images.length > 0) {
      const firstImage = section.images[0];
      
      // Nouveau format : tableau d'objets {url, caption}
      if (typeof firstImage === 'object' && firstImage.url) {
        return {
          urls: section.images.map(img => img.url),
          captions: section.images.map(img => img.caption || ''),
          hasIndividualCaptions: section.images.some(img => img.caption)
        };
      }
      
      // Ancien format : tableau d'URLs
      if (typeof firstImage === 'string') {
        return {
          urls: section.images,
          captions: section.imageCaptions || [],
          hasIndividualCaptions: section.imageCaptions && section.imageCaptions.length > 0
        };
      }
    }
    
    return { urls: [], captions: [], hasIndividualCaptions: false };
  };

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

        {body && body.map((section, index) => {
          const { urls, captions, hasIndividualCaptions } = processImagesData(section);
          
          return (
            <div key={index} className="post-content-section">
              {section.subtitle && <h4 className="post-content-subtitle"><span>{parse(section.subtitle)}</span></h4>}
              {section.text && (
                <div className="post-content-section-body">
                  <p className="post-content-section-text" style={{ whiteSpace: 'pre-line' }}>{parse(section.text)}</p>
                </div>
              )}
              {urls.length > 0 && (
                <div className={`post-content-images has-${urls.length}`}>
                  {urls.map((url, idx) => (
                    <div key={idx} className="post-content-image-container">
                      <img
                        src={url}
                        alt={captions[idx] || `illustration-${idx}`}
                        className="post-content-image"
                        onClick={() => openModal(urls, captions, idx)}
                      />
                      {captions[idx] && (
                        <p className="post-content-image-caption">{parse(captions[idx])}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* Légende générale si pas de légendes individuelles mais qu'il y a une légende générale */}
              {urls.length > 0 && !hasIndividualCaptions && section.generalCaption && (
                <p className="post-content-images-general-caption">{parse(section.generalCaption)}</p>
              )}
            </div>
          );
        })}

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
        <div className="modal-image" onClick={handleModalClick}>
          <button className="close-btn" onClick={closeModal}>×</button>
          {modalImages.length > 1 && (
            <button className="prev-btn" onClick={prevImage}>‹</button>
          )}
          <div className="modal-image-container">
            <img src={modalImages[currentIndex]} alt="image large" />
            {modalCaptions[currentIndex] && (
              <p className="modal-image-caption">{parse(modalCaptions[currentIndex])}</p>
            )}
          </div>
          {modalImages.length > 1 && (
            <button className="next-btn" onClick={nextImage}>›</button>
          )}
        </div>
      )}
    </article>
  )
};

export default Post;