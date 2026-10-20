import React, { useState } from 'react';
import { useForm, router, Link } from '@inertiajs/react';
import FormField from './FormField';

export default function ProjectForm({ project = null, isEdit = false }) {
    const [imagePreview, setImagePreview] = useState(
        project?.image ? `/storage/${project.image}` : null
    );

    // Inertia useForm maintains user typed input across validation failures automatically
    const { data, setData, post, put, processing, errors, progress } = useForm({
        title: project?.title || '',
        description: project?.description || '',
        tech_stack: project?.tech_stack || '',
        project_url: project?.project_url || '',
        repository_url: project?.repository_url || '',
        image: null,
        date_completed: project?.date_completed || new Date().toISOString().split('T')[0],
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            // When submitting multipart files on update in Laravel/PHP, use POST with _method spoofing
            if (data.image) {
                router.post(route('projects.update', project.id), {
                    _method: 'PUT',
                    ...data,
                }, {
                    forceFormData: true,
                });
            } else {
                put(route('projects.update', project.id));
            }
        } else {
            post(route('projects.store'), {
                forceFormData: true,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Title */}
            <FormField
                label="Project Title"
                name="title"
                required
                error={errors.title}
                hint="Max 100 characters. Must be unique across portfolio."
            >
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="e.g. Whack-a-Mole Mobile Game"
                    maxLength={100}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ${
                        errors.title
                            ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/30'
                            : 'border-zinc-200 dark:border-zinc-700 focus:ring-indigo-500/30 focus:border-indigo-500'
                    }`}
                />
            </FormField>

            {/* Description */}
            <FormField
                label="Project Description"
                name="description"
                required
                error={errors.description}
                hint={`${data.description.length}/1000 characters (min: 10)`}
            >
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Provide a comprehensive summary of the project goals, architecture, key features, and user impact..."
                    maxLength={1000}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 resize-y ${
                        errors.description
                            ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/30'
                            : 'border-zinc-200 dark:border-zinc-700 focus:ring-indigo-500/30 focus:border-indigo-500'
                    }`}
                />
            </FormField>

            {/* Tech Stack */}
            <FormField
                label="Tech Stack / Technologies"
                name="tech_stack"
                required
                error={errors.tech_stack}
                hint="Comma- or dot-separated tools (max 150 chars)"
            >
                <input
                    type="text"
                    id="tech_stack"
                    name="tech_stack"
                    value={data.tech_stack}
                    onChange={(e) => setData('tech_stack', e.target.value)}
                    placeholder="e.g. Laravel, Inertia.js, React, Tailwind CSS, SQLite"
                    maxLength={150}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ${
                        errors.tech_stack
                            ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/30'
                            : 'border-zinc-200 dark:border-zinc-700 focus:ring-indigo-500/30 focus:border-indigo-500'
                    }`}
                />
            </FormField>

            {/* URLs Grid (Live Demo & Repository) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    label="Live Demo URL"
                    name="project_url"
                    error={errors.project_url}
                >
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                        </span>
                        <input
                            type="url"
                            id="project_url"
                            name="project_url"
                            value={data.project_url}
                            onChange={(e) => setData('project_url', e.target.value)}
                            placeholder="https://example.vercel.app"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ${
                                errors.project_url
                                    ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/30'
                                    : 'border-zinc-200 dark:border-zinc-700 focus:ring-indigo-500/30 focus:border-indigo-500'
                            }`}
                        />
                    </div>
                </FormField>

                <FormField
                    label="Source Code / Repository URL"
                    name="repository_url"
                    error={errors.repository_url}
                >
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                            </svg>
                        </span>
                        <input
                            type="url"
                            id="repository_url"
                            name="repository_url"
                            value={data.repository_url}
                            onChange={(e) => setData('repository_url', e.target.value)}
                            placeholder="https://github.com/Joshh181/repo"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ${
                                errors.repository_url
                                    ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/30'
                                    : 'border-zinc-200 dark:border-zinc-700 focus:ring-indigo-500/30 focus:border-indigo-500'
                            }`}
                        />
                    </div>
                </FormField>
            </div>

            {/* Date Completed */}
            <FormField
                label="Date Completed"
                name="date_completed"
                required
                error={errors.date_completed}
                hint="Cannot be in the future (YYYY-MM-DD)"
            >
                <input
                    type="date"
                    id="date_completed"
                    name="date_completed"
                    value={data.date_completed}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setData('date_completed', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ${
                        errors.date_completed
                            ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/30'
                            : 'border-zinc-200 dark:border-zinc-700 focus:ring-indigo-500/30 focus:border-indigo-500'
                    }`}
                />
            </FormField>

            {/* Project Image Upload with Live Preview */}
            <FormField
                label="Project Screenshot / Banner"
                name="image"
                error={errors.image}
                hint="JPEG, PNG, JPG, or WEBP (Max 2MB)"
            >
                <div className="space-y-3">
                    <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 transition-colors">
                            <svg className="w-8 h-8 text-zinc-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                Click to browse or drag & drop project screenshot
                            </span>
                            <span className="text-[11px] text-zinc-400 mt-1">PNG, JPG, WEBP up to 2MB</span>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>

                        {imagePreview && (
                            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-900 shrink-0 shadow-md">
                                <img
                                    src={imagePreview}
                                    alt="Project preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-1.5 right-1.5 p-1 bg-black/70 hover:bg-black text-white rounded-full transition-colors"
                                    title="Remove image"
                                >
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {progress && (
                        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress.percentage}%` }}
                            ></div>
                        </div>
                    )}
                </div>
            </FormField>

            {/* Actions Bar */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '24px',
                    borderTop: '1px solid var(--border)',
                }}
            >
                <Link
                    href={route('projects.index')}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 20px',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--muted)',
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--text)';
                        e.currentTarget.style.background = 'var(--bg3)';
                        e.currentTarget.style.borderColor = 'var(--muted)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--muted)';
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                >
                    <span>Cancel</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '11px 24px',
                            background: '#6366f1',
                            color: '#ffffff',
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: processing ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 18px rgba(99, 102, 241, 0.4)',
                            transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                            opacity: processing ? 0.6 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!processing) {
                                e.currentTarget.style.background = '#4f46e5';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.65)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!processing) {
                                e.currentTarget.style.background = '#6366f1';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 18px rgba(99, 102, 241, 0.4)';
                            }
                        }}
                        onMouseDown={(e) => {
                            if (!processing) {
                                e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
                            }
                        }}
                        onMouseUp={(e) => {
                            if (!processing) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }
                        }}
                    >
                        {processing && (
                            <svg
                                style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }}
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        <span>{processing ? 'Saving Project...' : isEdit ? 'Update Project' : 'Publish Project'}</span>
                    </button>
                </div>
            </div>
        </form>
    );
}
