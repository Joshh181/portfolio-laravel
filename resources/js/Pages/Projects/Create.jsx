import React from 'react';
import { Link } from '@inertiajs/react';
import CrudLayout from '../../Layouts/CrudLayout';
import ProjectForm from '../../Components/ProjectForm';

export default function Create() {
    return (
        <CrudLayout title="Add New Project">
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
                    <span style={{ color: 'var(--text)', fontWeight: 600 }}>Create New Project</span>
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
                        <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                            Add New Portfolio Project
                        </h1>
                        <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '6px', margin: '6px 0 0 0' }}>
                            Fill out the project fields. Backend validation enforces unique titles, length limits, and supported image formats.
                        </p>
                    </div>

                    {/* Shared Reusable Form Component */}
                    <ProjectForm isEdit={false} />
                </div>
            </div>
        </CrudLayout>
    );
}
