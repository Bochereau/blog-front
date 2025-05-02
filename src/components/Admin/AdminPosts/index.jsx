import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Pencil, Trash2, EyeOff, Eye } from "lucide-react";
import classNames from "classnames";
import { deletePost, updatePostStatus, getPosts } from "../../../actions";
import "./style.scss";

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
                            <td>
                                <Link to={`/admin/posts/edit/${post._id}`}>
                                    <button className="admin-posts-btn orange" title="Modifier">
                                        <Pencil size={16} /> Modifier
                                    </button>
                                </Link>

                                <button
                                    className={classNames("admin-posts-btn", {
                                        green: !post.isPublished,
                                        gray: post.isPublished,
                                    })} onClick={() => togglePostStatus(post._id, post.isPublished)}
                                    title={post.isPublished ? "Retirer de la publication" : "Publier"}
                                >
                                    {post.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                                    {post.isPublished ? "Dépublier" : "Publier"}
                                </button>

                                <button
                                    className="admin-posts-btn red"
                                    onClick={() => handleDeletePost(post._id)}
                                    title="Supprimer"
                                >
                                    <Trash2 size={16} /> Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPosts;
