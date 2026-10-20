const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, 'ACTIVITY_DOCUMENTATION.md');
const htmlPath = path.join(__dirname, 'ACTIVITY_DOCUMENTATION.html');

let mdContent = fs.readFileSync(mdPath, 'utf8');

// Basic Markdown to HTML converter
function parseMarkdown(md) {
    let html = md
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold text-zinc-900 border-b border-zinc-200 pb-3 mb-6">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-zinc-800 border-b border-zinc-100 pb-2 mt-8 mb-4">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-zinc-800 mt-6 mb-3">$1</h3>')
        .replace(/^#### (.*$)/gim, '<h4 class="text-base font-semibold text-zinc-700 mt-4 mb-2">$1</h4>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        .replace(/`([^`]+)`/gim, '<code class="bg-zinc-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
        .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-500 bg-indigo-50/50 p-3 my-3 text-sm text-zinc-700 rounded-r-lg italic">$1</blockquote>')
        .replace(/^---$/gim, '<hr class="my-8 border-zinc-200" />');

    // Parse tables
    const tableRegex = /\|(.+)\|\n\|(?:\s*[-:]+[-| :]*\s*)\|\n((?:\|.*\|\n?)*)/g;
    html = html.replace(tableRegex, (match, header, body) => {
        const headers = header.split('|').filter(h => h.trim() !== '').map(h => `<th class="border border-zinc-200 bg-zinc-50 px-3 py-2 text-left text-xs font-bold text-zinc-700 uppercase tracking-wider">${h.trim()}</th>`).join('');
        const rows = body.trim().split('\n').map(row => {
            const cells = row.split('|').filter(c => c.trim() !== '').map(c => `<td class="border border-zinc-200 px-3 py-2 text-xs text-zinc-600">${c.trim()}</td>`).join('');
            return `<tr class="hover:bg-zinc-50/50">${cells}</tr>`;
        }).join('');

        return `<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-zinc-200 rounded-lg shadow-sm text-sm"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    });

    // Parse codeblocks
    html = html.replace(/```([a-z]*)\n([\s\S]*?)```/gim, '<pre class="bg-zinc-900 text-zinc-100 p-4 rounded-xl text-xs font-mono overflow-x-auto my-4 shadow-md"><code>$2</code></pre>');

    // Parse list items
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-5 list-disc text-sm text-zinc-600 mb-1">$1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-5 list-decimal text-sm text-zinc-600 mb-1">$1</li>');

    // Paragraphs
    html = html.split('\n\n').map(p => {
        p = p.trim();
        if (p.startsWith('<h') || p.startsWith('<div') || p.startsWith('<table') || p.startsWith('<pre') || p.startsWith('<blockquote') || p.startsWith('<hr') || p.startsWith('<li')) {
            return p;
        }
        return `<p class="text-sm leading-relaxed text-zinc-600 mb-3">${p}</p>`;
    }).join('\n');

    return html;
}

const parsedBody = parseMarkdown(mdContent);

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activity Documentation - Joshua Lumactod</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        code, pre { font-family: 'JetBrains Mono', monospace; }
        @media print {
            .no-print { display: none !important; }
            body { background: #fff !important; color: #000 !important; }
            .page-break { page-break-before: always; }
        }
    </style>
</head>
<body class="bg-zinc-100 text-zinc-900 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
    <div class="no-print fixed top-6 right-6 z-50">
        <button onclick="window.print()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-xl flex items-center gap-2 cursor-pointer transition-all">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>Print / Save as PDF</span>
        </button>
    </div>

    <div class="max-w-4xl mx-auto bg-white border border-zinc-200/80 rounded-3xl p-8 sm:p-12 shadow-xl">
        ${parsedBody}
    </div>
</body>
</html>`;

fs.writeFileSync(htmlPath, fullHtml, 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'ACTIVITY_DOCUMENTATION.html'), fullHtml, 'utf8');
console.log('HTML documentation successfully created!');
