import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="header-inner">
                <a href="#home" className="header-brand" aria-label="Go to top">
                    <span className="brand-text">Joshua Lumactod</span>
                </a>
                <nav className="desktop-nav" aria-label="Main Navigation">
                    <a href="#about" className="nav-item">About</a>
                    <a href="#skills" className="nav-item">Skills</a>
                    <a href="#projects" className="nav-item">Projects</a>
                    <a href="#experience" className="nav-item">Experience</a>
                    <a href="#certificates" className="nav-item">Certificates</a>
                    <a href="#gallery" className="nav-item">Gallery</a>
                    <a href="#contact" className="nav-item">Contact</a>
                </nav>
                <button
                    id="mobile-nav-toggle"
                    className="mobile-nav-btn"
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {mobileOpen ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </>
                        )}
                    </svg>
                </button>
            </div>
            {mobileOpen && (
                <div id="mobile-nav-dropdown" className="mobile-nav-dropdown" style={{ display: 'flex' }}>
                    <a href="#about" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>About</a>
                    <a href="#skills" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Skills</a>
                    <a href="#projects" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Projects</a>
                    <a href="#experience" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Experience</a>
                    <a href="#certificates" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Certificates</a>
                    <a href="#gallery" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Gallery</a>
                    <a href="#contact" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Contact</a>
                </div>
            )}
        </header>
    );
}
