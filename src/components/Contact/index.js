import React from "react";
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

import Header from '../../containers/Header';

const Contact = ({ 
    pseudo, 
    email, 
    message, 
    changeValue,
    sendMessage,
    light,
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
        <>
            <Header />
            <div className="contact">
                <h2 className={classNames ("contact-title", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
                    Contact
                </h2>
                <div className="contact-content">
                    <p className="contact-content-description">Si vous souhaitez me contacter, merci d'utiliser le formulaire ci-dessous.</p>
                    <form 
                        className={ classNames("contact-form", {"border--light" : light === true, "border--dark": light === false}) }
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
            </div>
        </>
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