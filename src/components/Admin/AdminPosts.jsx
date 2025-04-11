import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AdminPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.adminPosts.list);

    useEffect(() => {
        dispatch({ type: 'ADMIN_GET_ALL_POSTS' });
    }, []);

    return (
        <div className="admin-posts">
            <h1>Gestion des articles</h1>
            <Link to="/admin/posts/new">➕ Nouvel article</Link>
            {posts.map(post => (
                <div key={post._id} className="admin-post-card">
                    <h3>{post.title}</h3>
                    <p><em>{post.author}</em> – {new Date(post.createdAt).toLocaleDateString()}</p>
                    <div>
                        <Link to={`/admin/posts/edit/${post._id}`}>✏ Modifier</Link>
                        <button onClick={() => dispatch({ type: 'ADMIN_DELETE_POST', payload: post._id })}>
                            🗑 Supprimer
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default AdminPosts;