import React from 'react';
import { Link } from '@inertiajs/react';

export default function ProjectsSection({ projects = [] }) {
    return (
        <section id="projects" className="projects-section reveal">
            <div className="sec-heading">
                <h2 className="sec-title">Recent Projects</h2>
                <Link
                    href={route('projects.index')}
                    className="sec-link"
                    style={{
                        color: '#6366f1',
                        fontWeight: 600,
                        fontSize: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}
                    title="Manage CRUD in Database"
                >
                    <span>Manage CRUD &rarr;</span>
                </Link>
            </div>

            <div className="projects-grid">
                {projects.length === 0 ? (
                    <div style={{ padding: '24px', textAlign: 'center', gridColumn: '1 / -1', border: '1px dashed var(--border)', borderRadius: '12px' }}>
                        <p style={{ color: 'var(--muted)', fontSize: '13px' }}>No projects currently stored in the database.</p>
                        <Link href={route('projects.create')} style={{ color: '#6366f1', fontSize: '12px', fontWeight: 600, marginTop: '8px', display: 'inline-block' }}>
                            Add your first project &rarr;
                        </Link>
                    </div>
                ) : (
                    projects.map((project) => {
                        const hasUrl = Boolean(project.project_url || project.repository_url);
                        const href = project.project_url || project.repository_url || '#';

                        const CardWrapper = hasUrl ? 'a' : 'div';
                        const linkProps = hasUrl ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

                        return (
                            <CardWrapper
                                key={project.id}
                                className="project-card"
                                {...linkProps}
                            >
                                {project.image && (
                                    <div style={{ width: '100%', height: '130px', marginBottom: '12px', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg2)' }}>
                                        <img
                                            src={`/storage/${project.image}`}
                                            alt={project.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                                <div className="project-card-name">{project.title}</div>
                                <div className="project-card-desc">{project.description}</div>
                                {project.tech_stack && (
                                    <span className="project-card-url">{project.tech_stack}</span>
                                )}
                            </CardWrapper>
                        );
                    })
                )}
            </div>
        </section>
    );
}
