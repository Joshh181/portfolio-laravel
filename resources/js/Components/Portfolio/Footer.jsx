import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    const [views, setViews] = useState(12692);

    useEffect(() => {
        const saved = localStorage.getItem('portfolio_views');
        if (saved) {
            setViews(parseInt(saved, 10));
        } else {
            const initial = 12692;
            setViews(initial);
            localStorage.setItem('portfolio_views', initial.toString());
        }
    }, []);

    const handleIncrement = () => {
        const next = views + 1;
        setViews(next);
        localStorage.setItem('portfolio_views', next.toString());
    };

    return (
        <>
            <div className="footer-sections" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="reveal">
                    <div className="footer-col-title">Beyond the Screen</div>
                    <div className="member-list">
                        <div className="member-item">
                            <span className="member-name">Gamer</span>
                        </div>
                        <div className="member-item">
                            <span className="member-name">Love eating</span>
                        </div>
                        <div className="member-item">
                            <span className="member-name">Tech Explorer</span>
                        </div>
                    </div>
                </div>

                <div className="reveal">
                    <div className="footer-col-title">Social Links</div>
                    <div className="social-list">
                        <a href="https://github.com/Joshh181" target="_blank" rel="noopener noreferrer" className="social-item">
                            <div className="social-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </div>
                            GitHub
                        </a>
                        <a href="https://www.facebook.com/Josh.stellarr" target="_blank" rel="noopener noreferrer" className="social-item">
                            <div className="social-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </div>
                            Facebook
                        </a>
                        <a href="https://www.instagram.com/j.stellarrr/" target="_blank" rel="noopener noreferrer" className="social-item">
                            <div className="social-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                </svg>
                            </div>
                            Instagram
                        </a>
                    </div>
                </div>

                <div className="reveal">
                    <div className="footer-col-title">Speaking</div>
                    <p className="speaking-text">
                        Available for speaking and collaborating at events about software development and technology.
                    </p>
                    <a href="mailto:josh.lumactod16@gmail.com" className="get-in-touch">
                        Get in touch
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>

            <footer className="site-footer">
                <span>&copy; {new Date().getFullYear()} Joshua Lumactod. All rights reserved.</span>
                <div
                    className="visitor-counter-badge"
                    id="visitor-counter"
                    title="Click to increment views!"
                    onClick={handleIncrement}
                    style={{ cursor: 'pointer' }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="visitor-icon" aria-hidden="true">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="visitor-label">Views</span>
                    <span className="visitor-count" id="visitor-count">{views.toLocaleString()}</span>
                </div>
            </footer>
        </>
    );
}
