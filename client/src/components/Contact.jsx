import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setStatus({
                    type: 'success',
                    message: 'Thank you for contacting us! We will get back to you soon.'
                });
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setStatus({
                    type: 'error',
                    message: data.message || 'Something went wrong. Please try again.'
                });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Failed to submit form. Please check your connection and try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <p className="section-subtitle">
                    Join us in our mission to create a greener, more sustainable future
                </p>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Vaidyakiya Janjagruti Manch</h3>
                        <div className="info-item">
                            <span className="info-icon"><i className="fas fa-map-marker-alt"></i></span>
                            <div>
                                <strong>Location</strong>
                                <p>Hanuman Tekdi, Pipri Meghe, Arvi Road<br />Wardha, Maharashtra</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="info-icon"><i className="fas fa-envelope"></i></span>
                            <div>
                                <strong>Email</strong>
                                <p>sachinpawde3@gmail.com</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="info-icon"><i className="fas fa-phone-alt"></i></span>
                            <div>
                                <strong>Phone</strong>
                                <p>+919822362343</p>
                            </div>
                        </div>
                        <div className="social-links">
                            <h4>Follow Us</h4>
                            <div className="social-icons">
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

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="10-digit mobile number"
                                pattern="[0-9]{10}"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Tell us how you'd like to contribute or get involved..."
                            ></textarea>
                        </div>

                        {status.message && (
                            <div className={`status-message ${status.type}`}>
                                {status.message}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
