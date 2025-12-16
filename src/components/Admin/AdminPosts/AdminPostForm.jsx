import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TriangleAlert } from "lucide-react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ArticlePreview from "../AdminPreview";
import "../style.scss";
import "./style.scss";

// Custom Image Blot pour gérer la taille des images
const BaseImage = Quill.import('formats/image');

class ImageBlot extends BaseImage {
    static create(value) {
        let node;
        if (typeof value === 'string') {
            node = super.create(value);
        } else {
            node = super.create(value.url);
            if (value.width) {
                node.setAttribute('width', value.width);
                node.style.width = value.width.endsWith('%') ? value.width : `${value.width}px`;
            }
            if (value.height) {
                node.setAttribute('height', value.height);
                node.style.height = value.height.endsWith('%') ? value.height : `${value.height}px`;
            }
        }
        return node;
    }

    static value(node) {
        const width = node.getAttribute('width');
        const height = node.getAttribute('height');
        return {
            url: node.getAttribute('src'),
            width: width,
            height: height
        };
    }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot, true);

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
        paragraphs: [{
            text: "",
            images: [],
            generalCaption: "",
            imagePosition: "bottom"
        }]
    }],
};

// Fonction utilitaire pour normaliser le corps de l'article (migration ancien format -> nouveau format)
const normalizeBody = (body) => {
    if (!body || !Array.isArray(body)) return defaultForm.body;
    
    return body.map(section => {
        // Si la section a déjà des paragraphes (nouvelle structure)
        if (section.paragraphs && Array.isArray(section.paragraphs)) {
            return {
                ...section,
                paragraphs: section.paragraphs.map(p => ({
                    ...p,
                    imagePosition: p.imagePosition || "bottom",
                    images: (p.images || []).map(img => 
                        typeof img === "string" ? { url: img, caption: "" } : { url: img.url || "", caption: img.caption || "" }
                    )
                }))
            };
        }
        
        // Sinon conversion de l'ancienne structure (1 section = 1 paragraphe)
        return {
            subtitle: section.subtitle || "",
            paragraphs: [{
                text: section.text || "",
                generalCaption: section.generalCaption || "",
                imagePosition: "bottom",
                images: (section.images || []).map(img => 
                    typeof img === "string" ? { url: img, caption: "" } : { url: img.url || "", caption: img.caption || "" }
                )
            }]
        };
    });
};

// Fonction pour traiter les données initiales
const processInitialData = (data) => {
    if (!data) return defaultForm;
    
    const themeIds = data.themes?.map((t) => (typeof t === "object" ? t._id : t)) || [];
    
    return {
        ...defaultForm,
        ...data,
        themes: themeIds,
        body: normalizeBody(data.body)
    };
};

