import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const VALID_USERNAME = "BBLimit";
const VALID_PASSWORD = import.meta.env.VITE_ADMIN_SECRET;

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      localStorage.setItem("isAdminAuthenticated", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Identifiant ou mot de passe incorrect");
    }
  };

  return (
    <div className="admin-login">
      <h2>Connexion Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default AdminLogin;