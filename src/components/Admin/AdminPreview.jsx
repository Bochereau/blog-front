import React, { useState } from "react";
import { useSelector } from "react-redux";
import Post from "../Post";
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

    // Fonction utilitaire pour adapter le body du formulaire au format attendu par Post
    const adaptBodyForPost = (formBody) => {
        if (!Array.isArray(formBody)) return [];
        return formBody.map(section => {
            let images = [];
            let imageCaptions = [];
            // Si images est un tableau d'objets {url, caption}, on garde tel quel
            if (Array.isArray(section.images) && section.images.length > 0) {
                if (typeof section.images[0] === 'object' && section.images[0].url) {
                    images = section.images;
                } else {
                    // Sinon, on suppose que c'est un tableau de strings (URLs)
                    images = section.images.filter(Boolean);
                }
            }
            // Si captions sont présents dans le formulaire (optionnel)
            if (Array.isArray(section.imageCaptions)) {
                imageCaptions = section.imageCaptions;
            }
            return {
                subtitle: section.subtitle,
                text: section.text,
                images,
                imageCaptions,
                generalCaption: section.generalCaption || '',
            };
        });
    };

    const adaptedBody = adaptBodyForPost(form.body);

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

            {/* Utilisation du composant Post pour la prévisualisation */}
            <div className={`preview-content-wrapper ${getViewModeClass()}`}>
                <Post
                    title={form.title || "Titre de l'article"}
                    subtitle={form.subtitle || ''}
                    mainImage={form.mainImage}
                    publishedAt={form.createdAt}
                    author={form.author || "Auteur"}
                    introduction={form.introduction || "Votre introduction apparaîtra ici."}
                    context={form.context}
                    body={adaptedBody}
                    firstContact={form.firstContact}
                    conclusion={form.conclusion || "Votre conclusion apparaîtra ici."}
                    themes={postThemes}
                />
            </div>
        </div>
    );
};

export default ArticlePreview;
