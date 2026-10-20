import React, { useState } from 'react';

export default function AskOverlay({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState(null);

    const questions = {
        'tech': 'I specialize in Laravel, React, Inertia.js, Tailwind CSS, Flutter, and SQLite/MySQL.',
        'experience': 'I am a BSIT student actively developing full-stack web and mobile systems in the Philippines.',
        'contact': 'You can reach me directly at josh.lumactod16@gmail.com or via GitHub at github.com/Joshh181.',
        'projects': 'Check out the Recent Projects section! It is dynamically loaded from a Laravel database with CRUD capabilities.',
    };

    const handleAsk = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const q = query.toLowerCase();
        let matchedAnswer = 'Joshua is an aspiring developer who specializes in Laravel, React, Inertia.js, and mobile solutions. Feel free to explore his projects or email him directly!';

        if (q.includes('tech') || q.includes('stack') || q.includes('skills')) matchedAnswer = questions.tech;
        else if (q.includes('exp') || q.includes('study') || q.includes('school')) matchedAnswer = questions.experience;
        else if (q.includes('email') || q.includes('contact') || q.includes('reach')) matchedAnswer = questions.contact;
        else if (q.includes('project') || q.includes('work') || q.includes('crud')) matchedAnswer = questions.projects;

        setAnswer(matchedAnswer);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
        >
            <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-zinc-100">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </span>
                        <h3 className="font-bold text-sm">Ask Joshua Anything</h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleAsk} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g. What is your tech stack? How to contact you?"
                            className="w-full pl-4 pr-10 py-3 rounded-xl border border-zinc-700 bg-zinc-950 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>

                    {answer && (
                        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-xs leading-relaxed text-indigo-200 animate-fadeIn">
                            <p className="font-semibold text-indigo-400 mb-1">Answer:</p>
                            <p>{answer}</p>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-2">
                        <span className="text-[11px] text-zinc-500 w-full mb-1">Quick prompts:</span>
                        {['Tech Stack', 'Contact Info', 'CRUD Projects'].map((prompt, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => {
                                    setQuery(prompt);
                                }}
                                className="px-2.5 py-1 text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    );
}
