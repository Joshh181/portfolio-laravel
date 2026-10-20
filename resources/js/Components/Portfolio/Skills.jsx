import React from 'react';

export default function Skills() {
    const categories = [
        {
            name: 'Frontend',
            skills: ['Flutter', 'React', 'Inertia.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript'],
        },
        {
            name: 'Backend & Database',
            skills: ['Laravel', 'PHP', 'Eloquent ORM', 'Java', 'C++', 'MySQL', 'SQLite', 'Supabase'],
        },
        {
            name: 'Design Tools',
            skills: ['Figma', 'Blender', 'Canva', 'Adobe Photoshop', 'Adobe Illustrator', 'SketchUp'],
        },
        {
            name: 'Soft Skills',
            skills: ['Problem Solving', 'Team Collaboration', 'Self-Directed Learning', 'Attention to Detail', 'Adaptability'],
        },
    ];

    return (
        <section id="skills" className="stack-section reveal">
            <div className="sec-heading">
                <h2 className="sec-title">Tech &amp; Soft Skills</h2>
            </div>

            {categories.map((cat, idx) => (
                <div key={idx} className="stack-group">
                    <div className="stack-label">{cat.name}</div>
                    <div className="stack-pills">
                        {cat.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="stack-pill">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
