export default function Blog() {
    return (
        <>
            <section id="blog" className="section blog-section">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">Latest Articles</h2>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="view-all">
                            View All
                        </a>
                    </div>
                    <div className="grid">
                        <article className="card animate-on-scroll">
                            <div className="card-content">
                                <span className="card-tag">Design Systems</span>
                                <div className="blog-date">January 15, 2026</div>
                                <h3 className="card-title">Building Scalable Component Libraries</h3>
                                <p className="card-desc">
                                    Learn how to create maintainable design systems that grow with your product and team. A
                                    comprehensive guide to tokens, components, and documentation.
                                </p>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="read-more">
                                    Read More →
                                </a>
                            </div>
                        </article>

                        <article className="card animate-on-scroll">
                            <div className="card-content">
                                <span className="card-tag">Development</span>
                                <div className="blog-date">January 8, 2026</div>
                                <h3 className="card-title">Modern React Patterns for 2026</h3>
                                <p className="card-desc">
                                    Exploring the latest patterns and best practices in React development, from server components to
                                    advanced state management techniques.
                                </p>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="read-more">
                                    Read More →
                                </a>
                            </div>
                        </article>

                        <article className="card animate-on-scroll">
                            <div className="card-content">
                                <span className="card-tag">Product Design</span>
                                <div className="blog-date">December 28, 2025</div>
                                <h3 className="card-title">The Art of Micro-Interactions</h3>
                                <p className="card-desc">
                                    Discover how subtle animations and feedback mechanisms can dramatically improve user experience and
                                    product delight.
                                </p>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="read-more">
                                    Read More →
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}