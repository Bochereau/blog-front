import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme, addTheme, updateTheme, deleteTheme } from '../../actions';

const AdminThemes = () => {
  const dispatch = useDispatch();
  const themes = useSelector((state) => state.themes);
  const [newTheme, setNewTheme] = useState({ name: '', color: '#000000' });
  const [editThemeId, setEditThemeId] = useState(null);
  const [editedTheme, setEditedTheme] = useState({ name: '', color: '#000000' });

  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);

  const handleAdd = () => {
    if (!newTheme.name.trim()) return;
    dispatch(addTheme(newTheme));
    setNewTheme({ name: '', color: '#000000' });
  };

  const handleEdit = (theme) => {
    setEditThemeId(theme._id);
    setEditedTheme({ name: theme.name, color: theme.color });
  };

  const handleCancel = () => {
    setEditThemeId(null);
    setEditedTheme({ name: '', color: '#000000' });
  };

  const handleValidate = (theme) => {
    dispatch(updateTheme({ ...theme, ...editedTheme }));
    setEditThemeId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteTheme(id));
  };

  return (
    <div className="admin-themes">
      <h2 className="admin-themes-title">Gestion des Thèmes</h2>

      <div className="admin-themes-form">
        <input
          type="text"
          placeholder="Nom"
          value={newTheme.name}
          onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
        />
        <input
          type="color"
          value={newTheme.color}
          onChange={(e) => setNewTheme({ ...newTheme, color: e.target.value })}
        />
        <button onClick={handleAdd} className="admin-themes-add">Ajouter</button>
      </div>

      <div className="admin-themes-list">
        {themes.map((theme) => (
          <div className="theme-item" key={theme._id}>
            {editThemeId === theme._id ? (
              <>
                <input
                  type="text"
                  value={editedTheme.name}
                  onChange={(e) => setEditedTheme({ ...editedTheme, name: e.target.value })}
                />
                <input
                  type="color"
                  value={editedTheme.color}
                  onChange={(e) => setEditedTheme({ ...editedTheme, color: e.target.value })}
                />
                <div className="theme-item-actions">
                    <button onClick={() => handleValidate(theme)}>Valider</button>
                    <button onClick={handleCancel}>Annuler</button>
                </div>
              </>
            ) : (
              <>
                <span className="theme-item-name">{theme.name}</span>
                <span className="theme-item-color" style={{ backgroundColor: theme.color }}></span>
                <div className="theme-item-actions">
                  <button onClick={() => handleEdit(theme)}>Modifier</button>
                  <button onClick={() => handleDelete(theme._id)}>Supprimer</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminThemes;
