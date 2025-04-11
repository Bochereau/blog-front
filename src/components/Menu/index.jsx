import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { NavLink, Link } from "react-router-dom";

import Logo from "../../assets/image/logo.png";
import "./style.scss";

const Menu = () => {
  const dispatch = useDispatch();
//   const open = useSelector((state) => state.menuOpen);
  const light = useSelector((state) => state.lightTheme);

  return (
    <div className="menu">
      <Link to="/">
        <div className="menu-small">
          <img className="menu-small-logo" src={Logo} alt="logo limit break" />
        </div>
      </Link>
      <nav
        className={classNames("menu-nav", {
          "bk-s--light": light === true,
          "bk-s--dark": light === false,
        })}
      >
        <ul className="menu-list">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>
            <li className="menu-list-link hvr-shutter-out-horizontal">Accueil</li>
          </NavLink>
          <NavLink to="/list" className={({ isActive }) => (isActive ? "active" : undefined)}>
            <li className="menu-list-link">Articles</li>
          </NavLink>
        </ul>

        <Link to="/">
          <img className="menu-list-logo" src={Logo} alt="logo limit break" />
        </Link>

        <ul className="menu-list">
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : undefined)}>
            <li className="menu-list-link">À propos</li>
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : undefined)}>
            <li className="menu-list-link">Contact</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
