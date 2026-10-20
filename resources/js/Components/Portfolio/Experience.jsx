import React from 'react';

export default function Experience() {
    const items = [
        { role: 'College Student', place: 'BS Information Technology', year: '2024', filled: true },
        { role: 'Senior High School', place: 'GAS Track', year: '2022–2024', filled: false },
        { role: 'Junior High School', place: 'Commenced my studies', year: '2018–2022', filled: false },
        { role: 'Elementary School', place: 'Early foundations', year: '2011–2018', filled: false },
        { role: 'Hello World! 👋', place: 'Wrote my first line of code', year: '2024', filled: false },
    ];

    return (
        <section id="experience" className="exp-section reveal">
            <h2 className="sec-title" style={{ marginBottom: '16px' }}>Experience</h2>

            {items.map((item, idx) => (
                <div key={idx} className="exp-item">
                    <div className={`exp-checkbox ${item.filled ? 'filled' : ''}`}></div>
                    <div className="exp-info">
                        <div className="exp-role">{item.role}</div>
                        <div className="exp-place">{item.place}</div>
                    </div>
                    <div className="exp-year">{item.year}</div>
                </div>
            ))}
        </section>
    );
}
