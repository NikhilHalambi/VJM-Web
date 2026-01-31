import './Hero.css';

const Hero = () => {
    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title fade-in">
                    Growing Green, Saving Water
                </h1>
                <p className="hero-subtitle fade-in">
                    Transforming Wardha through environmental conservation and community action
                </p>
                <div className="hero-stats fade-in">
                    <div className="stat-item">
                        <span className="stat-number">13,500+</span>
                        <span className="stat-label">Saplings Planted</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">12</span>
                        <span className="stat-label">Miyawaki Forests</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">2 Cr</span>
                        <span className="stat-label">Litres Water Recharged</span>
                    </div>
                </div>
                <button className="btn btn-primary hero-cta" onClick={scrollToContact}>
                    Get Involved
                </button>
            </div>
        </section>
    );
};

export default Hero;
