import React from 'react';
import { Link } from '@inertiajs/react';
import CrudLayout from '../../Layouts/CrudLayout';
import ProjectForm from '../../Components/ProjectForm';

export default function Edit({ project }) {
    return (
        <CrudLayout title={`Edit: ${project.title}`}>
            <div style={{ maxWidth: '840px', margin: '0 auto', width: '100%' }}>
                {/* Breadcrumbs */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)', marginBottom: '20px' }}>
                    <Link
                        href={route('projects.index')}
                        style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.15s ease' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                    >
                        Projects
                    </Link>
                    <span>/</span>
                    <span style={{ color: 'var(--muted)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {project.title}
                    </span>
                    <span>/</span>
                    <span style={{ color: 'var(--text)', fontWeight: 600 }}>Edit</span>
                </nav>

                <div
                    style={{
                        background: 'var(--bg2)',
                        border: '1px solid var(--border)',
                        borderRadius: '20px',
                        padding: '32px',
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
                    }}
                >
                    <div style={{ marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                                    Edit Project Details
                                </h1>
                                <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '6px', margin: '6px 0 0 0' }}>
                                    Updating record #{project.id}. Unique title rule automatically excludes this record.
                                </p>
                            </div>
                            <span
                                style={{
                                    padding: '4px 10px',
                                    fontSize: '11px',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontWeight: 600,
                                    borderRadius: '8px',
                                    background: 'var(--bg3)',
                                    color: 'var(--muted2)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                ID: #{project.id}
                            </span>
                        </div>
                    </div>

                    {/* Shared Reusable Form Component */}
                    <ProjectForm project={project} isEdit={true} />
                </div>
            </div>
        </CrudLayout>
    );
}
