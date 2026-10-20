import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../Components/Portfolio/Navbar';
import Hero from '../Components/Portfolio/Hero';
import About from '../Components/Portfolio/About';
import Skills from '../Components/Portfolio/Skills';
import ProjectsSection from '../Components/Portfolio/ProjectsSection';
import Experience from '../Components/Portfolio/Experience';
import Certificates from '../Components/Portfolio/Certificates';
import Gallery from '../Components/Portfolio/Gallery';
import Contact from '../Components/Portfolio/Contact';
import Footer from '../Components/Portfolio/Footer';
import FloatingDock from '../Components/Portfolio/FloatingDock';
import TypingModal from '../Components/Portfolio/TypingModal';
import AskOverlay from '../Components/Portfolio/AskOverlay';

export default function Portfolio({ projects = [] }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'dark';
        }
        return 'dark';
    });

    const [isTypingOpen, setIsTypingOpen] = useState(false);
    const [isAskOpen, setIsAskOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.documentElement.classList.add('theme-loaded');

        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.05 });

        reveals.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    };

    return (
        <>
            <Head title="Joshua Lumactod - Aspiring Developer" />

            {/* Semantic Header */}
            <Navbar />

            {/* Main Portfolio Container using original .site-wrap */}
            <main className="site-wrap">
                {/* Hero Section */}
                <Hero theme={theme} onToggleTheme={toggleTheme} />

                {/* 2-Column Responsive Body Layout using original .body-layout */}
                <div className="body-layout">
                    {/* Left Column (About, Skills, Dynamic Projects CRUD) */}
                    <div className="left-col">
                        <About />
                        <Skills />
                        {/* THE DYNAMIC SECTION MANAGED VIA LARAVEL CRUD */}
                        <ProjectsSection projects={projects} />
                    </div>

                    {/* Right Column (Experience & Certificates) */}
                    <div className="right-col">
                        <Experience />
                        <Certificates />
                    </div>
                </div>

                {/* Wide Full-Width Sections */}
                <Gallery />
                <Contact />

                {/* Footer Sections + Site Footer */}
                <Footer />
            </main>

            {/* Floating Action Dock */}
            <FloatingDock
                onOpenAsk={() => setIsAskOpen(true)}
                onOpenTyping={() => setIsTypingOpen(true)}
            />

            {/* Interactive Modals */}
            <TypingModal
                isOpen={isTypingOpen}
                onClose={() => setIsTypingOpen(false)}
            />

            <AskOverlay
                isOpen={isAskOpen}
                onClose={() => setIsAskOpen(false)}
            />
        </>
    );
}
