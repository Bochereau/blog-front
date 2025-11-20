import React, { useState, useEffect } from "react";
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
    const [availableHeight, setAvailableHeight] = useState(null);

    useEffect(() => {
        const computeHeight = () => {
            if (typeof window === 'undefined') {
                return;
            }
            if (window.innerWidth <= 1024) {
                setAvailableHeight(null);
                document.documentElement.style.removeProperty('--contact-available-height');
                return;
            }
            const menu = document.querySelector('.menu');
            const footer = document.querySelector('.footer');
            const menuHeight = menu?.offsetHeight || 0;
            const footerHeight = footer?.offsetHeight || 0;
            const freeSpace = window.innerHeight - menuHeight - footerHeight;
            const clampedSpace = Math.max(freeSpace, 560);
            const value = `${clampedSpace}px`;
            setAvailableHeight(value);
            document.documentElement.style.setProperty('--contact-available-height', value);
        };

        computeHeight();
        window.addEventListener('resize', computeHeight);
        return () => {
            window.removeEventListener('resize', computeHeight);
            document.documentElement.style.removeProperty('--contact-available-height');
        };
    }, []);

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
        <section
            className="contact"
            style={availableHeight ? { minHeight: availableHeight } : undefined}
        >
            <div className="contact__background" aria-hidden="true">
                <span className="contact__grid" />
                <span className="contact__scanlines" />
            </div>

            <div className="contact__core">
                <p className="contact__eyebrow">Contact</p>
                <h2 className="contact__heading">Fréquence 140.85 · Canal sécurisé</h2>
                <p className="contact__description">
                    Pas besoin d’une mission FOXHOUND pour me joindre. Dépose ton briefing et je reviens vers toi dès que le signal est clair.
                </p>

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
                                rows="6"
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
        </section>
    )
}

export default Contact;