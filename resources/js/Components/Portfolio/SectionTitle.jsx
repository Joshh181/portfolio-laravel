import React from 'react';

export default function SectionTitle({ title, subtitle = null, action = null }) {
    return (
        <div className="sec-heading flex items-center justify-between mb-4">
            <div>
                <h2 className="sec-title text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
