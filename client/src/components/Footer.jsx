import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Vaidyakiya Janjagruti Manch</h3>
                        <p>
                            Dedicated to environmental conservation, water management, and
                            community empowerment in Wardha, Maharashtra.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Focus Areas</h4>
                        <ul>
                            <li><i className="fas fa-tree"></i> Environment Conservation</li>
                            <li><i className="fas fa-tint"></i> Water Management</li>
                            <li><i className="fas fa-users"></i> Youth Engagement</li>
                            <li><i className="fas fa-bolt"></i> Sustainable Technology</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#impact">Impact</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Get Involved</h4>
                        <p>Join us in making a difference!</p>
                        <div className="footer-social">
                            <a href="#" aria-label="Facebook" className="social-icon facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" aria-label="Twitter" className="social-icon twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" aria-label="Instagram" className="social-icon instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="social-icon linkedin">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Vaidyakiya Janjagruti Manch, Wardha. All rights reserved.</p>
                    <p className="footer-tagline">
                        <i className="fas fa-seedling"></i> Growing Together for a Sustainable Future
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
