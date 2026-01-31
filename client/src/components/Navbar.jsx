import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <div className="navbar-brand">
                    <h3>VJM</h3>
                    <span className="brand-subtitle">Vaidyakiya Janjagruti Manch</span>
                </div>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li><a onClick={() => scrollToSection('home')}>Home</a></li>
                    <li><a onClick={() => scrollToSection('about')}>About</a></li>
                    <li><a onClick={() => scrollToSection('projects')}>Projects</a></li>
                    <li><a onClick={() => scrollToSection('impact')}>Impact</a></li>
                    <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
