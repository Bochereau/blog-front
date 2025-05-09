import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

import './style.scss';

const Footer = ({ light }) => (
    <div className={classNames ("footer", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
        <div className="footer-info">
            <p>| 2022 - Limit Break |</p>
        </div>
    </div>
)

Footer.propTypes = {
    light: PropTypes.bool.isRequired,
}

export default Footer;
