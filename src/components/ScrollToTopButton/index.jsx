import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // ou remplace par ⬆️ si pas installé
import './style.scss';

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > window.innerHeight) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!visible) return null;

    return (
        <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Remonter">
            <ArrowUp size={25} />
        </button>
    );
};

export default ScrollToTopButton;
