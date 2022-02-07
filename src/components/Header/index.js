import React from "react";
import classNames from "classnames";
import { Link } from 'react-router-dom';

import './style.scss';

const Header = ({ light }) => (
    <div className={classNames ("header", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
        <Link to="/">
            <h1 className="header-title">Limit Break</h1>
            <h2  className="header-subtitle">Le blog qui vous parle de jeux vidéo.</h2>
        </Link>
    </div>
)

export default Header;
