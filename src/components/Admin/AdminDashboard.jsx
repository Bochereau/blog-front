import React from 'react';
import { Link } from 'react-router-dom';
import './admin.scss';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard-title">Espace d'administration</h1>
      <div className="admin-dashboard-menu">
        <Link to="/admin/posts" className="admin-dashboard-link">📝 Gérer les articles</Link>
        <Link to="/admin/comments" className="admin-dashboard-link">💬 Gérer les commentaires</Link>
        <Link to="/" className="admin-dashboard-link">⬅ Retour au site</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
