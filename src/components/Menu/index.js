import React, { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { Link } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";

import './style.scss';

const Menu = ({ 
    openMenu, 
    open, 
    light,
}) => {

    // handle closing menu when the user clicks outside
    const menuRef = useRef();
    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (open && menuRef.current && !menuRef.current.contains(e.target)) {
                openMenu(false);
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [open]);

    return(
        <div className="menu" >
            <button
                type="button"
                className={classNames ("menu-open", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}
                aria-label="menu"
                onClick={() => openMenu()}
            >
                {open ? (
                    <svg className="menu-open-icon" width="24px" height="24px" viewBox="5 5 13 13" xmlns="http://www.w3.org/2000/svg">
                    <g data-name="Layer 2">
                        <g data-name="close">
                            <rect width="100" height="24" transform="rotate(180 12 12)" opacity="0"/>
                            <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
                        </g>
                    </g>
                </svg>
                ) : (
                    <svg className="menu-open-icon" viewBox="0 0 100 70" width="25" height="25">
                    <rect width="100" height="20"></rect>
                    <rect y="30" width="100" height="20"></rect>
                    <rect y="60" width="100" height="20"></rect>
                </svg>
                )}
            </button>
            
            <CSSTransition
                in={open}
                timeout={300}
                classNames="menu-display"
                unmountOnExit
            >
                <nav 
                    className={classNames ("menu-aside", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}
                    ref={menuRef}
                >
                    <ul className="menu-list">
                        <Link to="/">
                            <li 
                                className="menu-list-link"
                                onClick={() => openMenu()}
                            >
                                    Accueil
                            </li>
                        </Link>
                        <Link to="/list">
                            <li 
                                className="menu-list-link"
                                onClick={() => openMenu()}
                            >
                                    Liste des articles
                            </li>
                        </Link>
                        <Link to="/about">
                            <li 
                                className="menu-list-link"
                                onClick={() => openMenu()}
                            >
                                    A propos
                            </li>
                        </Link>
                        <Link to="/contact">
                            <li 
                                className="menu-list-link"
                                onClick={() => openMenu()}
                            >
                                    Contact
                            </li>
                        </Link>
                    </ul>
                </nav>
            </CSSTransition>
            
            
        </div>
    )
}

Menu.propTypes = {
    openMenu: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    light: PropTypes.bool.isRequired,
}

export default Menu;