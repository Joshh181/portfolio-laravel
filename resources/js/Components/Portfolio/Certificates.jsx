import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Certificates() {
    const stackRef = useRef(null);
    const counterRef = useRef(null);
    const didDragRef = useRef(false);
    const [activeCert, setActiveCert] = useState(null);

    const certificates = [
        {
            title: 'Introduction to Flutter Course',
            issuer: 'Simplilearn SkillUp',
            year: '2026',
            status: 'VERIFIED',
            image: '/assets/CERT.jpg',
        },
        {
            title: 'Introduction to AI Literacy and Responsible Use',
            issuer: 'Mapúa University · CHED',
            year: '2026',
            status: 'VERIFIED',
            image: '/assets/ClassOf2026__issued_pages-to-jpg-0001.jpg',
        },
    ];

    useEffect(() => {
        const stack = stackRef.current;
        const counter = counterRef.current;
        if (!stack) return;

        let cards = Array.from(stack.querySelectorAll('.cert-card'));
        if (cards.length === 0) return;

        let isAnimating = false;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let lastX = 0;
        let lastY = 0;
        let vx = 0;
        let vy = 0;
        let lastTime = 0;
        let dragStartTime = 0;
        let activePointerId = null;

        const getCardRestTransform = (index) => {
            if (index === 0) return 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)';
            const rotZ = 5 * index;
            const translateY = index * 6;
            const translateZ = -index * 24;
            const scale = Math.max(0.88, 1 - index * 0.05);
            return `translate3d(0, ${translateY}px, ${translateZ}px) rotateZ(${rotZ}deg) scale(${scale})`;
        };

        const updateStack = (animate = true) => {
            cards.forEach((card, index) => {
                card.style.transition = animate
                    ? 'transform 0.5s cubic-bezier(0.18, 0.9, 0.26, 1.2), opacity 0.45s ease, box-shadow 0.45s ease'
                    : 'none';
                card.style.willChange = 'transform, opacity';

                if (index === 0) {
                    card.setAttribute('data-top', 'true');
                    card.setAttribute('tabindex', '0');
                    card.style.zIndex = '10';
                    card.style.opacity = '1';
                    card.style.transform = getCardRestTransform(0);
                    card.style.pointerEvents = 'auto';
                    card.style.cursor = 'grab';

                    const img = card.querySelector('.cert-img');
                    if (img) img.style.transform = '';
                } else {
                    card.setAttribute('data-top', 'false');
                    card.removeAttribute('tabindex');
                    const opacity = Math.max(0.45, 0.88 - (index - 1) * 0.18);
                    card.style.zIndex = String(10 - index);
                    card.style.opacity = String(opacity);
                    card.style.transform = getCardRestTransform(index);
                    card.style.pointerEvents = 'none';
                    card.style.cursor = 'default';
                }
            });

            if (counter && cards[0]) {
                const originalIndex = parseInt(cards[0].getAttribute('data-index') || '0', 10);
                counter.textContent = `${originalIndex + 1} / ${cards.length}`;
            }
        };

        const sendToBack = (dx = 0, dy = 0, releaseVx = 0, releaseVy = 0) => {
            if (isAnimating || cards.length <= 1) return;
            isAnimating = true;

            const topCard = cards[0];
            const dist = Math.hypot(dx, dy);
            const flyX = dist > 10 ? (dx / dist) * 180 + (releaseVx * 3) : 0;
            const flyY = dist > 10 ? (dy / dist) * 180 + (releaseVy * 3) : -120;

            const targetX = dx + flyX;
            const targetY = dy + flyY;
            const flyRotX = Math.max(-80, Math.min(80, (-targetY / 100) * 60));
            const flyRotY = Math.max(-80, Math.min(80, (targetX / 100) * 60));

            topCard.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.25, 1), opacity 0.26s ease';
            topCard.style.transform = `translate3d(${targetX}px, ${targetY}px, -40px) rotateX(${flyRotX.toFixed(2)}deg) rotateY(${flyRotY.toFixed(2)}deg) scale(0.9)`;
            topCard.style.opacity = '0.3';

            setTimeout(() => {
                topCard.style.zIndex = '1';
                const movedCard = cards.shift();
                cards.push(movedCard);
                updateStack(true);

                setTimeout(() => {
                    isAnimating = false;
                }, 450);
            }, 210);
        };

        const onPointerDown = (e) => {
            if (isAnimating) return;
            const topCard = cards[0];
            if (!topCard || (e.target.closest('.cert-card') !== topCard)) return;

            isDragging = true;
            didDragRef.current = false;
            activePointerId = e.pointerId;
            try {
                topCard.setPointerCapture(e.pointerId);
            } catch (err) {}

            startX = e.clientX;
            startY = e.clientY;
            currentX = e.clientX;
            currentY = e.clientY;
            lastX = e.clientX;
            lastY = e.clientY;
            vx = 0;
            vy = 0;
            lastTime = performance.now();
            dragStartTime = lastTime;

            topCard.classList.add('is-dragging');
            topCard.style.transition = 'none';
        };

        const onPointerMove = (e) => {
            if (!isDragging || e.pointerId !== activePointerId) return;
            currentX = e.clientX;
            currentY = e.clientY;

            const now = performance.now();
            const dt = Math.max(now - lastTime, 8);
            const instantVx = (currentX - lastX) / (dt / 16.67);
            const instantVy = (currentY - lastY) / (dt / 16.67);

            vx = vx * 0.75 + instantVx * 0.25;
            vy = vy * 0.75 + instantVy * 0.25;
            lastX = currentX;
            lastY = currentY;
            lastTime = now;

            const dx = currentX - startX;
            const dy = currentY - startY;

            if (Math.hypot(dx, dy) > 6) {
                didDragRef.current = true;
            }

            const rotY = Math.max(-75, Math.min(75, (dx / 100) * 60));
            const rotX = Math.max(-75, Math.min(75, (-dy / 100) * 60));

            const topCard = cards[0];
            if (topCard) {
                topCard.style.transition = 'none';
                topCard.style.transform =
                    `translate3d(${dx}px, ${dy}px, 20px) ` +
                    `rotateX(${rotX.toFixed(2)}deg) ` +
                    `rotateY(${rotY.toFixed(2)}deg) ` +
                    `scale(1.02)`;
            }

            const dist = Math.hypot(dx, dy);
            const progress = Math.min(dist / 110, 1);
            if (cards[1]) {
                const liveRotZ = 5 * (1 - progress);
                const liveScale = 0.95 + (0.05 * progress);
                const liveY = 6 * (1 - progress);
                cards[1].style.transform = `translate3d(0, ${liveY}px, 0) rotateZ(${liveRotZ.toFixed(2)}deg) scale(${liveScale.toFixed(3)})`;
            }
        };

        const onPointerUp = (e) => {
            if (!isDragging || e.pointerId !== activePointerId) return;
            isDragging = false;

            const topCard = cards[0];
            if (topCard) {
                try {
                    topCard.releasePointerCapture(e.pointerId);
                } catch (err) {}
                topCard.classList.remove('is-dragging');
            }

            const dx = currentX - startX;
            const dy = currentY - startY;
            const dist = Math.hypot(dx, dy);
            const duration = performance.now() - dragStartTime;

            if (dist < 8 && duration < 350) {
                didDragRef.current = false;
                const originalIndex = parseInt(topCard.getAttribute('data-index') || '0', 10);
                setActiveCert(certificates[originalIndex]);
                return;
            }

            didDragRef.current = true;
            setTimeout(() => {
                didDragRef.current = false;
            }, 300);

            const sensitivity = 110;
            if (Math.abs(dx) > sensitivity || Math.abs(dy) > sensitivity || Math.hypot(vx, vy) > 2.8) {
                sendToBack(dx, dy, vx, vy);
            } else {
                if (topCard) {
                    topCard.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.25), opacity 0.35s ease, box-shadow 0.35s ease';
                }
                updateStack(true);
            }
        };

        const onKeyDown = (e) => {
            if (isAnimating) return;
            if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                sendToBack(40, 40);
            } else if (e.key === 'Enter') {
                const topCard = cards[0];
                const originalIndex = parseInt(topCard?.getAttribute('data-index') || '0', 10);
                if (certificates[originalIndex]) {
                    setActiveCert(certificates[originalIndex]);
                }
            }
        };

        updateStack(false);

        stack.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
        stack.addEventListener('keydown', onKeyDown);

        return () => {
            stack.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
            stack.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    useEffect(() => {
        if (!activeCert) return;
        document.body.style.overflow = 'hidden';
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setActiveCert(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeCert]);

    return (
        <section id="certificates" className="cert-section reveal">
            <div className="cert-header">
                <h2 className="sec-title" style={{ marginBottom: 0 }}>Certificates</h2>
                <span className="cert-counter" id="cert-counter" ref={counterRef}>
                    1 / {certificates.length}
                </span>
            </div>

            <div className="cert-stack-wrapper">
                <div className="cert-stack" id="cert-stack" ref={stackRef}>
                    {certificates.map((cert, idx) => (
                        <div
                            key={idx}
                            className="cert-card"
                            data-index={idx}
                            data-top={idx === 0 ? 'true' : 'false'}
                            onClick={() => {
                                if (didDragRef.current) return;
                                setActiveCert(cert);
                            }}
                        >
                            <div className="cert-image-container">
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="cert-img"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/assets/CERT.jpg';
                                    }}
                                />
                                <div className="cert-badge">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                    </svg>
                                </div>
                                <div
                                    className="cert-overlay"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveCert(cert);
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        <line x1="11" y1="8" x2="11" y2="14"></line>
                                        <line x1="8" y1="11" x2="14" y2="11"></line>
                                    </svg>
                                </div>
                            </div>
                            <div className="cert-content">
                                <div className="cert-name">{cert.title}</div>
                                <div className="cert-issuer">{cert.issuer}</div>
                                <div className="cert-footer">
                                    <span className="cert-year">{cert.year}</span>
                                    <span className="cert-status">{cert.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cert-hint">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span>Drag card to send to back &middot; Click to expand</span>
            </div>

            {/* Fullscreen Certificate Lightbox Modal mounted at document.body */}
            {activeCert && typeof document !== 'undefined' && createPortal(
                <div
                    className="image-modal active"
                    onClick={() => setActiveCert(null)}
                >
                    <button
                        type="button"
                        className="modal-close-btn"
                        onClick={() => setActiveCert(null)}
                        aria-label="Close image"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={activeCert.image}
                            alt={activeCert.title}
                        />
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}

