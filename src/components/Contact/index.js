import React from "react";
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const Contact = ({ 
    pseudo, 
    email, 
    message, 
    changeValue,
    sendMessage,
}) => {
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (pseudo !== '' && email !== '' && message !== '') {
            sendMessage();
        }
        else {
        }
    }
    const handleChange = (evt) => {
        evt.preventDefault();
        changeValue(evt.target.value, evt.target.name);
    }
    return (
        <div className="contact">
            <form 
                className="contact-form" 
                onSubmit={handleSubmit}
            >
                <ul>
                    <li className="contact-form-item">
                        <label 
                            className="contact-form-item-label"
                            htmlFor="field-name"
                        >
                            Nom :
                        </label>
                        <input
                            id="field-name"
                            type="text"
                            name="pseudo"
                            placeholder="Ici votre nom"
                            maxLength="50"
                            className={ classNames ("contact-form-item-input", {
                                "ok" : pseudo !== ''
                            })}
                            value={pseudo}
                            onChange={handleChange}
                        />
                    </li>
                    <li className="contact-form-item">
                        <label 
                            className="contact-form-item-label"
                            htmlFor="field-email"
                        >
                            Email :
                        </label>
                        <input
                            id="field-email"
                            type="email"
                            name="email"
                            placeholder="Ici votre adresse mail"
                            maxLength="50"
                            className={ classNames ("contact-form-item-input", {
                                "ok" : email !== ''
                            })}
                            value={email}
                            onChange={handleChange}
                        />
                    </li>
                    <li className="contact-form-item">
                        <label 
                            className="contact-form-item-label"
                            htmlFor="field-message"
                        >
                            Message :
                        </label>
                        <textarea 
                            id="field-message"
                            name="message"
                            placeholder="Ici votre message"
                            rows="8"
                            className={ classNames ("contact-form-item-textarea", {
                                "ok" : message !== ''
                            })}
                            value={message}
                            onChange={handleChange}
                        />
                    </li>
                </ul>
                <input
                    type="submit" 
                    value="Envoyer"
                    className={ classNames ("contact-form-submit", {
                        "off" : pseudo === '' || email === '' || message === '', 
                        "on" : pseudo !== '' && email !== '' && message !== '',
                    })}
                />
            </form>
        </div>
    )
}

Contact.propTypes = {
    pseudo : PropTypes.string.isRequired,
    email : PropTypes.string.isRequired,
    message : PropTypes.string.isRequired,
    changeValue : PropTypes.func.isRequired,
    sendMessage : PropTypes.func.isRequired,
}

export default Contact;