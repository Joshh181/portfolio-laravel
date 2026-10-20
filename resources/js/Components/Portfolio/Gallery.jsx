import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Gallery() {
    const scrollRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const didDragRef = useRef(false);

    const galleryItems = [
        { title: '3D Character', src: '/assets/3D Character.jpg' },
        { title: 'House Design', src: '/assets/House Design.jpg' },
        { title: 'Lighthouse 3D', src: '/assets/Lighthouse 3D.png' },
        { title: 'Medilink Design App', src: '/assets/Medilink Design App.jpg' },
        { title: 'Taxi Reservation System', src: '/assets/Taxi Reservation System.jpg' },
        { title: 'Environment 3D', src: '/assets/Environment 3D.png' },
        { title: 'Store Design', src: '/assets/Store Design.jpg' },
    ];

    useEffect(() => {
        const galleryScroll = scrollRef.current;
        if (!galleryScroll) return;

        let animId;
        const scrollSpeed = 0.5;
        let isPaused = false;
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        const continuousScroll = () => {
            if (!isPaused && !isDown && galleryScroll) {
                const maxScroll = galleryScroll.scrollWidth - galleryScroll.clientWidth;
                if (galleryScroll.scrollLeft >= maxScroll - 1) {
                    galleryScroll.scrollLeft = 0;
                } else {
                    galleryScroll.scrollLeft += scrollSpeed;
                }
            }
            animId = requestAnimationFrame(continuousScroll);
        };
        animId = requestAnimationFrame(continuousScroll);

        const onDragStart = (e) => e.preventDefault();
        const onMouseEnter = () => {
            isPaused = true;
        };
        const onMouseLeave = () => {
            if (!isDown) isPaused = false;
        };

        const onPointerDown = (e) => {
            if (e.button !== undefined && e.button !== 0) return;
            isDown = true;
            isPaused = true;
            didDragRef.current = false;
            startX = e.pageX - galleryScroll.offsetLeft;
            scrollLeft = galleryScroll.scrollLeft;
            galleryScroll.style.cursor = 'grabbing';
        };

        const onPointerMove = (e) => {
            if (!isDown) return;
            const x = e.pageX - galleryScroll.offsetLeft;
            const walk = (x - startX) * 1.5;
            if (Math.abs(x - startX) > 6) {
                didDragRef.current = true;
            }
            galleryScroll.scrollLeft = scrollLeft - walk;
        };

        const endDrag = () => {
            if (!isDown) return;
            isDown = false;
            galleryScroll.style.cursor = '';
            setTimeout(() => {
                isPaused = false;
                didDragRef.current = false;
            }, 800);
        };

        galleryScroll.addEventListener('dragstart', onDragStart);
        galleryScroll.addEventListener('mouseenter', onMouseEnter);
        galleryScroll.addEventListener('mouseleave', onMouseLeave);
        galleryScroll.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', endDrag);
        window.addEventListener('pointercancel', endDrag);

        return () => {
            cancelAnimationFrame(animId);
            galleryScroll.removeEventListener('dragstart', onDragStart);
            galleryScroll.removeEventListener('mouseenter', onMouseEnter);
            galleryScroll.removeEventListener('mouseleave', onMouseLeave);
            galleryScroll.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', endDrag);
            window.removeEventListener('pointercancel', endDrag);
        };
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const amount = direction === 'left' ? -320 : 320;
            scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (!selectedImage) return;
        document.body.style.overflow = 'hidden';
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedImage]);

    return (
        <section id="gallery" className="gallery-section reveal">
            <div className="gallery-header">
                <div className="gallery-title">Gallery</div>
            </div>
            <div className="gallery-wrapper">
                <button
                    className="nav-btn prev"
                    id="prev-btn"
                    aria-label="Previous"
                    type="button"
                    onClick={() => scroll('left')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <div className="gallery-scroll" id="gallery-scroll" ref={scrollRef}>
                    {galleryItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="gallery-item"
                            onClick={() => {
                                if (didDragRef.current) return;
                                setSelectedImage(item);
                            }}
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/assets/ezgif-frame-001.png';
                                }}
                            />
                            <div className="gallery-overlay">
                                <span className="gallery-label">{item.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="nav-btn next"
                    id="next-btn"
                    aria-label="Next"
                    type="button"
                    onClick={() => scroll('right')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* Fullscreen Gallery Lightbox Modal mounted at document.body */}
            {selectedImage && typeof document !== 'undefined' && createPortal(
                <div
                    className="image-modal active"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        type="button"
                        className="modal-close-btn"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close image"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                        />
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}
