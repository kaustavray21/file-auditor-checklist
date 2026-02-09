import {
    FileJson,
    FileText,
    FileImage,
    FileCode,
    FileVideo,
    FileAudio,
    FileArchive,
    FileSpreadsheet,
    FileType,
    FileTerminal,
    FileCog,
    FileKey,
    FileLock,
    FileWarning,
    FileCheck,
    File as FileIcon,
} from 'lucide-react';

// Color mapping for different file types
const iconColors = {
    json: 'text-yellow-600',
    yaml: 'text-purple-500',
    md: 'text-blue-500',
    txt: 'text-stone-500',
    image: 'text-pink-500',
    video: 'text-red-500',
    audio: 'text-green-500',
    archive: 'text-amber-600',
    spreadsheet: 'text-emerald-600',
    font: 'text-indigo-500',
    js: 'text-yellow-500',
    ts: 'text-blue-600',
    jsx: 'text-cyan-500',
    tsx: 'text-blue-500',
    html: 'text-orange-500',
    css: 'text-blue-400',
    scss: 'text-pink-400',
    py: 'text-green-600',
    java: 'text-red-600',
    go: 'text-cyan-600',
    rust: 'text-orange-600',
    rb: 'text-red-500',
    php: 'text-violet-500',
    c: 'text-blue-700',
    cpp: 'text-blue-600',
    sh: 'text-green-500',
    config: 'text-stone-600',
    lock: 'text-amber-500',
    env: 'text-yellow-600',
    key: 'text-rose-500',
    log: 'text-stone-400',
    default: 'text-stone-400',
};

/**
 * Returns the appropriate icon component based on file extension.
 * @param {string} filename - The name of the file
 * @param {number} size - Icon size (default: 16)
 * @returns {JSX.Element} - The icon component with appropriate color
 */
export const getFileIcon = (filename, size = 16) => {
    const extension = filename.split('.').pop().toLowerCase();
    const baseName = filename.split('/').pop().toLowerCase();

    // Special file names
    if (baseName === '.env' || baseName.startsWith('.env.')) {
        return <FileCog size={size} className={iconColors.env} />;
    }
    if (baseName === 'package-lock.json' || baseName === 'yarn.lock' || baseName === 'pnpm-lock.yaml') {
        return <FileLock size={size} className={iconColors.lock} />;
    }
    if (baseName === '.gitignore' || baseName === '.dockerignore') {
        return <FileWarning size={size} className={iconColors.config} />;
    }
    if (baseName === 'dockerfile' || baseName.startsWith('docker-compose')) {
        return <FileCog size={size} className="text-blue-500" />;
    }

    switch (extension) {
        // JSON & Config
        case 'json':
            return <FileJson size={size} className={iconColors.json} />;
        case 'yaml':
        case 'yml':
            return <FileCog size={size} className={iconColors.yaml} />;
        case 'toml':
        case 'ini':
        case 'conf':
        case 'config':
            return <FileCog size={size} className={iconColors.config} />;

        // Documents
        case 'md':
        case 'mdx':
            return <FileText size={size} className={iconColors.md} />;
        case 'txt':
        case 'rtf':
            return <FileText size={size} className={iconColors.txt} />;
        case 'pdf':
            return <FileText size={size} className="text-red-500" />;
        case 'doc':
        case 'docx':
            return <FileText size={size} className="text-blue-600" />;

        // Images
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'svg':
        case 'webp':
        case 'ico':
        case 'bmp':
        case 'tiff':
            return <FileImage size={size} className={iconColors.image} />;

        // Video
        case 'mp4':
        case 'webm':
        case 'mov':
        case 'avi':
        case 'mkv':
        case 'flv':
            return <FileVideo size={size} className={iconColors.video} />;

        // Audio
        case 'mp3':
        case 'wav':
        case 'ogg':
        case 'flac':
        case 'aac':
        case 'm4a':
            return <FileAudio size={size} className={iconColors.audio} />;

        // Archives
        case 'zip':
        case 'rar':
        case 'tar':
        case 'gz':
        case '7z':
        case 'bz2':
            return <FileArchive size={size} className={iconColors.archive} />;

        // Spreadsheets
        case 'csv':
        case 'xls':
        case 'xlsx':
            return <FileSpreadsheet size={size} className={iconColors.spreadsheet} />;

        // Fonts
        case 'ttf':
        case 'otf':
        case 'woff':
        case 'woff2':
        case 'eot':
            return <FileType size={size} className={iconColors.font} />;

        // JavaScript / TypeScript
        case 'js':
        case 'mjs':
        case 'cjs':
            return <FileCode size={size} className={iconColors.js} />;
        case 'jsx':
            return <FileCode size={size} className={iconColors.jsx} />;
        case 'ts':
        case 'mts':
        case 'cts':
            return <FileCode size={size} className={iconColors.ts} />;
        case 'tsx':
            return <FileCode size={size} className={iconColors.tsx} />;

        // Web
        case 'html':
        case 'htm':
            return <FileCode size={size} className={iconColors.html} />;
        case 'css':
            return <FileCode size={size} className={iconColors.css} />;
        case 'scss':
        case 'sass':
        case 'less':
            return <FileCode size={size} className={iconColors.scss} />;

        // Python
        case 'py':
        case 'pyw':
        case 'pyx':
            return <FileCode size={size} className={iconColors.py} />;

        // Java / JVM
        case 'java':
        case 'jar':
        case 'class':
            return <FileCode size={size} className={iconColors.java} />;
        case 'kt':
        case 'kts':
            return <FileCode size={size} className="text-purple-500" />;

        // Go
        case 'go':
            return <FileCode size={size} className={iconColors.go} />;

        // Rust
        case 'rs':
            return <FileCode size={size} className={iconColors.rust} />;

        // Ruby
        case 'rb':
        case 'erb':
            return <FileCode size={size} className={iconColors.rb} />;

        // PHP
        case 'php':
            return <FileCode size={size} className={iconColors.php} />;

        // C / C++
        case 'c':
        case 'h':
            return <FileCode size={size} className={iconColors.c} />;
        case 'cpp':
        case 'cc':
        case 'cxx':
        case 'hpp':
            return <FileCode size={size} className={iconColors.cpp} />;

        // C#
        case 'cs':
            return <FileCode size={size} className="text-green-600" />;

        // Swift
        case 'swift':
            return <FileCode size={size} className="text-orange-500" />;

        // Shell
        case 'sh':
        case 'bash':
        case 'zsh':
        case 'fish':
            return <FileTerminal size={size} className={iconColors.sh} />;
        case 'ps1':
        case 'bat':
        case 'cmd':
            return <FileTerminal size={size} className="text-blue-500" />;

        // SQL
        case 'sql':
            return <FileCode size={size} className="text-amber-500" />;

        // Lock / Key files
        case 'lock':
            return <FileLock size={size} className={iconColors.lock} />;
        case 'key':
        case 'pem':
        case 'crt':
        case 'cer':
            return <FileKey size={size} className={iconColors.key} />;

        // Logs
        case 'log':
            return <FileText size={size} className={iconColors.log} />;

        // GraphQL
        case 'graphql':
        case 'gql':
            return <FileCode size={size} className="text-pink-600" />;

        // Vue / Svelte
        case 'vue':
            return <FileCode size={size} className="text-green-500" />;
        case 'svelte':
            return <FileCode size={size} className="text-orange-600" />;

        default:
            return <FileIcon size={size} className={iconColors.default} />;
    }
};
