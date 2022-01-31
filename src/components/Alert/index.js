import React from "react";
import PropTypes from 'prop-types';

import './style.scss';

const Alert = ({ alert, dispatchMessage }) => {
    if (alert !== '') {
        setTimeout(() => {
            dispatchMessage('');
        }, 5000);
    }
    return (
        <>
            {alert !== '' && (
                <div className="alert">
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