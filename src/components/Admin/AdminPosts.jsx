import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./style.scss";

const AdminPosts = () => {
    const posts = useSelector((state) => state.posts);
    const light = useSelector((state) => state.lightTheme);
    const [search, setSearch] = useState("");

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={classNames("admin-posts", { "bk-p--light": light, "bk-p--dark": !light })}>
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
                                <button className="admin-posts-edit">✏️</button>
                                <button className="admin-posts-delete">🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPosts;
