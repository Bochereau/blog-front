import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./preview-styles.scss";

const ArticlePreview = ({form, togglePreview }) => {
    const [viewMode, setViewMode] = useState('desktop');

    const themes = useSelector((state) => state.themes);

    const postThemes = themes.filter(theme =>
        form.themes?.includes(theme._id)
    );

    // Fonction pour déterminer la classe CSS selon le mode d'affichage
    const getViewModeClass = () => {
        switch (viewMode) {
            case 'tablet':
                return 'preview-tablet-view';
            case 'mobile':
                return 'preview-mobile-view';
            default:
                return 'preview-desktop-view';
        }
    };

    // Fonction pour formater la date comme dans le composant Post
    const reverseDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="post-preview-container">
            <div className="preview-header">
                <h2>Prévisualisation</h2>

                <div className="preview-device-selector">
                    <button
                        className={`device-btn ${viewMode === 'desktop' ? 'active' : ''}`}
                        onClick={() => setViewMode('desktop')}
                        title="Vue ordinateur"
                    >
                        💻
                    </button>
                    <button
                        className={`device-btn ${viewMode === 'tablet' ? 'active' : ''}`}
                        onClick={() => setViewMode('tablet')}
                        title="Vue tablette"
                    >
                        📱
                    </button>
                    <button
                        className={`device-btn ${viewMode === 'mobile' ? 'active' : ''}`}
                        onClick={() => setViewMode('mobile')}
                        title="Vue smartphone"
                    >
                        📱
                    </button>
                </div>

                <div className="preview-status">
                    <span className={`status-indicator ${form.isPublished ? 'published' : 'draft'}`}>
                        {form.isPublished ? 'Article publié' : 'Brouillon - Non publié'}
                    </span>
                </div>

                <button type="button" onClick={togglePreview} className="close-preview-btn">
                    Fermer la prévisualisation
                </button>
            </div>

            {/* Structure du composant Post pour la prévisualisation */}
            <div className={`preview-content-wrapper ${getViewModeClass()}`}>
                <article className="post">
                    <div className="post-header">
                        {form.mainImage && (
                            <img className="post-header-img" src={form.mainImage} alt={form.title} />
                        )}
                        <h3 className={`post-header-title bk-s--${form.light ? 'light' : 'dark'}`}>
                            {form.title || "Titre de l'article"}
                        </h3>
                    </div>

                    <p className="post-info">
                        Publié le <time className="post-info-date" dateTime={form.createdAt}>{reverseDate(form.createdAt)}</time> par <em className="post-info-author">{form.author || "Auteur"}</em>
                    </p>

                    {postThemes.length > 0 && (
                        <div className="post-tags">
                            {postThemes.map(theme => (
                                <span key={theme._id} className="post-tags-item" style={{ backgroundColor: theme.color }}>
                                    {theme.name}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="post-content">
                        <p className="post-content-intro" style={{ whiteSpace: 'pre-line' }}>{form.introduction || "Votre introduction apparaîtra ici."}</p>

                        {form.context && (
                            <div className="post-content-context">
                                <div className="post-content-context-triangle-top"></div>
                                <p className="post-content-context-title">
                                    Un peu de contexte
                                </p>
                                <p className="post-content-context-text" style={{ whiteSpace: 'pre-line' }}>{form.context}</p>
                                <div className="post-content-context-triangle-bottom"></div>
                            </div>
                        )}

                        {form.body.map((section, index) => (
                            <div key={index} className="post-content-section">
                                {section.subtitle && <h4 className="post-content-subtitle"><span>{section.subtitle}</span></h4>}
                                {section.text && <p className="post-content-text" style={{ whiteSpace: 'pre-line' }}>{section.text}</p>}
                                {section.images?.filter(img => img).length > 0 && (
                                    <div className={`post-content-images has-${section.images.filter(img => img).length}`}>
                                        {section.images.filter(img => img).map((image, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={image}
                                                alt={`illustration-${imgIndex}`}
                                                className="post-content-image"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {form.firstContact && (
                            <div className="post-content-contact">
                                <div className="post-content-contact-triangle-top"></div>
                                <p className="post-content-contact-title">
                                    Premier contact
                                </p>
                                <p className="post-content-contact-text" style={{ whiteSpace: 'pre-line' }}>{form.firstContact}</p>
                                <div className="post-content-contact-triangle-bottom"></div>
                            </div>
                        )}

                        <p className="post-content-outro" style={{ whiteSpace: 'pre-line' }}>{form.conclusion || "Votre conclusion apparaîtra ici."}</p>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default ArticlePreview;
