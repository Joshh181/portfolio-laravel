import React, { useRef } from 'react';

export default function Hero({ theme, onToggleTheme }) {
    const heroPhotoRef = useRef(null);
    const isTransitioningRef = useRef(false);

    const animateProfileTransition = (fromFrame, toFrame, callback) => {
        let currentFrame = fromFrame;
        const isForward = fromFrame < toFrame;
        let lastTime = performance.now();
        const frameDuration = 16;

        const animate = (time) => {
            const deltaTime = time - lastTime;
            if (deltaTime >= frameDuration) {
                if (heroPhotoRef.current) {
                    heroPhotoRef.current.src = `/assets/ezgif-frame-${String(currentFrame).padStart(3, '0')}.png`;
                }
                lastTime = time - (deltaTime % frameDuration);

                if (isForward) {
                    currentFrame++;
                    if (currentFrame > toFrame) {
                        if (callback) callback();
                        return;
                    }
                } else {
                    currentFrame--;
                    if (currentFrame < toFrame) {
                        if (callback) callback();
                        return;
                    }
                }
            }
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    };

    const handleThemeToggle = (e) => {
        if (isTransitioningRef.current) return;

        const currentTheme = theme;
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Calculate exact button center coordinates for circular ripple
        const button = e?.currentTarget || document.getElementById('theme-toggle');
        if (button) {
            const rect = button.getBoundingClientRect();
            const x = Math.round(rect.left + rect.width / 2);
            const y = Math.round(rect.top + rect.height / 2);
            const endRadius = Math.ceil(Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            ));

            let styleTag = document.getElementById('theme-ripple-keyframes');
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'theme-ripple-keyframes';
                document.head.appendChild(styleTag);
            }

            styleTag.textContent = `
                ::view-transition-new(root) {
                    animation: theme-ripple 1.15s cubic-bezier(0.25, 1, 0.4, 1) forwards !important;
                }
                @keyframes theme-ripple {
                    0% {
                        clip-path: circle(0px at ${x}px ${y}px);
                    }
                    100% {
                        clip-path: circle(${endRadius}px at ${x}px ${y}px);
                    }
                }
            `;
        }

        const applyThemeChanges = () => {
            // Apply theme changes instantly with zero delay
            onToggleTheme();

            // Animate profile transition concurrently
            if (nextTheme === 'dark') {
                animateProfileTransition(1, 61, () => {
                    isTransitioningRef.current = false;
                });
            } else {
                animateProfileTransition(62, 123, () => {
                    isTransitioningRef.current = false;
                });
            }
        };

        if (typeof document === 'undefined' || !document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            applyThemeChanges();
            return;
        }

        isTransitioningRef.current = true;
        document.documentElement.classList.add('is-theme-switching');

        const transition = document.startViewTransition(() => {
            applyThemeChanges();
        });

        transition.finished.finally(() => {
            document.documentElement.classList.remove('is-theme-switching');
            isTransitioningRef.current = false;
        });
    };

    const initialPhoto = theme === 'dark' ? '/assets/ezgif-frame-061.png' : '/assets/ezgif-frame-001.png';

    return (
        <section id="home" className="hero">
            <img
                ref={heroPhotoRef}
                src={initialPhoto}
                alt="Joshua Lumactod"
                className="hero-photo"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/ezgif-frame-001.png';
                }}
            />

            <div className="hero-info">
                <div className="hero-name-row">
                    <h1 className="hero-name" style={{ fontSize: 'inherit', fontWeight: 'inherit', margin: 0, display: 'inline' }}>
                        Joshua Lumactod
                    </h1>
                    <span className="hero-verified" title="Verified">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"
                                fill="#1D9BF0"
                            />
                            <path d="M7.75 12.25L10.5 15L16.25 9.25" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>

                    <button
                        id="theme-toggle"
                        className="theme-toggle-btn"
                        aria-label="Toggle theme"
                        type="button"
                        onClick={handleThemeToggle}
                    >
                        <div className="toggle-pill">
                            <div className="toggle-circle"></div>
                        </div>
                        <div className="toggle-icons">
                            <svg className="sun-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                            <svg className="moon-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </div>
                    </button>
                </div>

                <div className="hero-location">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    Pangasinan, Philippines
                </div>

                <div className="hero-roles">Aspiring Developer &nbsp;\&nbsp; Student &nbsp;\&nbsp; Builder</div>

                <div className="hero-actions">
                    <a href="https://github.com/Joshh181" target="_blank" rel="noopener noreferrer" className="btn-primary">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                        </svg>
                        View GitHub
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a href="mailto:josh.lumactod16@gmail.com" className="btn-ghost">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                        </svg>
                        Send Email
                    </a>
                </div>
            </div>
        </section>
    );
}
