export default function Contact() {
    return (
        <>
            <section id="contact" className="section contact-section">
                <div className="container">
                    <div className="contact-wrapper animate-on-scroll">
                        <div className="contact-info">
                            <h2 className="section-title">Let's Work Together</h2>
                            <p className="contact-desc">
                                I'm always interested in hearing about new projects and opportunities. Whether you have a question or
                                just want to say hi, feel free to reach out.
                            </p>
                            <div className="contact-details">
                                <div className="contact-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m2 7 10 7 10-7" />
                                    </svg>
                                    <span>aziziegatrim@gmail.com</span>
                                </div>
                                <div className="contact-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>Prambanan, Klaten, Jawa Tengah Indonesia</span>
                                </div>
                            </div>
                        </div>
                        <form className="contact-form">
                            <div className="form-row">
                                <div className="form-field">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" name="name" placeholder="Your name" required />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" placeholder="your@email.com" required />
                                </div>
                            </div>
                            <div className="form-field">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" name="subject" placeholder="What's this about?" required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows={5} placeholder="Tell me more..." required></textarea>
                            </div>
                            <button type="submit" className="btn-submit">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}