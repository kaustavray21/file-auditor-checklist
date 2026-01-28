import { useState, useEffect } from 'react';

const DEFAULT_FILES = [
    { id: 1, name: 'index.html', checked: true, notes: 'Main entry point validated', priority: 'high', checkedAt: new Date().toISOString() },
    { id: 2, name: 'styles.css', checked: false, notes: '', priority: 'medium', checkedAt: null },
    { id: 3, name: 'src/app.js', checked: false, notes: 'Needs refactoring on line 45', priority: 'high', checkedAt: null },
    { id: 4, name: 'src/components/Header.js', checked: true, notes: 'Component finalized', priority: 'low', checkedAt: new Date().toISOString() },
    { id: 5, name: 'src/utils/helpers.js', checked: false, notes: '', priority: 'medium', checkedAt: null },
    { id: 6, name: 'README.md', checked: false, notes: '', priority: 'medium', checkedAt: null },
];

/**
 * Hook for managing core file CRUD operations and persistence.
 */
export function useFiles() {
    const [files, setFiles] = useState(() => {
        const saved = localStorage.getItem('checklist-data');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse saved data');
            }
        }
        return DEFAULT_FILES;
    });

    // Persist files to localStorage
    useEffect(() => {
        localStorage.setItem('checklist-data', JSON.stringify(files));
    }, [files]);

    // Set document title and favicon
    useEffect(() => {
        document.title = "File Audit Checklist";
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✅</text></svg>";
    }, []);

    const handleToggle = (id) => {
        setFiles(files.map(file => {
            if (file.id === id) {
                const isChecked = !file.checked;
                return {
                    ...file,
                    checked: isChecked,
                    checkedAt: isChecked ? new Date().toISOString() : null
                };
            }
            return file;
        }));
    };

    const handleNoteChange = (id, newNote) => {
        setFiles(files.map(file =>
            file.id === id ? { ...file, notes: newNote } : file
        ));
    };

    const handlePriorityChange = (id, newPriority) => {
        setFiles(files.map(file =>
            file.id === id ? { ...file, priority: newPriority } : file
        ));
    };

    const handleDelete = (id) => {
        setFiles(files.filter(f => f.id !== id));
    };

    const clearFiles = () => {
        setFiles([]);
    };

    const addFile = (file) => {
        setFiles([...files, file]);
    };

    const importFiles = (newFiles) => {
        setFiles(newFiles);
    };

    return {
        files,
        setFiles,
        handleToggle,
        handleNoteChange,
        handlePriorityChange,
        handleDelete,
        clearFiles,
        addFile,
        importFiles,
    };
}
