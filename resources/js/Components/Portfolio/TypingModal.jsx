import React, { useState, useEffect, useRef } from 'react';

const SAMPLE_TEXT = "const engineer = { name: 'Joshua Lumactod', passion: 'Full Stack Web Development', build: () => 'Innovative Laravel and React solutions' };";

export default function TypingModal({ isOpen, onClose }) {
    const [text, setText] = useState(SAMPLE_TEXT);
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isFinished, setIsFinished] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setInput('');
            setStartTime(null);
            setWpm(0);
            setAccuracy(100);
            setIsFinished(false);
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [isOpen]);

    const handleInput = (e) => {
        const val = e.target.value;
        if (!startTime) setStartTime(Date.now());

        setInput(val);

        // Calculate accuracy
        let correct = 0;
        for (let i = 0; i < val.length; i++) {
            if (val[i] === text[i]) correct++;
        }
        const acc = val.length > 0 ? Math.round((correct / val.length) * 100) : 100;
        setAccuracy(acc);

        // Calculate WPM
        const timeElapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000;
        if (timeElapsedMinutes > 0) {
            const calculatedWpm = Math.round((correct / 5) / timeElapsedMinutes);
            setWpm(Math.max(0, calculatedWpm));
        }

        if (val.length >= text.length) {
            setIsFinished(true);
        }
    };

    const handleReset = () => {
        setInput('');
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setIsFinished(false);
        inputRef.current?.focus();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
        >
            <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-zinc-100 font-mono">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <h3 className="font-bold text-sm tracking-wide">Developer Speed Test</h3>
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

                {/* Live Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="p-3 bg-zinc-800/60 rounded-xl border border-zinc-700/50">
                        <div className="text-2xl font-bold text-indigo-400">{wpm}</div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">WPM</div>
                    </div>
                    <div className="p-3 bg-zinc-800/60 rounded-xl border border-zinc-700/50">
                        <div className="text-2xl font-bold text-emerald-400">{accuracy}%</div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">Accuracy</div>
                    </div>
                    <div className="p-3 bg-zinc-800/60 rounded-xl border border-zinc-700/50">
                        <div className="text-2xl font-bold text-amber-400">{input.length}/{text.length}</div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">Progress</div>
                    </div>
                </div>

                {/* Text Display */}
                <div
                    onClick={() => inputRef.current?.focus()}
                    className="cursor-text p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-sm leading-loose tracking-wide mb-6 min-h-[100px] select-none"
                >
                    {text.split('').map((char, idx) => {
                        let colorClass = 'text-zinc-600';
                        if (idx < input.length) {
                            colorClass = input[idx] === char ? 'text-emerald-400 font-bold' : 'text-rose-400 bg-rose-950/50 underline';
                        } else if (idx === input.length) {
                            colorClass = 'text-white border-b-2 border-indigo-500 animate-pulse';
                        }
                        return (
                            <span key={idx} className={colorClass}>
                                {char}
                            </span>
                        );
                    })}
                </div>

                {/* Hidden Input to capture keystrokes */}
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInput}
                    disabled={isFinished}
                    className="opacity-0 absolute pointer-events-none"
                    autoFocus
                />

                {/* Result Announcement or Controls */}
                <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-zinc-500">
                        {isFinished ? '🎉 Speed Test Complete!' : 'Click inside and start typing code...'}
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
