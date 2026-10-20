import React from 'react';
import { Link, Head } from '@inertiajs/react';
import FlashMessage from '../Components/FlashMessage';

export default function CrudLayout({ title, flash, children }) {
    return (
        <div
            className="min-h-screen transition-colors duration-200"
            style={{ background: 'var(--bg)', color: 'var(--text)' }}
        >
            <Head title={title} />

            {/* Top Navigation Bar */}
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 40,
                    background: 'var(--bg2)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderBottom: '1px solid var(--border)',
                }}
            >
                <div
                    style={{
                        maxWidth: '1360px',
                        margin: '0 auto',
                        padding: '0 24px',
                        width: '100%',
                        height: '64px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxSizing: 'border-box',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <Link
                            href={route('portfolio')}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: 'var(--muted)',
                                textDecoration: 'none',
                                transition: 'color 0.15s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            <span>Back to Portfolio</span>
                        </Link>

                        <span style={{ color: 'var(--border)' }}>/</span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '999px',
                                    background: '#10b981',
                                    boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)',
                                }}
                            ></span>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                                Projects Database Manager
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main
                style={{
                    maxWidth: '1360px',
                    margin: '0 auto',
                    padding: '32px 24px 64px',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            >
                {flash && <FlashMessage flash={flash} />}
                {children}
            </main>
        </div>
    );
}
