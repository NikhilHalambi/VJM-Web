import { useState, useEffect, useRef } from 'react';
import './Impact.css';

const Impact = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const stats = [
        { value: 13500, label: "Saplings Planted", suffix: "+" },
        { value: 12, label: "Miyawaki Forests", suffix: "" },
        { value: 250, label: "CCT Trenches", suffix: "" },
        { value: 2, label: "Crore Litres Water Recharged", suffix: " Cr" },
        { value: 300000, label: "Litres/Day Wastewater Reused", suffix: "" },
        { value: 15000, label: "Citizens Involved", suffix: "+" },
        { value: 18, label: "Villages Supported", suffix: "" },
        { value: 4, label: "Talukas Covered", suffix: "" }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const Counter = ({ end, duration = 2000, suffix = "" }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!isVisible) return;

            let startTime;
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = (currentTime - startTime) / duration;

                if (progress < 1) {
                    setCount(Math.floor(end * progress));
                    requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };

            requestAnimationFrame(animate);
        }, [isVisible, end, duration]);

        return <span>{count.toLocaleString()}{suffix}</span>;
    };

    return (
        <section id="impact" className="section impact-section" ref={sectionRef}>
            <div className="impact-overlay"></div>
            <div className="container impact-container">
                <h2 className="section-title impact-title">Our Impact</h2>
                <p className="section-subtitle impact-subtitle">
                    Making a real difference through measurable environmental action
                </p>

                <div className="impact-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="impact-stat">
                            <div className="stat-value">
                                <Counter end={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="achievements">
                    <h3>Key Achievements</h3>
                    <ul className="achievements-list">
                        <li>🏆 Active participation in Satyamev Jayate Water Cup</li>
                        <li>🤝 15,000+ citizens involved in Shramdaan (community service)</li>
                        <li>💰 Water Bank Project with ₹4.5 lakh fund</li>
                        <li>🌊 2.5 km channelised CCT network for rainwater management</li>
                        <li>♻️ Innovative Bhujal Moist Soil Appliance for sustainability</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Impact;
