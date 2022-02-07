import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

import './style.scss';

const Alert = ({ alert, dispatchMessage, light }) => {
    if (alert !== '') {
        setTimeout(() => {
            dispatchMessage('');
        }, 5000);
    }
    return (
        <>
            {alert !== '' && (
                <div className={classNames ("alert", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
                    <p className="alert-text">{alert}</p>
                </div>
            )
            }
        </>
    )
}

Alert.propTypes = {
    alert: PropTypes.string.isRequired,
    dispatchMessage: PropTypes.func.isRequired,
}

export default Alert;