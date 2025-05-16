import React, { useState } from "react";
import { useDispatch } from "react-redux";
import classNames from 'classnames';
import { sendMessage } from "../../actions";

import './style.scss';

const Contact = () => {
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        pseudo: '',
        email: '',
        message: ''
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { pseudo, email, message } = formData;
        if (pseudo !== '' && email !== '' && message !== '') {
            dispatch(sendMessage(pseudo, email, message));
            setFormData({ pseudo: '', email: '', message: '' });
        }
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="contact">
            <div className="contact-content">
                <p className="contact-content-description">Contactez-moi !</p>
                <form
                    className={classNames("contact-form")}
                    onSubmit={handleSubmit}
                >
                    <ul>
                        <li className="contact-form-item">
                            <label
                                className="contact-form-item-label"
                                htmlFor="field-name"
                            >
                                Nom
                            </label>
                            <input
                                id="field-name"
                                type="text"
                                name="pseudo"
                                maxLength="50"
                                className={classNames("contact-form-item-input", {
                                    "ok": formData.pseudo !== ''
                                })}
                                value={formData.pseudo}
                                onChange={handleChange}
                            />
                        </li>
                        <li className="contact-form-item">
                            <label
                                className="contact-form-item-label"
                                htmlFor="field-email"
                            >
                                Email
                            </label>
                            <input
                                id="field-email"
                                type="email"
                                name="email"
                                maxLength="50"
                                className={classNames("contact-form-item-input", {
                                    "ok": formData.email !== ''
                                })}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </li>
                        <li className="contact-form-item">
                            <label
                                className="contact-form-item-label"
                                htmlFor="field-message"
                            >
                                Message
                            </label>
                            <textarea
                                id="field-message"
                                name="message"
                                rows="8"
                                className={classNames("contact-form-item-textarea", {
                                    "ok": formData.message !== ''
                                })}
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </li>
                    </ul>
                    <input
                        type="submit"
                        value="Envoyer"
                        className={classNames("contact-form-submit", {
                            "off": formData.pseudo === '' || formData.email === '' || formData.message === '',
                            "on": formData.pseudo !== '' && formData.email !== '' && formData.message !== '',
                        })}
                    />
                </form>
            </div>
        </div>
    )
}

export default Contact;