const AdminPostForm = ({ initialData = null, onSubmit, mode = "create" }) => {
    const navigate = useNavigate();
    const themes = useSelector((state) => state.themes);
    const [form, setForm] = useState(() => processInitialData(initialData));
    const [errors, setErrors] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    // Mode split automatique activé pour tous les champs ReactQuill

    // Configuration de ReactQuill
    const quillModules = useMemo(() => ({
        toolbar: {
            container: [
                ['bold', 'italic', 'underline'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: function() {
                    const url = prompt("Veuillez entrer l'URL de l'image (Cloudinary) :");
                    if (url) {
                        const width = prompt("Largeur (optionnel, ex: 300, 50%) :");
                        const height = prompt("Hauteur (optionnel, ex: 200, auto) :");
                        
                        const value = {
                            url,
                            width: width || null,
                            height: height || null
                        };
                        
                        const range = this.quill.getSelection();
                        this.quill.insertEmbed(range.index, 'image', value);
                    }
                }
            }
        }
    }), []);

    const quillFormats = [
        'bold', 'italic', 'underline',
        'blockquote', 'code-block',
        'list', 'bullet',
        'link',
        'image'
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
            setForm(processInitialData(initialData));
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

        form.body.forEach((section, sIndex) => {
            section.paragraphs.forEach((para, pIndex) => {
                if (!para.text?.trim() && (!para.images || para.images.length === 0)) {
                    newErrors[`body_${sIndex}_para_${pIndex}`] = "Le paragraphe doit contenir du texte ou des images";
                }
            });
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

    const handleSectionChange = (index, field, value) => {
        const updatedBody = [...form.body];
        updatedBody[index][field] = value;
        setForm({ ...form, body: updatedBody });
    };

    const handleParagraphChange = (sectionIndex, paragraphIndex, field, value) => {
        const updatedBody = form.body.map((section, sIdx) => {
            if (sIdx !== sectionIndex) return section;
            return {
                ...section,
                paragraphs: section.paragraphs.map((para, pIdx) => {
                    if (pIdx !== paragraphIndex) return para;
                    return { ...para, [field]: value };
                })
            };
        });
        setForm({ ...form, body: updatedBody });

        if (errors[`body_${sectionIndex}_para_${paragraphIndex}`]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`body_${sectionIndex}_para_${paragraphIndex}`];
                return newErrors;
            });
        }
    };

    const handleImageChange = (sectionIndex, paragraphIndex, imageIndex, field, value) => {
        const updatedBody = [...form.body];
        const para = updatedBody[sectionIndex].paragraphs[paragraphIndex];

        if (!para.images[imageIndex] || typeof para.images[imageIndex] === 'string') {
            para.images[imageIndex] = { url: "", caption: "" };
        }

        if (field === 'url') {
            para.images[imageIndex].url = value;
        } else if (field === 'caption') {
            para.images[imageIndex].caption = value;
        }

        setForm({ ...form, body: updatedBody });
    };

    const addImageField = (sectionIndex, paragraphIndex) => {
        const updatedBody = [...form.body];
        updatedBody[sectionIndex].paragraphs[paragraphIndex].images.push({ url: "", caption: "" });
        setForm({ ...form, body: updatedBody });
    };

    const removeImageField = (sectionIndex, paragraphIndex, imageIndex) => {
        const updatedBody = [...form.body];
        updatedBody[sectionIndex].paragraphs[paragraphIndex].images.splice(imageIndex, 1);
        setForm({ ...form, body: updatedBody });
    };

    const addBodySection = () => {
        setForm((prev) => ({
            ...prev,
            body: [...prev.body, {
                subtitle: "",
                paragraphs: [{
                    text: "",
                    images: [],
                    generalCaption: "",
                    imagePosition: "bottom"
                }]
            }]
        }));
    };

    const removeBodySection = (index) => {
        if (form.body.length > 1) {
            const updated = [...form.body];
            updated.splice(index, 1);
            setForm({ ...form, body: updated });
            // Cleanup errors
            // Note: simple error cleanup might miss nested keys but it's acceptable here
        }
    };

    const addParagraph = (sectionIndex) => {
        const updatedBody = [...form.body];
        updatedBody[sectionIndex].paragraphs.push({
            text: "",
            images: [],
            generalCaption: "",
            imagePosition: "bottom"
        });
        setForm({ ...form, body: updatedBody });
    };

    const removeParagraph = (sectionIndex, paragraphIndex) => {
        const updatedBody = [...form.body];
        if (updatedBody[sectionIndex].paragraphs.length > 1) {
            updatedBody[sectionIndex].paragraphs.splice(paragraphIndex, 1);
            setForm({ ...form, body: updatedBody });
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
                        <div key={index} className="form-section">
                            <div className="section-header">
                                <span className="section-number">Section {index + 1}</span>
                                {form.body.length > 1 && (
                                    <button
                                        type="button"
                                        className="remove-section-btn"
                                        onClick={() => removeBodySection(index)}
                                    >
                                        ❌ Supprimer la section
                                    </button>
                                )}
                            </div>

                            <input
                                placeholder="Sous-titre de la section"
                                value={section.subtitle}
                                onChange={(e) => handleSectionChange(index, "subtitle", e.target.value)}
                                className="section-subtitle-input"
                            />

                            <div className="section-paragraphs">
                                {section.paragraphs.map((paragraph, pIndex) => (
                                    <div key={pIndex} className={`paragraph-container ${errors[`body_${index}_para_${pIndex}`] ? "error-section" : ""}`}>
                                        <div className="paragraph-header">
                                            <span className="paragraph-number">Paragraphe {pIndex + 1}</span>
                                            {errors[`body_${index}_para_${pIndex}`] && (
                                                <div className="error-message">
                                                    <TriangleAlert size={15} /> <p>{errors[`body_${index}_para_${pIndex}`]}</p>
                                                </div>
                                            )}
                                            {section.paragraphs.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="remove-paragraph-btn"
                                                    onClick={() => removeParagraph(index, pIndex)}
                                                >
                                                    🗑️
                                                </button>
                                            )}
                                        </div>

                                        <div className="field-container split-mode">
                                            <ReactQuill
                                                value={paragraph.text}
                                                onChange={(value) => handleParagraphChange(index, pIndex, "text", value)}
                                                modules={quillModules}
                                                formats={quillFormats}
                                                placeholder="Texte du paragraphe"
                                            />
                                            <div className="live-preview">
                                                <h4>👁️ Aperçu</h4>
                                                <div className="field-preview">
                                                    <div dangerouslySetInnerHTML={{ __html: paragraph.text || "Aucun contenu" }} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="body-images">
                                            <div className="images-header-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                <h4 style={{ margin: 0 }}>🖼️ Images du paragraphe</h4>
                                                
                                                <div className="image-position-selector">
                                                    <label style={{ marginRight: '0.5rem', fontSize: '0.9rem' }}>Position :</label>
                                                    <select
                                                        value={paragraph.imagePosition || "bottom"}
                                                        onChange={(e) => handleParagraphChange(index, pIndex, "imagePosition", e.target.value)}
                                                        style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                                    >
                                                        <option value="bottom">Bas (défaut)</option>
                                                        <option value="top">Haut</option>
                                                        <option value="left">Gauche</option>
                                                        <option value="right">Droite</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Légende générale pour toutes les images du paragraphe */}
                                            <div className="general-caption-container">
                                                <label>📝 Légende générale (optionnelle) :</label>
                                                <input
                                                    type="text"
                                                    placeholder="Légende pour le groupe d'images..."
                                                    value={paragraph.generalCaption || ""}
                                                    onChange={(e) => handleParagraphChange(index, pIndex, "generalCaption", e.target.value)}
                                                    className="general-caption-input"
                                                />
                                            </div>

                                            {/* Images individuelles */}
                                            {paragraph.images.map((img, imgIndex) => (
                                                <div key={imgIndex} className="image-input-container">
                                                    <div className="image-body-container">
                                                        <div className="image-url-container">
                                                            <label>🔗 URL #{imgIndex + 1} :</label>
                                                            <input
                                                                type="text"
                                                                placeholder={`https://res.cloudinary.com/...`}
                                                                value={getImageUrl(img)}
                                                                onChange={(e) => handleImageChange(index, pIndex, imgIndex, 'url', e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="image-caption-container">
                                                            <label>🏷️ Légende :</label>
                                                            <input
                                                                type="text"
                                                                placeholder={`Légende spécifique...`}
                                                                value={getImageCaption(img)}
                                                                onChange={(e) => handleImageChange(index, pIndex, imgIndex, 'caption', e.target.value)}
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
                                                                maxWidth: '150px',
                                                                maxHeight: '100px',
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
                                                        onClick={() => removeImageField(index, pIndex, imgIndex)}
                                                        title="Supprimer l'image"
                                                    >
                                                        ❌
                                                    </button>
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                className="add-image-btn"
                                                onClick={() => addImageField(index, pIndex)}
                                            >
                                                ➕ Ajouter une image
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" className="add-paragraph-btn" onClick={() => addParagraph(index)}>
                                    ➕ Ajouter un paragraphe
                                </button>
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