import React from 'react';
import { Link } from '@inertiajs/react';

export default function FloatingDock({ onOpenAsk, onOpenTyping }) {
    return (
        <aside className="floating-dock" aria-label="Interactive Tools Dock">
            <button
                id="chatbot-toggle"
                className="dock-btn"
                type="button"
                onClick={onOpenAsk}
                aria-label="Ask Anything"
            >
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <circle cx="8" cy="10" r="1" fill="currentColor"></circle>
                    <circle cx="12" cy="10" r="1" fill="currentColor"></circle>
                    <circle cx="16" cy="10" r="1" fill="currentColor"></circle>
                </svg>
                <span className="dock-label">Ask</span>
            </button>

            <button
                id="typing-test-toggle"
                className="dock-btn"
                type="button"
                onClick={onOpenTyping}
                aria-label="Developer Typing Speed Test"
            >
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <line x1="6" y1="8" x2="6" y2="8.01"></line>
                    <line x1="10" y1="8" x2="10" y2="8.01"></line>
                    <line x1="14" y1="8" x2="14" y2="8.01"></line>
                    <line x1="18" y1="8" x2="18" y2="8.01"></line>
                    <line x1="6" y1="12" x2="6" y2="12.01"></line>
                    <line x1="10" y1="12" x2="10" y2="12.01"></line>
                    <line x1="14" y1="12" x2="14" y2="12.01"></line>
                    <line x1="18" y1="12" x2="18" y2="12.01"></line>
                    <line x1="8" y1="16" x2="16" y2="16"></line>
                </svg>
                <span className="dock-label">Typing Test</span>
            </button>

            <Link
                href={route('projects.index')}
                className="dock-btn"
                aria-label="Open Projects CRUD"
                style={{
                    color: '#6366f1',
                    fontWeight: 600,
                }}
            >
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                <span className="dock-label">CRUD</span>
            </Link>
        </aside>
    );
}
