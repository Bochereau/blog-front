import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../../actions";
import "./style.scss";

import ArticlePreview from "./AdminPreview";

const AdminCreatePost = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const themes = useSelector((state) => state.themes);
    const [errors, setErrors] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

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
        themes: [],
        isPublished: false,
        body: [
            {
                subtitle: "",
                text: "",
                images: [],
            },
        ],
        createdAt: new Date().toISOString(),
    });

    // Vérifier l'authentification
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
        if (isAuthenticated !== "true") {
            navigate("/admin");
        }
    }, [navigate]);

    // Générer automatiquement le slug à partir du titre
    useEffect(() => {
        if (form.title && !formSubmitted) {
            const generatedSlug = form.title
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-');
            setForm(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [form.title, formSubmitted]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!form.title.trim()) newErrors.title = "Le titre est requis";
        if (!form.slug.trim()) newErrors.slug = "Le slug est requis";
        if (!form.author.trim()) newErrors.author = "L'auteur est requis";
        if (!form.subtitle.trim()) newErrors.subtitle = "Le sous-titre est requis";
        if (!form.introduction.trim()) newErrors.introduction = "L'introduction est requise";
        if (!form.readingTime.trim()) newErrors.readingTime = "Le temps de lecture est requis";
        
        // Vérifier que chaque section du corps a au moins un sous-titre ou du texte
        form.body.forEach((section, index) => {
            if (!section.subtitle.trim() && !section.text.trim()) {
                newErrors[`body_${index}`] = "La section doit contenir un sous-titre ou du texte";
            }
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        
        // Effacer l'erreur pour ce champ si elle existe
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
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
        
        // Effacer l'erreur pour cette section si elle existe
        if (errors[`body_${index}`]) {
            setErrors({ ...errors, [`body_${index}`]: null });
        }
    };

    const handleImageChange = (sectionIndex, imageIndex, value) => {
        const updatedBody = [...form.body];
        updatedBody[sectionIndex].images[imageIndex] = value;
        setForm({ ...form, body: updatedBody });
    };

    const addImageField = (sectionIndex) => {
        const updatedBody = [...form.body];
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
            
            // Supprimer l'erreur associée à cette section
            const newErrors = { ...errors };
            delete newErrors[`body_${index}`];
            setErrors(newErrors);
        }
    };

    const saveAsDraft = async () => {
        // Sauvegarder comme brouillon sans validation complète
        const draftForm = { ...form, isPublished: false };
        
        try {
            setFormSubmitted(true);
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(draftForm),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Brouillon sauvegardé !");
                navigate(`/admin/posts/edit/${data.id}`);
            } else {
                alert("Erreur lors de la sauvegarde du brouillon.");
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur lors de la sauvegarde du brouillon.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // Faire défiler jusqu'à la première erreur
            const firstErrorField = document.querySelector(".error-message");
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            return;
        }

        try {
            setFormSubmitted(true);
            const postData = { ...form, isPublished: true };
            
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(addPost(postData));
                alert("Article créé et publié !");
                navigate("/admin/posts");
            } else {
                alert("Erreur lors de la création de l'article.");
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur lors de la création de l'article.");
        }
    };

    const togglePreview = () => {
        setShowPreview(!showPreview);
    };

    return (
        <div className="admin-create">
            <Link to="/admin/posts" className="admin-return">&#8592; Retour</Link>
        
            <h2>Créer un article</h2>
            
            <div className="form-actions">
                <button 
                    type="button" 
                    className="preview-btn"
                    onClick={togglePreview}
                >
                    👁️ Prévisualiser
                </button>
                
                <button 
                    type="button" 
                    className="draft-btn"
                    onClick={saveAsDraft}
                >
                    💾 Enregistrer comme brouillon
                </button>
            </div>
            
            {showPreview && <ArticlePreview form={form} togglePreview ={togglePreview} />}
            
            <form onSubmit={handleSubmit}>
                <div className="admin-create-short-fields">
                    <div className="form-group">
                        <input 
                            name="title" 
                            placeholder="Titre" 
                            value={form.title} 
                            onChange={handleChange}
                            className={errors.title ? "error-input" : ""}
                        />
                        {errors.title && <div className="error-message">{errors.title}</div>}
                    </div>
                    
                    <div className="form-group">
                        <input 
                            name="slug" 
                            placeholder="Slug" 
                            value={form.slug} 
                            onChange={handleChange}
                            className={errors.slug ? "error-input" : ""}
                        />
                        {errors.slug && <div className="error-message">{errors.slug}</div>}
                    </div>
                    
                    <div className="form-group">
                        <input 
                            name="author" 
                            placeholder="Auteur" 
                            value={form.author} 
                            onChange={handleChange}
                            className={errors.author ? "error-input" : ""}
                        />
                        {errors.author && <div className="error-message">{errors.author}</div>}
                    </div>
                    
                    <div className="form-group">
                        <input 
                            name="readingTime" 
                            placeholder="Temps de lecture" 
                            value={form.readingTime} 
                            onChange={handleChange}
                            className={errors.readingTime ? "error-input" : ""}
                        />
                        {errors.readingTime && <div className="error-message">{errors.readingTime}</div>}
                    </div>
                    
                    <div className="form-group">
                        <input 
                            name="subtitle" 
                            placeholder="Sous-titre" 
                            value={form.subtitle} 
                            onChange={handleChange}
                            className={errors.subtitle ? "error-input" : ""}
                        />
                        {errors.subtitle && <div className="error-message">{errors.subtitle}</div>}
                    </div>
                </div>

                <div className="form-group">
                    <input 
                        name="mainImage" 
                        placeholder="Image principale (URL Cloudinary)" 
                        value={form.mainImage} 
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <textarea 
                        name="introduction" 
                        placeholder="Introduction" 
                        value={form.introduction} 
                        onChange={handleChange}
                        className={errors.introduction ? "error-input" : ""}
                    />
                    {errors.introduction && <div className="error-message">{errors.introduction}</div>}
                </div>
                
                <div className="form-group">
                    <textarea 
                        name="context" 
                        placeholder="Contexte" 
                        value={form.context} 
                        onChange={handleChange}
                    />
                </div>

                <div className="admin-create-body">
                    <h3>Corps de l'article</h3>
                    {form.body.map((section, index) => (
                        <div key={index} className={`form-section ${errors[`body_${index}`] ? "error-section" : ""}`}>
                            <div className="section-header">
                                <span className="section-number">Section {index + 1}</span>
                                {form.body.length > 1 && (
                                    <button 
                                        type="button" 
                                        className="remove-section-btn"
                                        onClick={() => removeBodySection(index)}
                                    >
                                        ❌ Supprimer
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
                            {errors[`body_${index}`] && <div className="error-message">{errors[`body_${index}`]}</div>}
                            
                            <div className="body-images">
                                <h4>Images de la section</h4>
                                {section.images.map((url, imgIndex) => (
                                    <div key={imgIndex} className="image-input-group">
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
                                            ❌
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

                <div className="form-group">
                    <textarea name="firstContact" placeholder="Premier contact" value={form.firstContact} onChange={handleChange} />
                </div>
                
                <div className="form-group">
                    <textarea name="conclusion" placeholder="Conclusion" value={form.conclusion} onChange={handleChange} />
                </div>

                <h4>Thèmes</h4>
                <div className="theme-select">
                    {themes.map((theme) => (
                        <label key={theme._id} className="theme-select-item" style={{ backgroundColor: theme.color }}>
                            <input
                                type="checkbox"
                                checked={form.themes.includes(theme._id)}
                                onChange={() => handleThemeToggle(theme._id)}
                            />
                            {theme.name}
                        </label>
                    ))}
                </div>

                <div className="form-actions">
                    <button 
                        type="button" 
                        className="draft-btn"
                        onClick={saveAsDraft}
                    >
                        💾 Enregistrer comme brouillon
                    </button>
                    <button type="submit" className="publish-btn">&#x2714; Publier l'article</button>
                </div>
            </form>
        </div>
    );
};

export default AdminCreatePost;
