import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchComments, deleteComment, updateComment } from '../../../actions';
import './style.scss';

const AdminComments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const posts = useSelector((state) => state.posts);
  const [selectedPostId, setSelectedPostId] = useState('all');
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    // Vérifier l'authentification
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/admin");
    }

    // Charger tous les commentaires au démarrage
    dispatch(fetchComments());
  }, [dispatch]);

  const handlePostChange = (e) => {
    const postId = e.target.value;
    setSelectedPostId(postId);

    if (postId === 'all') {
      dispatch(fetchComments());
    } else {
      dispatch(fetchComments(postId));
    }
  };

  const handleDeleteComment = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      dispatch(deleteComment(id));
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment._id);
    setEditContent(comment.content);
  };

  const handleSaveEdit = () => {
    if (editingComment && editContent.trim()) {
      dispatch(updateComment(editingComment, editContent));
      setEditingComment(null);
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filtrer les commentaires par recherche
  // Filtrer les commentaires par recherche
  const filteredComments = comments && comments.length
    ? comments.filter(comment =>
      comment.pseudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  // Trier les commentaires
  const sortedComments = [...filteredComments].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else if (sortOrder === 'oldest') {
      return dateA - dateB;
    }
    return 0;
  });

  // Trouver le titre du post pour chaque commentaire
  const getPostTitle = (postId) => {
    const post = posts.find(p => p._id === postId);
    return post ? post.title : 'Article inconnu';
  };

  // Formater la date
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="admin-comments">
      <Link to="/admin/dashboard" className="admin-return">&#8592; Retour</Link>
    
      <h2 className="admin-section-title">Gestion des commentaires</h2>

      <div className="admin-toolbar">
        <div className="filter-section">
          <label htmlFor="post-filter">Filtrer par article :</label>
          <select
            id="post-filter"
            value={selectedPostId}
            onChange={handlePostChange}
            className="admin-select"
          >
            <option value="all">Tous les articles</option>
            {posts.map(post => (
              <option key={post._id} value={post._id}>
                {post.title}
              </option>
            ))}
          </select>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="Rechercher un commentaire..."
            value={searchTerm}
            onChange={handleSearch}
            className="admin-search"
          />
        </div>

        <div className="sort-section">
          <label htmlFor="sort-order">Trier par :</label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={handleSortChange}
            className="admin-select"
          >
            <option value="newest">Plus récents</option>
            <option value="oldest">Plus anciens</option>
          </select>
        </div>
      </div>

      <div className="comments-count">
        {sortedComments.length} commentaire(s) trouvé(s)
      </div>

      {sortedComments.length === 0 ? (
        <div className="no-comments">
          Aucun commentaire trouvé.
        </div>
      ) : (
        <div className="comments-list">
          {sortedComments.map(comment => (
            <div key={comment._id} className="comment-item">
              <div className="comment-header">
                <div className="comment-meta">
                  <span className="comment-author">{comment.pseudo}</span>
                  <span className="comment-date">{formatDate(comment.createdAt)}</span>
                </div>
                <div className="comment-post">
                  Article : <span>{getPostTitle(comment.postId)}</span>
                </div>
              </div>

              {editingComment === comment._id ? (
                <div className="comment-edit">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="comment-edit-textarea"
                  />
                  <div className="comment-edit-actions">
                    <button
                      onClick={handleSaveEdit}
                      className="save-btn"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="cancel-btn"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="comment-content">
                  {comment.content}
                </div>
              )}

              {comment.replyTo && (
                <div className="comment-reply-info">
                  En réponse à un autre commentaire
                </div>
              )}

              <div className="comment-actions">
                {editingComment !== comment._id && (
                  <>
                    <button
                      onClick={() => handleEditComment(comment)}
                      className="edit-btn"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="delete-btn"
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminComments;
