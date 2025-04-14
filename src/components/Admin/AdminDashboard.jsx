import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const AdminDashboard = () => {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/admin");
    }
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard-title">Espace d'administration</h1>
      <div className="admin-dashboard-menu">
        <Link to="/admin/posts" className="admin-dashboard-link">📝 Gérer les articles</Link>
        <Link to="/admin/comments" className="admin-dashboard-link">💬 Gérer les commentaires</Link>
        <Link to="/admin/themes" className="admin-dashboard-link">🎨 Gérer les thèmes</Link>
        <Link to="/" className="admin-dashboard-link">⬅ Retour au site</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
