import React, { useEffect } from 'react';

export default function DeleteModal({
    isOpen,
    project,
    title = 'Delete Project',
    message = null,
    confirmText = 'Yes, Delete Project',
    isDeleting = false,
    isProcessing = false,
    onConfirm,
    onClose,
    onCancel,
}) {
    const handleClose = onClose || onCancel || (() => {});
    const deleting = Boolean(isDeleting || isProcessing);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen && !deleting) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, deleting, handleClose]);

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.72)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
            }}
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
                if (e.target === e.currentTarget && !deleting) {
                    handleClose();
                }
            }}
        >
            <div
                style={{
                    background: 'var(--bg2)',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    maxWidth: '460px',
                    width: '100%',
                    padding: '24px 28px',
                    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.35)',
                    boxSizing: 'border-box',
                    animation: 'modalSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {/* Header Icon + Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div
                        style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            background: 'rgba(244, 63, 94, 0.12)',
                            color: '#f43f5e',
                            border: '1px solid rgba(244, 63, 94, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.3 }}>
                            {title}
                        </h3>
                        <p style={{ fontSize: '12px', color: '#f43f5e', margin: '3px 0 0 0', fontWeight: 500 }}>
                            Warning: This action is permanent and cannot be undone.
                        </p>
                    </div>
                </div>

                {/* Target Project Card Summary */}
                {project && (
                    <div
                        style={{
                            padding: '12px 14px',
                            background: 'var(--bg3)',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            marginBottom: '16px',
                        }}
                    >
                        <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text)', lineHeight: 1.3 }}>
                            {project.title}
                        </div>
                        {project.description && (
                            <div
                                style={{
                                    fontSize: '11px',
                                    color: 'var(--muted)',
                                    marginTop: '4px',
                                    lineHeight: 1.4,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {project.description}
                            </div>
                        )}
                    </div>
                )}

                {/* Body Message */}
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5, margin: '0 0 24px 0' }}>
                    {message ||
                        `Are you sure you want to permanently delete "${project?.title || 'this project'}" from your database? It will immediately disappear from your portfolio showcase.`}
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={deleting}
                        style={{
                            padding: '9px 16px',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: 'var(--muted)',
                            background: 'transparent',
                            border: '1px solid var(--border)',
                            borderRadius: '10px',
                            cursor: deleting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (!deleting) {
                                e.currentTarget.style.color = 'var(--text)';
                                e.currentTarget.style.background = 'var(--bg3)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!deleting) {
                                e.currentTarget.style.color = 'var(--muted)';
                                e.currentTarget.style.background = 'transparent';
                            }
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={deleting}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '9px 18px',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#ffffff',
                            background: '#f43f5e',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: deleting ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)',
                            transition: 'all 0.15s ease',
                            opacity: deleting ? 0.6 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!deleting) {
                                e.currentTarget.style.background = '#e11d48';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!deleting) {
                                e.currentTarget.style.background = '#f43f5e';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        {deleting && (
                            <svg
                                style={{ width: '14px', height: '14px', animation: 'spin 1s linear infinite' }}
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        <span>{deleting ? 'Deleting...' : confirmText}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
