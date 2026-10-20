import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import CrudLayout from '../../Layouts/CrudLayout';
import DeleteModal from '../../Components/DeleteModal';

function getProjectBadge(project) {
    const title = (project.title || '').toLowerCase();
    if (title.includes('game') || title.includes('mole')) {
        return {
            gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="6" y1="12" x2="10" y2="12"></line>
                    <line x1="8" y1="10" x2="8" y2="14"></line>
                    <line x1="15" y1="13" x2="15.01" y2="13"></line>
                    <line x1="18" y1="11" x2="18.01" y2="11"></line>
                    <rect x="2" y="6" width="20" height="12" rx="6"></rect>
                </svg>
            ),
        };
    }
    if (title.includes('sched') || title.includes('ai') || title.includes('calendar')) {
        return {
            gradient: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                </svg>
            ),
        };
    }
    if (title.includes('3d') || title.includes('design') || title.includes('blender')) {
        return {
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
            ),
        };
    }
    return {
        gradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
        ),
    };
}

export default function Index({ projects, filters, totalCount }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters?.search || '');
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('projects.index'),
            { search },
            { preserveState: true, replace: true }
        );
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get(route('projects.index'), {}, { preserveState: true, replace: true });
    };

    const confirmDelete = (project) => {
        setProjectToDelete(project);
    };

    const handleDelete = () => {
        if (!projectToDelete) return;
        setIsDeleting(true);
        router.delete(route('projects.destroy', projectToDelete.id), {
            onSuccess: () => {
                setProjectToDelete(null);
                setIsDeleting(false);
            },
            onError: () => {
                setIsDeleting(false);
            },
        });
    };

    return (
        <CrudLayout title="Manage Projects" flash={flash}>
            {/* Header Section */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    marginBottom: '28px',
                }}
            >
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h1
                            style={{
                                fontSize: '26px',
                                fontWeight: 700,
                                letterSpacing: '-0.5px',
                                color: 'var(--text)',
                                margin: 0,
                                lineHeight: 1.2,
                            }}
                        >
                            Projects Showcase
                        </h1>
                        <span
                            style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '3px 10px',
                                borderRadius: '999px',
                                background: 'rgba(99, 102, 241, 0.12)',
                                color: '#6366f1',
                                border: '1px solid rgba(99, 102, 241, 0.28)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.4px',
                            }}
                        >
                            {projects.length} {projects.length === 1 ? 'Record' : 'Records'}
                        </span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '6px', margin: '6px 0 0 0' }}>
                        Dynamic CRUD control center: create, update, or remove projects shown on your live portfolio.
                    </p>
                </div>

                <div>
                    <Link
                        href={route('projects.create')}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            background: '#6366f1',
                            color: '#ffffff',
                            borderRadius: '11px',
                            fontSize: '13px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.38)',
                            transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#4f46e5';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#6366f1';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>Add New Project</span>
                    </Link>
                </div>
            </div>

            {/* Search Filter Bar */}
            <div
                style={{
                    background: 'var(--bg2)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    marginBottom: '24px',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            >
                <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                    <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                        <span
                            style={{
                                position: 'absolute',
                                left: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                pointerEvents: 'none',
                                color: 'var(--muted)',
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title, description, or tech stack (e.g., React, Laravel)..."
                            style={{
                                width: '100%',
                                height: '42px',
                                padding: '0 40px 0 42px',
                                fontSize: '13px',
                                color: 'var(--text)',
                                background: 'var(--bg)',
                                border: '1px solid var(--border)',
                                borderRadius: '10px',
                                outline: 'none',
                                transition: 'border-color 0.15s ease',
                                boxSizing: 'border-box',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
                            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: 'var(--bg3)',
                                    color: 'var(--muted)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    lineHeight: 1,
                                }}
                                title="Clear Search"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                        style={{
                            height: '42px',
                            padding: '0 20px',
                            background: '#6366f1',
                            color: '#ffffff',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'background 0.15s ease',
                            whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#4f46e5')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#6366f1')}
                    >
                        <span>Filter</span>
                    </button>
                    {search && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            style={{
                                height: '42px',
                                padding: '0 16px',
                                background: 'transparent',
                                color: 'var(--muted)',
                                borderRadius: '10px',
                                fontSize: '13px',
                                border: '1px solid var(--border)',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--text)';
                                e.currentTarget.style.background = 'var(--bg3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--muted)';
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            Reset
                        </button>
                    )}
                </form>
            </div>

            {/* Projects Table Card Container */}
            {projects.length === 0 ? (
                <div
                    style={{
                        background: 'var(--bg2)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        padding: '64px 24px',
                        textAlign: 'center',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                >
                    <div
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            color: '#6366f1',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', margin: '0 0 6px 0' }}>
                        {search ? 'No projects match your search criteria' : 'No projects in database yet'}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
                        {search
                            ? `No records found for "${search}". Try refining your keywords or clear the filter.`
                            : 'Get started by creating your first portfolio project entry.'}
                    </p>
                    <div style={{ marginTop: '20px' }}>
                        {search ? (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                style={{
                                    color: '#6366f1',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    textDecoration: 'underline',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Clear search query
                            </button>
                        ) : (
                            <Link
                                href={route('projects.create')}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '9px 18px',
                                    background: '#6366f1',
                                    color: '#ffffff',
                                    borderRadius: '10px',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                }}
                            >
                                Add First Project
                            </Link>
                        )}
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        background: 'var(--bg2)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        width: '100%',
                        boxSizing: 'border-box',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    }}
                >
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table
                            style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                textAlign: 'left',
                                fontSize: '13px',
                                tableLayout: 'fixed',
                            }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        background: 'var(--bg3)',
                                        borderBottom: '1px solid var(--border)',
                                        color: 'var(--muted)',
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.6px',
                                    }}
                                >
                                    <th style={{ width: '46%', padding: '14px 20px', fontWeight: 600 }}>
                                        Project &amp; Description
                                    </th>
                                    <th style={{ width: '28%', padding: '14px 20px', fontWeight: 600 }}>
                                        Tech Stack
                                    </th>
                                    <th style={{ width: '12%', padding: '14px 20px', fontWeight: 600 }}>
                                        Completed
                                    </th>
                                    <th style={{ width: '14%', padding: '14px 20px', fontWeight: 600, textAlign: 'right' }}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, idx) => {
                                    const badge = getProjectBadge(project);
                                    return (
                                        <tr
                                            key={project.id}
                                            style={{
                                                borderBottom: idx === projects.length - 1 ? 'none' : '1px solid var(--border)',
                                                transition: 'background 0.15s ease',
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg3)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                        >
                                            {/* Column 1: Project Info & Description */}
                                            <td style={{ padding: '18px 20px', verticalAlign: 'middle' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                    <div
                                                        style={{
                                                            width: '46px',
                                                            height: '46px',
                                                            borderRadius: '12px',
                                                            overflow: 'hidden',
                                                            background: badge.gradient,
                                                            border: '1px solid rgba(255, 255, 255, 0.15)',
                                                            flexShrink: 0,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                                        }}
                                                    >
                                                        {project.image ? (
                                                            <img
                                                                src={`/storage/${project.image}`}
                                                                alt={project.title}
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            badge.icon
                                                        )}
                                                    </div>

                                                    <div style={{ minWidth: 0, flex: 1 }}>
                                                        <div
                                                            style={{
                                                                fontWeight: 600,
                                                                fontSize: '14px',
                                                                color: 'var(--text)',
                                                                lineHeight: 1.3,
                                                            }}
                                                        >
                                                            {project.title}
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize: '12px',
                                                                color: 'var(--muted)',
                                                                marginTop: '4px',
                                                                lineHeight: 1.5,
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',
                                                            }}
                                                        >
                                                            {project.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Column 2: Tech Stack Badges */}
                                            <td style={{ padding: '18px 20px', verticalAlign: 'middle' }}>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                    {project.tech_stack ? (
                                                        project.tech_stack.split(/[,·•]/).map((tech, techIdx) => {
                                                            const cleanTech = tech.trim();
                                                            if (!cleanTech) return null;
                                                            return (
                                                                <span
                                                                    key={techIdx}
                                                                    style={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        padding: '3px 9px',
                                                                        borderRadius: '6px',
                                                                        fontSize: '11px',
                                                                        fontWeight: 500,
                                                                        background: 'var(--bg)',
                                                                        color: 'var(--text)',
                                                                        border: '1px solid var(--border)',
                                                                        whiteSpace: 'nowrap',
                                                                    }}
                                                                >
                                                                    {cleanTech}
                                                                </span>
                                                            );
                                                        })
                                                    ) : (
                                                        <span style={{ color: 'var(--muted)', fontSize: '12px' }}>—</span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Column 3: Date Completed */}
                                            <td
                                                style={{
                                                    padding: '18px 20px',
                                                    verticalAlign: 'middle',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: '12px',
                                                    color: 'var(--muted2)',
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                }}
                                            >
                                                {project.date_completed}
                                            </td>

                                            {/* Column 4: Actions */}
                                            <td style={{ padding: '18px 20px', verticalAlign: 'middle', textAlign: 'right' }}>
                                                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                                    <Link
                                                        href={route('projects.edit', project.id)}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            padding: '6px 12px',
                                                            fontSize: '12px',
                                                            fontWeight: 600,
                                                            color: 'var(--text)',
                                                            background: 'var(--bg)',
                                                            border: '1px solid var(--border)',
                                                            borderRadius: '8px',
                                                            textDecoration: 'none',
                                                            transition: 'all 0.15s ease',
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.borderColor = '#6366f1';
                                                            e.currentTarget.style.color = '#6366f1';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.borderColor = 'var(--border)';
                                                            e.currentTarget.style.color = 'var(--text)';
                                                        }}
                                                    >
                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg>
                                                        <span>Edit</span>
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() => confirmDelete(project)}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            padding: '6px 12px',
                                                            fontSize: '12px',
                                                            fontWeight: 600,
                                                            color: '#f43f5e',
                                                            background: 'rgba(244, 63, 94, 0.08)',
                                                            border: '1px solid rgba(244, 63, 94, 0.28)',
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.15s ease',
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background = '#f43f5e';
                                                            e.currentTarget.style.color = '#ffffff';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background = 'rgba(244, 63, 94, 0.08)';
                                                            e.currentTarget.style.color = '#f43f5e';
                                                        }}
                                                    >
                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        </svg>
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Confirmation Delete Modal */}
            <DeleteModal
                isOpen={Boolean(projectToDelete)}
                project={projectToDelete}
                title="Delete Project Entry"
                message={`Are you sure you want to permanently delete "${projectToDelete?.title}"? This action removes the project and its stored images from the database and cannot be undone.`}
                confirmText={isDeleting ? 'Deleting...' : 'Yes, Delete Project'}
                isDeleting={isDeleting}
                onConfirm={handleDelete}
                onClose={() => setProjectToDelete(null)}
            />
        </CrudLayout>
    );
}
