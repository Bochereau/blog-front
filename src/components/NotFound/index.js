import React from "react";
import { Link } from 'react-router-dom';

import './style.scss';

import Braid from '../../assets/image/braid.jpg';

import Header from '../../containers/Header';

const NotFound = () => (
    <div className="notfound">
        <Header />
        <div className="notfound-container">
            <p className="notfound-container-text">Oups, il semblerait que vous vous soyez perdu. L'article que vous cherché est peut-être dans un autre château...</p>
            <div className="notfound-container-404">
                <img className="notfound-container-404-img" src={Braid} alt="braid" />
                <p className="notfound-container-404-text" >404</p>
            </div>
            <div className="notfound-container-link">
                <Link to="/">
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    </div>
)

export default NotFound;