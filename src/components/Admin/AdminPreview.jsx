import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePost, getPosts } from "../../actions";
import "./style.scss";

const ArticlePreview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const themes = useSelector((state) => state.themes);
    const allPosts = useSelector((state) => state.posts);
    
    // Trouver le post correspondant à l'ID
    const post = allPosts.find(post => post._id === id);

    // Si le post n'existe pas dans le store
    if (!post) {
        return <div className="preview-not-found">Article non trouvé</div>;
    }

    // Filtrer les thèmes du post
    const postThemes = themes.filter(theme => 
        post.themes?.includes(theme._id)
    );

    return (
        <div className="article-preview">
            <div className="preview-admin-bar">
                <Link to="/admin/posts" className="back-btn">&#8592; Retour à la liste</Link>
                
                <div className="preview-status">
                    <span className={`status-indicator ${post.posted ? 'published' : 'draft'}`}>
                        {post.posted ? 'Article publié' : 'Brouillon - Non publié'}
                    </span>
                </div>
                
                <div className="preview-actions">
                    <Link to={`/admin/posts/edit/${id}`} className="edit-btn">
                        ✏️ Modifier
                    </Link>
                </div>
            </div>
            
            <div className="preview-content">
                <div className="preview-header">
                    <h1>{post.title}</h1>
                    <h2>{post.subtitle}</h2>
                    
                    <div className="meta-info">
                        <div className="author">Par {post.author}</div>
                        <div className="reading-time">{post.readingTime} de lecture</div>
                        <div className="date">
                            {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                    
                    <div className="themes">
                        {postThemes.map(theme => (
                            <span 
                                key={theme._id} 
                                className="theme-tag"
                                style={{ backgroundColor: theme.color }}
                            >
                                {theme.name}
                            </span>
                        ))}
                    </div>
                </div>
                
                {post.mainImage && (
                    <div className="featured-image">
                        <img src={post.mainImage} alt={post.title} />
                    </div>
                )}
                
                <div className="article-sections">
                    <div className="introduction">
                        <h3>Introduction</h3>
                        <p>{post.introduction}</p>
                    </div>
                    
                    <div className="context">
                        <h3>Contexte</h3>
                        <p>{post.context}</p>
                    </div>
                    
                    {post.body.map((section, index) => (
                        <div key={index} className="article-sections">
                            <h3>Section {index + 1}</h3>
                            {section.subtitle && <h3>{section.subtitle}</h3>}
                            <div className="section-content">
                                <p>{section.text}</p>
                                
                                {section.images?.length > 0 && (
                                    <div className="section-images">
                                        {section.images.map((image, imgIndex) => (
                                            <img key={imgIndex} src={image} alt={`Image ${imgIndex + 1}`} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    <div className="first-contact">
                        <h3>Premier contact</h3>
                        <p>{post.firstContact}</p>
                    </div>
                    
                    <div className="conclusion">
                        <h3>Conclusion</h3>
                        <p>{post.conclusion}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticlePreview;