import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getTheme, addTheme, updateTheme, deleteTheme } from '../../../actions';
import "../style.scss";
import "./style.scss";
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import CloseIcon from '../../../assets/icons/close.svg';
import CheckIcon from '../../../assets/icons/check.svg';

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

  const handleSubmit = (e) => {
      e.preventDefault();
      handleAdd();
  };

    return (
        <div className="admin-themes">
            <Link to="/admin/dashboard" className="admin-return">&#8592; Retour</Link>

            <h2 className="admin-page-title">Gestion des Thèmes</h2>

            <form className="admin-themes-form" onSubmit={handleSubmit}>
                <fieldset className="admin-themes-form-fieldset">
                    <div className="form-row">
                        <input
                            id="theme-name"
                            type="text"
                            placeholder="Nom du thème"
                            value={newTheme.name}
                            onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                        />
                        <input
                            id="theme-color"
                            type="color"
                            value={newTheme.color}
                            onChange={(e) => setNewTheme({ ...newTheme, color: e.target.value })}
                        />
                        <div className="form-actions">
                            <button type="submit" className="admin-themes-add">Ajouter</button>
                        </div>
                    </div>
                </fieldset>
            </form>

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
                                    <button onClick={() => handleValidate(theme)} className="icon-btn validate" aria-label="Valider">
                                        <img src={CheckIcon} alt="" />
                                    </button>
                                    <button onClick={handleCancel} className="icon-btn close" aria-label="Annuler">
                                        <img src={CloseIcon} alt="" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="theme-item-header">
                                    <span className="theme-item-name">{theme.name}</span>
                                    <span className="theme-item-color" style={{ backgroundColor: theme.color }}></span>
                                </div>
                                <div className="theme-item-actions">
                                    <button onClick={() => handleEdit(theme)} className="icon-btn edit" aria-label="Modifier">
                                        <img src={EditIcon} alt="" />
                                    </button>
                                    <button onClick={() => handleDelete(theme._id)} className="icon-btn delete" aria-label="Supprimer">
                                        <img src={DeleteIcon} alt="" />
                                    </button>
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
