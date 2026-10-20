import React, { useState } from 'react';

export default function Contact() {
    const [status, setStatus] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setStatus({ type: 'error', text: 'Please fill out all required fields marked with *.' });
            return;
        }
        setStatus({ type: 'success', text: 'Thank you for reaching out! Your message was received.' });
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
    };

    return (
        <section id="contact" className="contact-section reveal">
            <div className="sec-heading">
                <h2 className="sec-title">Contact</h2>
                <p className="contact-subtitle">Have an opportunity, question, or feedback? Send a message below.</p>
            </div>

            <div className="contact-card">
                <form id="contact-form" className="contact-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="contact-name" className="form-label">
                                Full Name <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="contact-name"
                                name="name"
                                className="form-input"
                                placeholder="e.g. Alex Rivera"
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-email" className="form-label">
                                Email Address <span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                id="contact-email"
                                name="email"
                                className="form-input"
                                placeholder="e.g. alex@example.com"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact-subject" className="form-label">Subject</label>
                        <input
                            type="text"
                            id="contact-subject"
                            name="subject"
                            className="form-input"
                            placeholder="e.g. Project Inquiry or Collaboration"
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact-message" className="form-label">
                            Message <span className="required">*</span>
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            className="form-textarea"
                            rows={4}
                            placeholder="Write your message here..."
                            required
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="form-actions">
                        <button type="submit" id="contact-submit-btn" className="btn-primary">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                            <span>Send Message</span>
                        </button>
                        <span className="form-note">Client-side validated &middot; Safe front-end demonstration</span>
                    </div>

                    {status && (
                        <div
                            style={{
                                marginTop: '14px',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: 500,
                                background: status.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                color: status.type === 'success' ? '#10b981' : '#ef4444',
                                border: `1px solid ${status.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                            }}
                        >
                            {status.text}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}
