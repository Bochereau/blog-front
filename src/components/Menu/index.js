import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { NavLink, Link } from 'react-router-dom';

import './style.scss';

import Logo from '../../assets/image/logo.png'

const Menu = ({
    light,
}) => {
    return(
        <div className="menu" >
            <nav
                className={classNames ("menu-nav", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}
            >
                <ul className="menu-list">
                    <NavLink to="/" className={({ isActive }) => isActive ? "active" : undefined}>
                        <li className="menu-list-link hvr-shutter-out-horizontal">Accueil</li>
                    </NavLink>
                    <NavLink to="/list" className={({ isActive }) => isActive ? "active" : undefined}>
                        <li className="menu-list-link">Articles</li>
                    </NavLink>
                </ul>
                <Link to="/">
                    <img className="menu-list-logo" src={Logo} alt="logo limit break" />
                </Link>
                <ul className="menu-list" classname={({ isActive }) => isActive ? "active" : undefined}>
                    <NavLink to="/about">
                        <li className="menu-list-link">A propos</li>
                    </NavLink>
                    <NavLink to="/contact" classname={({ isActive }) => isActive ? "active" : undefined}>
                        <li className="menu-list-link">Contact</li>
                    </NavLink>
                </ul>
            </nav>
        </div>
    )
}

Menu.propTypes = {
    openMenu: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    light: PropTypes.bool.isRequired,
}

export default Menu;