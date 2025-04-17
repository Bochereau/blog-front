import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

const AdminCreatePost = () => {
    const navigate = useNavigate();
    const themes = useSelector((state) => state.themes); // récupérés dans ton store

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
        posted: false,
        body: [
            {
                subtitle: "",
                text: "",
                images: [],
            },
        ],
    });

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
        updatedBody[sectionIndex].images[imageIndex] = value;
        setForm({ ...form, body: updatedBody });
    };

    const addImageField = (sectionIndex) => {
        const updatedBody = [...form.body];
        updatedBody[sectionIndex].images.push("");
        setForm({ ...form, body: updatedBody });
    };

    const addBodySection = () => {
        setForm({
            ...form,
            body: [...form.body, { subtitle: "", text: "", images: [] }],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            alert("Article créé !");
            navigate("/admin/posts");
        } else {
            alert("Erreur lors de la création.");
        }
    };

    return (
        <div className="admin-create">
            <Link to="/admin/posts" className="admin-return">&#8592; Retour</Link>
        
            <h2>Créer un article</h2>
            <form onSubmit={handleSubmit}>
                <div className="admin-create-short-fields">
                    <input name="title" placeholder="Titre" value={form.title} onChange={handleChange} />
                    <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} />
                    <input name="author" placeholder="Auteur" value={form.author} onChange={handleChange} />
                    <input name="readingTime" placeholder="Temps de lecture" value={form.readingTime} onChange={handleChange} />
                    <input name="subtitle" placeholder="Sous-titre" value={form.subtitle} onChange={handleChange} />
                </div>

                <input name="mainImage" placeholder="Image principale (URL Cloudinary)" value={form.mainImage} onChange={handleChange} />

                <textarea name="introduction" placeholder="Introduction" value={form.introduction} onChange={handleChange} />
                <textarea name="context" placeholder="Contexte" value={form.context} onChange={handleChange} />

                <div className="admin-create-body">
                    <h3>Corps de l'article</h3>
                    {form.body.map((section, index) => (
                        <div key={index} className="form-section">
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
                                {section.images.map((url, imgIndex) => (
                                    <input
                                        key={imgIndex}
                                        type="text"
                                        placeholder={`Image URL #${imgIndex + 1}`}
                                        value={url}
                                        onChange={(e) =>
                                            handleImageChange(index, imgIndex, e.target.value)
                                        }
                                    />
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

                <button type="submit" className="submit-btn">Créer l'article</button>
            </form>
        </div>
    );
};

export default AdminCreatePost;
