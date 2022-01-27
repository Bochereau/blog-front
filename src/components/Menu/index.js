import React from "react";
import { Link } from 'react-router-dom';

import './style.scss';

const Menu = () => (
    <div className="menu">
        <ul className="menu-list">
            <li className="menu-list-link">
                <Link to="/">
                    Accueil
                </Link>
            </li>
            <li className="menu-list-link">
                <Link to="/list">
                    Liste des jeux
                </Link>
            </li>
            <li className="menu-list-link">
                <Link to="/about">
                    A propos
                </Link>
            </li>
        </ul>
    </div>
)

export default Menu;