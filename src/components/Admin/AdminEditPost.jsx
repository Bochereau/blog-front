import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePost, getPosts } from "../../actions";
import "./style.scss";

const AdminEditPost = () => {
    const { id } = useParams(); // Récupère l'ID du post depuis l'URL
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const themes = useSelector((state) => state.themes);
    const allPosts = useSelector((state) => state.posts);
    
    // Trouver le post correspondant à l'ID
    const currentPost = allPosts.find(post => post._id === id);
    
    // État local pour le formulaire
    const [form, setForm] = useState({
        title: "",
        slug: "",
        author: "",
        subtitle: "",
        introduction: "",
        context: "",
        firstContact: "",
        conclusion: "",
        readingTime: "",
        mainImage: "",
        themes: [], // liste d'IDs
        body: [
            {
                subtitle: "",
                text: "",
                images: [],
            },
        ],
    });

    // Charger les données du post quand il est disponible
    useEffect(() => {
        // S'assurer que les posts sont chargés
        if (allPosts.length === 0) {
            dispatch(getPosts());
        }
        
        // Remplir le formulaire avec les données du post existant
        if (currentPost) {
            // Adapter la structure si nécessaire
            const themeIds = currentPost.themes && Array.isArray(currentPost.themes) 
                ? currentPost.themes.map(theme => typeof theme === 'object' ? theme._id : theme)
                : [];
                
            setForm({
                _id: currentPost._id, // Important pour l'update
                title: currentPost.title || "",
                slug: currentPost.slug || "",
                author: currentPost.author || "",
                subtitle: currentPost.subtitle || "",
                introduction: currentPost.introduction || "",
                context: currentPost.context || "",
                firstContact: currentPost.firstContact || "",
                conclusion: currentPost.conclusion || "",
                readingTime: currentPost.readingTime || "",
                mainImage: currentPost.mainImage || "",
                themes: themeIds,
                body: currentPost.body && currentPost.body.length > 0 
                    ? currentPost.body.map(section => ({
                        subtitle: section.subtitle || "",
                        text: section.text || "",
                        images: section.images || []
                    }))
                    : [{ subtitle: "", text: "", images: [] }],
            });
        }
    }, [currentPost, allPosts, dispatch, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleThemeToggle = (themeId) => {
        const updatedThemes = form.themes.includes(themeId)
            ? form.themes.filter((id) => id !== themeId)
            : [...form.themes, themeId];
        setForm({ ...form, themes: updatedThemes });
    };

    const handleBodyChange = (index, field, value) => {
        const updatedBody = [...form.body];
        updatedBody[index][field] = value;
        setForm({ ...form, body: updatedBody });
    };

    const handleImageChange = (sectionIndex, imageIndex, value) => {
        const updatedBody = [...form.body];
        // Vérifier que images existe
        if (!updatedBody[sectionIndex].images) {
            updatedBody[sectionIndex].images = [];
        }
        updatedBody[sectionIndex].images[imageIndex] = value;
        setForm({ ...form, body: updatedBody });
    };

    const addImageField = (sectionIndex) => {
        const updatedBody = [...form.body];
        if (!updatedBody[sectionIndex].images) {
            updatedBody[sectionIndex].images = [];
        }
        updatedBody[sectionIndex].images.push("");
        setForm({ ...form, body: updatedBody });
    };

    const removeImageField = (sectionIndex, imageIndex) => {
        const updatedBody = [...form.body];
        updatedBody[sectionIndex].images.splice(imageIndex, 1);
        setForm({ ...form, body: updatedBody });
    };

    const addBodySection = () => {
        setForm({
            ...form,
            body: [...form.body, { subtitle: "", text: "", images: [] }],
        });
    };

    const removeBodySection = (index) => {
        if (form.body.length > 1) {
            const updatedBody = [...form.body];
            updatedBody.splice(index, 1);
            setForm({ ...form, body: updatedBody });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(updatePost(form));
        alert("Article mis à jour !");
        navigate("/admin/posts");
    };

    // Si les données ne sont pas encore chargées
    if (!currentPost && allPosts.length > 0) {
        return <div className="admin-edit">Post non trouvé</div>;
    }

    if (!currentPost) {
        return <div className="admin-edit">Chargement...</div>;
    }

    return (
        <div className="admin-edit">
            <Link to="/admin/posts" className="admin-return">&#8592; Retour</Link>
            
            <h2>Modifier l'article</h2>
            <form onSubmit={handleSubmit}>
                <div className="admin-edit-short-fields">
                    <input name="title" placeholder="Titre" value={form.title} onChange={handleChange} required />
                    <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} required />
                    <input name="author" placeholder="Auteur" value={form.author} onChange={handleChange} required />
                    <input name="readingTime" placeholder="Temps de lecture" value={form.readingTime} onChange={handleChange} />
                    <input name="subtitle" placeholder="Sous-titre" value={form.subtitle} onChange={handleChange} />
                </div>

                <input name="mainImage" placeholder="Image principale (URL Cloudinary)" value={form.mainImage} onChange={handleChange} />

                <textarea name="introduction" placeholder="Introduction" value={form.introduction} onChange={handleChange} />
                <textarea name="context" placeholder="Contexte" value={form.context} onChange={handleChange} />

                <div className="admin-edit-body">
                    <h3>Corps de l'article</h3>
                    {form.body.map((section, index) => (
                        <div key={index} className="form-section">
                            <div className="form-section-header">
                                <span>Section {index + 1}</span>
                                {form.body.length > 1 && (
                                    <button 
                                        type="button" 
                                        className="remove-section-btn" 
                                        onClick={() => removeBodySection(index)}
                                    >
                                        🗑️ Supprimer
                                    </button>
                                )}
                            </div>
                            
                            <input
                                placeholder="Sous-titre"
                                value={section.subtitle}
                                onChange={(e) => handleBodyChange(index, "subtitle", e.target.value)}
                            />
                            <textarea
                                rows="3"
                                placeholder="Texte"
                                value={section.text}
                                onChange={(e) => handleBodyChange(index, "text", e.target.value)}
                            />
                            <div className="body-images">
                                <h4>Images</h4>
                                {section.images && section.images.map((url, imgIndex) => (
                                    <div key={imgIndex} className="image-input-container">
                                        <input
                                            type="text"
                                            placeholder={`Image URL #${imgIndex + 1}`}
                                            value={url}
                                            onChange={(e) =>
                                                handleImageChange(index, imgIndex, e.target.value)
                                            }
                                        />
                                        <button
                                            type="button"
                                            className="remove-image-btn"
                                            onClick={() => removeImageField(index, imgIndex)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className="add-image-btn"
                                    onClick={() => addImageField(index)}
                                >
                                    ➕ Ajouter une image
                                </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="add-section-btn" onClick={addBodySection}>
                        ➕ Ajouter une section
                    </button>
                </div>

                <textarea name="firstContact" placeholder="Premier contact" value={form.firstContact} onChange={handleChange} />
                <textarea name="conclusion" placeholder="Conclusion" value={form.conclusion} onChange={handleChange} />

                <h4>Thèmes</h4>
                <div className="theme-select">
                    {themes.map((theme) => (
                        <label 
                            key={theme._id} 
                            className={`theme-select-item ${form.themes.includes(theme._id) ? 'selected' : ''}`} 
                            style={{ 
                                backgroundColor: theme.color,
                                borderColor: theme.color
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={form.themes.includes(theme._id)}
                                onChange={() => handleThemeToggle(theme._id)}
                            />
                            {theme.name}
                        </label>
                    ))}
                </div>

                <div className="admin-edit-actions">
                    <button type="submit" className="submit-btn">Enregistrer les modifications</button>
                    <Link to="/admin/posts" className="cancel-btn">Annuler</Link>
                </div>
            </form>
        </div>
    );
};

export default AdminEditPost;