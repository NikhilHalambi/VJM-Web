import './About.css';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <h2 className="section-title">About Vaidyakiya Janjagruti Manch</h2>

                <div className="about-content">
                    <div className="about-text">
                        <p className="lead-text">
                            Vaidyakiya Janjagruti Manch (VJM) is a dedicated NGO based in Wardha, Maharashtra,
                            committed to environmental conservation, water management, and community empowerment.
                        </p>
                        <p>
                            Since our inception, we have been at the forefront of creating sustainable solutions
                            for environmental challenges. Our work focuses on transforming barren lands into
                            thriving green ecosystems and ensuring water security for future generations.
                        </p>
                        <p>
                            Through innovative approaches like Miyawaki forest development, rainwater harvesting,
                            and groundwater recharge systems, we are making a tangible difference in the lives
                            of thousands of people across Wardha and surrounding regions.
                        </p>
                    </div>

                    <div className="focus-areas">
                        <h3>Our Focus Areas</h3>
                        <div className="focus-grid">
                            <div className="focus-card">
                                <div className="focus-icon">🌳</div>
                                <h4>Environment</h4>
                                <p>Creating green spaces through Miyawaki forests and large-scale plantation drives</p>
                            </div>
                            <div className="focus-card">
                                <div className="focus-icon">💧</div>
                                <h4>Water Conservation</h4>
                                <p>Implementing groundwater recharge systems and rainwater harvesting solutions</p>
                            </div>
                            <div className="focus-card">
                                <div className="focus-icon">👥</div>
                                <h4>Youth Engagement</h4>
                                <p>Empowering young people through environmental awareness and action programs</p>
                            </div>
                            <div className="focus-card">
                                <div className="focus-icon">⚡</div>
                                <h4>Technology</h4>
                                <p>Leveraging innovative solutions like Bhujal Moist Soil Appliance for sustainability</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
