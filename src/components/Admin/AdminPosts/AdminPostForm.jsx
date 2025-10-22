import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TriangleAlert } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ArticlePreview from "../AdminPreview";
import "../style.scss";
import "./style.scss";

const defaultForm = {
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
    body: [{
        subtitle: "",
        text: "",
        images: [],
        generalCaption: ""
    }],
};

const AdminPostForm = ({ initialData = null, onSubmit, mode = "create" }) => {
    const navigate = useNavigate();
    const themes = useSelector((state) => state.themes);
    const [form, setForm] = useState(initialData || defaultForm);
    const [errors, setErrors] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    // Mode split automatique activé pour tous les champs ReactQuill

    // Configuration de ReactQuill
    const quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ]
    };

    const quillFormats = [
        'bold', 'italic', 'underline',
        'blockquote', 'code-block',
        'list', 'bullet',
        'link'
    ];

    // Plus besoin de fonctions de toggle, mode split automatique

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
        if (isAuthenticated !== "true") {
            navigate("/admin");
        }
    }, [navigate]);

    useEffect(() => {
        if (initialData) {
            const themeIds = initialData.themes?.map((t) => (typeof t === "object" ? t._id : t)) || [];
            setForm({
                ...defaultForm,
                ...initialData,
                themes: themeIds,
                body: initialData.body?.length
                    ? initialData.body.map((s) => ({
                        ...s,
                        images: (s.images || []).map(img =>
                            typeof img === "string" ? { url: img, caption: "" } : {
                                url: img.url || "",
                                caption: img.caption || ""
                            }
                        ),
                        generalCaption: s.generalCaption || ""
                    }))
                    : defaultForm.body,
            });
        }
    }, [initialData]);

    useEffect(() => {
        if (form.title && !formSubmitted) {
            const generatedSlug = form.title
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-');
            setForm(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [form.title, formSubmitted]);

    useEffect(() => {
        validateForm();
    }, []);

    const validateForm = () => {
        const requiredMessages = {
            title: "Le titre est requis",
            slug: "Le slug est requis",
            author: "L'auteur est requis",
            readingTime: "Le temps de lecture est requis",
            subtitle: "Le sous-titre est requis",
            introduction: "L'introduction est requise",
            conclusion: "La conclusion est requise",
        };

        const newErrors = {};
        Object.entries(requiredMessages).forEach(([field, message]) => {
            if (!form[field]?.trim()) newErrors[field] = message;
        });

        form.body.forEach((section, index) => {
            if (!section.text?.trim()) {
                newErrors[`body_${index}`] = "La section doit contenir du texte";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));

        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };

            const requiredFields = [
                "title",
                "slug",
                "author",
                "subtitle",
                "introduction",
                "conclusion"
            ];

            if (requiredFields.includes(name)) {
                if (!value.trim()) {
                    updatedErrors[name] = "Ce champ est requis";
                } else {
                    delete updatedErrors[name];
                }
            }

            return updatedErrors;
        });
    };

    const handleThemeToggle = (themeId) => {
        const updated = form.themes.includes(themeId)
            ? form.themes.filter((id) => id !== themeId)
            : [...form.themes, themeId];
        setForm((prev) => ({ ...prev, themes: updated }));
    };

    const handleBodyChange = (index, field, value) => {
        const updatedBody = [...form.body];
        updatedBody[index][field] = value;
        setForm({ ...form, body: updatedBody });

        if (errors[`body_${index}`]) {
            setErrors({ ...errors, [`body_${index}`]: null });
        }
    };

    const handleImageChange = (sectionIndex, imageIndex, field, value) => {
        const updated = [...form.body];

        if (!updated[sectionIndex].images[imageIndex] || typeof updated[sectionIndex].images[imageIndex] === 'string') {
            updated[sectionIndex].images[imageIndex] = { url: "", caption: "" };
        }

        if (field === 'url') {
            updated[sectionIndex].images[imageIndex].url = value;
        } else if (field === 'caption') {
            updated[sectionIndex].images[imageIndex].caption = value;
        }

        setForm({ ...form, body: updated });
    };

    const addImageField = (sectionIndex) => {
        const updated = [...form.body];
        updated[sectionIndex].images.push({ url: "", caption: "" });
        setForm({ ...form, body: updated });
    };

    const removeImageField = (sectionIndex, imageIndex) => {
        const updated = [...form.body];
        updated[sectionIndex].images.splice(imageIndex, 1);
        setForm({ ...form, body: updated });
    };

    const addBodySection = () => {
        setForm((prev) => ({
            ...prev,
            body: [...prev.body, {
                subtitle: "",
                text: "",
                images: [],
                generalCaption: ""
            }]
        }));
    };

    const removeBodySection = (index) => {
        if (form.body.length > 1) {
            const updated = [...form.body];
            updated.splice(index, 1);
            setForm({ ...form, body: updated });
            const updatedErrors = { ...errors };
            delete updatedErrors[`body_${index}`];
            setErrors(updatedErrors);
        }
    };

    const handleSave = () => {
        setFormSubmitted(true);
        onSubmit({ ...form });
    };

    // Fonction pour obtenir l'URL d'une image (compatibilité ancien/nouveau format)
    const getImageUrl = (img) => {
        return typeof img === 'string' ? img : img.url || '';
    };

    // Fonction pour obtenir la légende d'une image
    const getImageCaption = (img) => {
        return typeof img === 'string' ? '' : img.caption || '';
    };

    return (
        <div className={`admin-${mode} admin-edit`}>
            <Link to="/admin/posts" className="admin-return">← Retour</Link>
            <h2>{mode === "edit" ? "Modifier" : "Créer"} l'article</h2>

            <div className="form-actions">
                <button type="button" className="preview-btn" onClick={() => setShowPreview(!showPreview)}>👁️ Prévisualiser</button>
                <button type="button" className="draft-btn" onClick={handleSave}>💾 Enregistrer</button>
            </div>

            {showPreview && <ArticlePreview form={form} togglePreview={() => setShowPreview(false)} />}

            <form>
                <div className="admin-edit-short-fields">
                    <div className="form-group">
                        <input
                            name="title"
                            placeholder="Titre"
                            value={form.title}
                            onChange={handleChange}
                            className={errors.title ? "error-input" : ""}
                        />
                        {errors.title && <div className="error-message"><TriangleAlert size={15} /> <p>{errors.title}</p></div>}
                    </div>

                    <div className="form-group">
                        <input
                            name="slug"
                            placeholder="Slug"
                            value={form.slug}
                            onChange={handleChange}
                            className={errors.slug ? "error-input" : ""}
                        />
                        {errors.slug && <div className="error-message"><TriangleAlert size={15} /> <p>{errors.slug}</p></div>}
                    </div>

                    <div className="form-group">
                        <input
                            name="author"
                            placeholder="Auteur"
                            value={form.author}
                            onChange={handleChange}
                            className={errors.author ? "error-input" : ""}
                        />
                        {errors.author && <div className="error-message"><TriangleAlert size={15} /> <p>{errors.author}</p></div>}
                    </div>

                    <div className="form-group">
                        <input
                            name="readingTime"
                            placeholder="Temps de lecture"
                            value={form.readingTime}
                            onChange={handleChange}
                        />
                        {errors.readingTime && <div className="error-message"><TriangleAlert size={15} /> <p>{errors.readingTime}</p></div>}
                    </div>

                    <div className="form-group">
                        <input
                            name="subtitle"
                            placeholder="Sous-titre"
                            value={form.subtitle}
                            onChange={handleChange}
                            className={errors.subtitle ? "error-input" : ""}
                        />
                        {errors.subtitle && <div className="error-message"><TriangleAlert size={15} /> <p>{errors.subtitle}</p></div>}
                    </div>
                </div>

                <div className="form-group">
                    <input
                        name="mainImage"
                        placeholder="Image principale (URL Cloudinary)"
                        value={form.mainImage || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <h3 className="form-group-title">📝 Introduction</h3>
                    <textarea
                        name="introduction"
                        placeholder="Introduction"
                        value={form.introduction || ""}
                        onChange={handleChange}
                        className={errors.introduction ? "error-input" : ""}
                    />
                    {errors.introduction && <div className="error-message"><TriangleAlert size={15} /> <p>{errors.introduction}</p></div>}
                </div>

                <div className="form-group">
                    <h3 className="form-group-title">🌍 Contexte</h3>
                    <textarea
                        name="context"
                        placeholder="Contexte"
                        value={form.context || ""}
                        onChange={handleChange}
                        className={errors.context ? "error-input" : ""}
                    />
                    {errors.context && <div className="error-message"><TriangleAlert size={15} /> <p>{errors.context}</p></div>}
                </div>

                <div className="admin-edit-body">
                    <h3 className="form-group-title">📌 Corps de l'article (sections)</h3>
                    {form.body.map((section, index) => (
                        <div key={index} className={`form-section ${errors[`body_${index}`] ? "error-section" : ""}`}>
                            <div className="section-header">
                                <span className="section-number">Section {index + 1}</span>
                                {errors[`body_${index}`] && <div className="error-message"><TriangleAlert size={15} /> <p>{errors[`body_${index}`]}</p></div>}
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
                            <div className="field-container split-mode">
                                <ReactQuill
                                    value={section.text}
                                    onChange={(value) => handleBodyChange(index, "text", value)}
                                    modules={quillModules}
                                    formats={quillFormats}
                                    placeholder="Texte"
                                />
                                <div className="live-preview">
                                    <h4>👁️ Aperçu en direct</h4>
                                    <div className="field-preview">
                                        <div dangerouslySetInnerHTML={{ __html: section.text || "Aucun contenu" }} />
                                    </div>
                                </div>
                            </div>

                            <div className="body-images">
                                <h4>🖼️ Images de la section</h4>

                                {/* Légende générale pour toutes les images de la section */}
                                <div className="general-caption-container">
                                    <label>📝 Légende générale (optionnelle) :</label>
                                    <input
                                        type="text"
                                        placeholder="Cette légende s'appliquera à toutes les images de cette section. Laissez vide si vous préférez des légendes individuelles."
                                        value={section.generalCaption || ""}
                                        onChange={(e) => handleBodyChange(index, "generalCaption", e.target.value)}
                                        className="general-caption-input"
                                    />
                                </div>

                                {/* Images individuelles */}
                                {section.images.map((img, imgIndex) => (
                                    <div key={imgIndex} className="image-input-container">
                                        <div className="image-body-container">
                                            <div className="image-url-container">
                                                <label>🔗 URL de l'image #{imgIndex + 1} :</label>
                                                <input
                                                    type="text"
                                                    placeholder={`https://res.cloudinary.com/votre-image-${imgIndex + 1}.jpg`}
                                                    value={getImageUrl(img)}
                                                    onChange={(e) => handleImageChange(index, imgIndex, 'url', e.target.value)}
                                                />
                                            </div>

                                            <div className="image-caption-container">
                                                <label>🏷️ Légende individuelle (optionnelle) :</label>
                                                <input
                                                    type="text"
                                                    placeholder={`Légende spécifique pour cette image...`}
                                                    value={getImageCaption(img)}
                                                    onChange={(e) => handleImageChange(index, imgIndex, 'caption', e.target.value)}
                                                    className="image-caption-input"
                                                />
                                            </div>
                                        </div>

                                        {/* Prévisualisation de l'image si URL valide */}
                                        {getImageUrl(img) && getImageUrl(img).startsWith('http') && (
                                            <img
                                                src={getImageUrl(img)}
                                                alt="Aperçu"
                                                style={{
                                                    maxWidth: '200px',
                                                    maxHeight: '150px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px',
                                                    marginTop: '0.3rem',
                                                    border: '1px solid #ddd'
                                                }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        )}

                                        <button
                                            type="button"
                                            className="remove-image-btn"
                                            onClick={() => removeImageField(index, imgIndex)}
                                            title={`Supprimer l'image #${imgIndex + 1}`}
                                        >
                                            ❌ Supprimer l'image
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

                                {/* Indicateur du nombre d'images */}
                                {section.images.length > 0 && (
                                    <div style={{
                                        marginTop: '1rem',
                                        padding: '0.5rem',
                                        backgroundColor: '#e8f5e8',
                                        borderRadius: '4px',
                                        fontSize: '0.9rem',
                                        color: '#2e7d32'
                                    }}>
                                        📊 {section.images.length} image{section.images.length > 1 ? 's' : ''} dans cette section
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <button type="button" className="add-section-btn" onClick={addBodySection}>
                        ➕ Ajouter une section
                    </button>
                </div>

                <div className="form-group">
                    <h3 className="form-group-title">📞 Premier contact</h3>
                    <textarea
                        name="firstContact"
                        placeholder="Premier contact"
                        value={form.firstContact || ""}
                        onChange={handleChange}
                        className={errors.firstContact ? "error-input" : ""}
                    />
                    {errors.firstContact && <div className="error-message"><TriangleAlert size={15} /> <p>{errors.firstContact}</p></div>}
                </div>

                <div className="form-group">
                    <h3 className="form-group-title">✅ Conclusion</h3>
                    <textarea
                        name="conclusion"
                        placeholder="Conclusion"
                        value={form.conclusion || ""}
                        onChange={handleChange}
                        className={errors.conclusion ? "error-input" : ""}
                    />
                    {errors.conclusion && <div className="error-message"><TriangleAlert size={15} /> <p>{errors.conclusion}</p></div>}
                </div>

                <h4>Thèmes</h4>
                <div className="theme-select">
                    {themes.map((theme) => (
                        <label
                            key={theme._id}
                            className={`theme-select-item ${form.themes.includes(theme._id) ? 'selected' : ''}`}
                            style={{ backgroundColor: theme.color, borderColor: theme.color }}
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

                <div className="form-actions">
                    <button type="button" className="preview-btn" onClick={() => setShowPreview(!showPreview)}>👁️ Prévisualiser</button>
                    <button type="button" className="draft-btn" onClick={handleSave}>💾 Enregistrer</button>
                </div>
            </form>
        </div>
    );
};

export default AdminPostForm;