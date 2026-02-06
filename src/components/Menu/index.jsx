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
      <Link to="/" aria-label="Limit Break - Retour à l'accueil">
        <div className="menu-small">
          <img className="menu-small-logo" src={Logo} alt="" />
        </div>
      </Link>
      <nav
        className={classNames("menu-nav", {
          "bk-s--light": light === true,
          "bk-s--dark": light === false,
        })}
        aria-label="Navigation principale"
      >
        <ul className="menu-list">
          <li className="menu-list-link hvr-shutter-out-horizontal">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Accueil
            </NavLink>
          </li>
          <li className="menu-list-link">
            <NavLink to="/list" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Articles
            </NavLink>
          </li>
        </ul>

        <Link to="/" aria-label="Limit Break - Accueil">
          <img className="menu-list-logo" src={Logo} alt="" />
        </Link>

        <ul className="menu-list">
          <li className="menu-list-link">
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : undefined)}>
              À propos
            </NavLink>
          </li>
          <li className="menu-list-link">
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
