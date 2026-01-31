import { useState, useEffect } from 'react';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fallback static projects (used if API fails)
    const fallbackProjects = [
        {
            title: "Miyawaki Forest Development",
            description: "Created 12 large Miyawaki forests at Hanuman Tekdi, Pipri Meghe, Arvi Road, converting barren plateau into thriving green ecosystems with 13,500+ saplings.",
            image: "/hero-bg.png",
            category: "Environment",
            impactMetrics: { value: "13,500+", unit: "saplings" }
        },
        {
            title: "Groundwater Recharge Systems",
            description: "Implemented 250 CCT trenches (8×2×2 ft) enabling approximately 2 crore litres of annual groundwater recharge, securing water for future generations.",
            image: "/water-project.png",
            category: "Water Conservation",
            impactMetrics: { value: "2 Cr", unit: "litres/year" }
        },
        {
            title: "Community Water Management",
            description: "Developed roof water harvesting, large & small soak pits, and Nanded-pattern soak pits (250+) with 2.5 km channelised CCT network for rainwater management.",
            image: "/community.png",
            category: "Community",
            impactMetrics: { value: "250+", unit: "soak pits" }
        },
        {
            title: "Wastewater Reuse Initiative",
            description: "Reusing 3 lakh litres per day of wastewater from purification plant for groundwater recharge, promoting sustainable water management practices.",
            image: "/water-project.png",
            category: "Water Conservation",
            impactMetrics: { value: "3L", unit: "litres/day" }
        },
        {
            title: "Bhujal Moist Soil Appliance",
            description: "Innovative technology for moisture retention and groundwater sustainability, ensuring long-term water security for agricultural and domestic use.",
            image: "/hero-bg.png",
            category: "Technology",
            impactMetrics: { value: "Sustainable", unit: "solution" }
        },
        {
            title: "Water Bank Project",
            description: "₹4.5 lakh fund supporting water conservation initiatives across 18 villages in 4 talukas, empowering communities to manage their water resources.",
            image: "/community.png",
            category: "Community",
            impactMetrics: { value: "18", unit: "villages" }
        }
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');

                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.data && data.data.length > 0) {
                        setProjects(data.data);
                    } else {
                        // Use fallback if no projects in database
                        setProjects(fallbackProjects);
                    }
                } else {
                    // Use fallback if API fails
                    setProjects(fallbackProjects);
                }
            } catch (err) {
                console.log('Using fallback projects:', err.message);
                // Use fallback if fetch fails
                setProjects(fallbackProjects);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section id="projects" className="section projects-section">
                <div className="container">
                    <h2 className="section-title">Our Projects</h2>
                    <div className="loading">Loading projects...</div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <h2 className="section-title">Our Projects</h2>
                <p className="section-subtitle">
                    Transforming communities through innovative environmental and water conservation initiatives
                </p>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                                <div className="project-category">{project.category}</div>
                            </div>
                            <div className="project-content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-impact">
                                    <span className="impact-label">Impact:</span>
                                    <span className="impact-value">
                                        {project.impactMetrics?.value || project.impactMetrics}
                                        {project.impactMetrics?.unit ? ` ${project.impactMetrics.unit}` : ''}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
