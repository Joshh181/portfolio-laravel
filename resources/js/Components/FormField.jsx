import React from 'react';

export default function FormField({
    label,
    name,
    error,
    required = false,
    hint = null,
    children,
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label htmlFor={name} className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {label}
                    {required && <span className="ml-1 text-rose-500 font-bold">*</span>}
                </label>
                {hint && <span className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</span>}
            </div>

            {children}

            {error && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium mt-1 animate-fadeIn">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
