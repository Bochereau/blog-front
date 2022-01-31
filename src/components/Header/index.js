import React from "react";
import { Link } from 'react-router-dom';

import './style.scss';

const Header = () => (
    <div className="header">
        <Link to="/">
            <h1 className="header-title">Limit Break</h1>
            <h2  className="header-subtitle">Le blog qui vous parle de jeux vidéo.</h2>
        </Link>
    </div>
)

export default Header;
