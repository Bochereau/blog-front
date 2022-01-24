import React from "react";
import { Link } from 'react-router-dom';

import './style.scss';

// import Braid from '../../assets/image/braid.jpg';

import Header from '../Header';

const NotFound = () => (
    <div className="notfound">
        <Header />
        <div className="notfound-container">
            {/* <img className="notfound-container-img" src={Braid} alt="braid" /> */}
            {/* <p className="notfound-container-text">Désolé mais l'article que vous cherché n'est pas dans ce château...</p> */}
            <p className="notfound-container-404" >404</p>
            <div className="notfound-container-link">
                <Link to="/">
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    </div>
)

export default NotFound;