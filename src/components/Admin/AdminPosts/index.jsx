import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Pencil, Trash2, EyeOff, Eye } from "lucide-react";
import classNames from "classnames";
import { deletePost, updatePostStatus, getPosts } from "../../../actions";
import "../style.scss";
import "./style.scss";
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import CheckIcon from '../../../assets/icons/check.svg';
import CloseIcon from '../../../assets/icons/close.svg';

const AdminPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const light = useSelector((state) => state.lightTheme);
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState("all");

    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());

        if (viewMode === "all") return matchesSearch;
        if (viewMode === "published") return matchesSearch && post.isPublished;
        if (viewMode === "drafts") return matchesSearch && !post.isPublished;

        return matchesSearch;
    });

    const togglePostStatus = async (postId, currentStatus) => {
        dispatch(updatePostStatus(postId, currentStatus));
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;
        dispatch(deletePost(postId));
    };

    return (
        <div className={classNames("admin-posts", { "bk-p--light": light, "bk-p--dark": !light })}>
            <Link to="/admin/dashboard" className="admin-return">&#8592; Retour</Link>

            <h2 className="admin-page-title">Gestion des articles</h2>

            <div className="admin-posts-controls">
                <input
                    type="text"
                    placeholder="Rechercher un article"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="admin-posts-search"
                />
                <Link to="/admin/posts/create" className="admin-dashboard-link">Créer un article</Link>
            </div>

            <div className="admin-posts-container">
                <table className="admin-posts-table">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Auteur</th>
                            <th>Date de création</th>
                            <th>Date de publication</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.map((post) => (
                            <tr key={post._id}>
                                <td>{post.title}</td>
                                <td>{post.author}</td>
                                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                <td>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</td>
                                <td className="admin-posts-actions">
                                    <Link to={`/admin/posts/edit/${post._id}`}>
                                        <button className="admin-posts-btn edit" title="Modifier">
                                            <img src={EditIcon} alt="" />
                                            Modifier
                                        </button>
                                    </Link>

                                    <button
                                        className={classNames("admin-posts-btn", {
                                            validate: !post.isPublished,
                                            unpublish: post.isPublished,
                                        })} onClick={() => togglePostStatus(post._id, post.isPublished)}
                                        title={post.isPublished ? "Retirer de la publication" : "Publier"}
                                    >
                                        {post.isPublished ? <img src={CloseIcon} alt="" /> : <img src={CheckIcon} alt="" />}
                                        {post.isPublished ? "Dépublier" : "Publier"}
                                    </button>

                                    <button
                                        className="admin-posts-btn delete"
                                        onClick={() => handleDeletePost(post._id)}
                                        title="Supprimer"
                                    >
                                        <img src={DeleteIcon} alt="" />
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="admin-posts-cards">
                    {filteredPosts.map((post) => (
                        <div key={post._id} className="post-card">
                            <div className="post-card-header">
                                <h3 className="post-card-title">{post.title}</h3>
                                <div className="post-card-status">
                                    {post.isPublished ? (
                                        <span className="status-published">Publié</span>
                                    ) : (
                                        <span className="status-draft">Brouillon</span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="post-card-meta">
                                <div className="post-card-author">
                                    <strong>Auteur:</strong> {post.author}
                                </div>
                                <div className="post-card-dates">
                                    <div><strong>Créé:</strong> {new Date(post.createdAt).toLocaleDateString()}</div>
                                    {post.publishedAt && (
                                        <div><strong>Publié:</strong> {new Date(post.publishedAt).toLocaleDateString()}</div>
                                    )}
                                </div>
                            </div>

                            <div className="post-card-actions">
                                <Link to={`/admin/posts/edit/${post._id}`}>
                                    <button className="admin-posts-btn edit" title="Modifier">
                                        <img src={EditIcon} alt="" />
                                        Modifier
                                    </button>
                                </Link>

                                <button
                                    className={classNames("admin-posts-btn", {
                                        validate: !post.isPublished,
                                        unpublish: post.isPublished,
                                    })} onClick={() => togglePostStatus(post._id, post.isPublished)}
                                    title={post.isPublished ? "Retirer de la publication" : "Publier"}
                                >
                                    {post.isPublished ? <img src={CloseIcon} alt="" /> : <img src={CheckIcon} alt="" />}
                                    {post.isPublished ? "Dépublier" : "Publier"}
                                </button>

                                <button
                                    className="admin-posts-btn delete"
                                    onClick={() => handleDeletePost(post._id)}
                                    title="Supprimer"
                                >
                                    <img src={DeleteIcon} alt="" />
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPosts;
