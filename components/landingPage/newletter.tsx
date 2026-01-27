export default function Newsletter() {
    return (
        <>
            <section className="newsletter animate-on-scroll">
                <div className="container">
                    <div className="newsletter-inner">
                        <h2>Stay Updated</h2>
                        <p>Get insights on design, development, and product thinking delivered to your inbox.</p>
                        <form className="form-group">
                            <input type="email" placeholder="Enter your email" aria-label="Email address" />
                            <button type="submit" className="btn-subscribe">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}