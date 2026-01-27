import TechStack from "./tech-stack";

export default function Work() {
    return (
        <>
            <section id="work" className="section">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">Featured Work</h2>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="view-all">
                            View All
                        </a>
                    </div>
                    <div className="grid">
                        <article className="card animate-on-scroll">
                            <img src="/modern-design-system-interface.png" alt="Project 1" className="card-image" />
                            <div className="card-content">
                                <span className="card-tag">Design System</span>
                                <h3 className="card-title">Unified Component Library</h3>
                                <p className="card-desc">
                                    Built a scalable design system serving 50+ product teams with consistent patterns and reusable
                                    components.
                                </p>
                            </div>
                        </article>

                        <article className="card animate-on-scroll">
                            <img src="/mobile-app-interface.png" alt="Project 2" className="card-image" />
                            <div className="card-content">
                                <span className="card-tag">Mobile App</span>
                                <h3 className="card-title">Wellness Tracking Platform</h3>
                                <p className="card-desc">
                                    Designed and developed a cross-platform mobile experience that helps users maintain healthy habits.
                                </p>
                            </div>
                        </article>

                        <article className="card animate-on-scroll">
                            <img src="/modern-ecommerce-website.png" alt="Project 3" className="card-image" />
                            <div className="card-content">
                                <span className="card-tag">E-Commerce</span>
                                <h3 className="card-title">Sustainable Fashion Marketplace</h3>
                                <p className="card-desc">
                                    Created a seamless shopping experience for eco-conscious consumers with integrated sustainability
                                    metrics.
                                </p>
                            </div>
                        </article>
                    </div>
                    {/* <TechStack /> */}
                </div>
            </section>
        </>
    )
}