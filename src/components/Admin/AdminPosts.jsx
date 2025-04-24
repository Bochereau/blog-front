import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./style.scss";

const AdminPosts = () => {
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

            <h2 className="admin-posts-title">Gestion des articles</h2>

            <div className="admin-posts-controls">
                <input
                    type="text"
                    placeholder="Rechercher un article"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="admin-posts-search"
                />
                <Link to="/admin/posts/create" className="admin-dashboard-link">➕ Créer un article</Link>
            </div>

            <table className="admin-posts-table">
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Auteur</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts.map((post) => (
                        <tr key={post._id}>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/admin/posts/edit/${post._id}`}>
                                    <button className="admin-posts-edit"  title="Modifier">✏️</button>
                                </Link>
                                
                                <button
                                    className={`admin-posts-status ${post.isPublished ? 'unpublish' : 'publish'}`}
                                    onClick={() => togglePostStatus(post._id, post.isPublished)}
                                    title={post.isPublished ? "Retirer de la publication" : "Publier"}
                                >
                                    {post.isPublished ? '🔽' : '🔼'}
                                </button>
                                <button onClick={() => handleDeletePost(post._id)} className="admin-posts-delete" title="Supprimer">🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPosts;
