import { useState, useEffect, useCallback, useRef } from 'react';

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
 * Optimized with useCallback for stable handler references and debounced localStorage.
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

    // Debounced localStorage persistence
    const saveTimeoutRef = useRef(null);
    useEffect(() => {
        // Clear any pending save
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        // Debounce localStorage writes by 500ms
        saveTimeoutRef.current = setTimeout(() => {
            localStorage.setItem('checklist-data', JSON.stringify(files));
        }, 500);

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [files]);

    // Set document title and favicon (only once)
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

    // Stable handler references with useCallback
    const handleToggle = useCallback((id) => {
        setFiles(prev => prev.map(file => {
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
    }, []);

    const handleToggleHasChanges = useCallback((id) => {
        setFiles(prev => prev.map(file => {
            if (file.id === id) {
                return { ...file, hasChanges: !file.hasChanges };
            }
            return file;
        }));
    }, []);

    const handleNoteChange = useCallback((id, newNote) => {
        setFiles(prev => prev.map(file =>
            file.id === id ? { ...file, notes: newNote } : file
        ));
    }, []);

    const handlePriorityChange = useCallback((id, newPriority) => {
        setFiles(prev => prev.map(file =>
            file.id === id ? { ...file, priority: newPriority } : file
        ));
    }, []);

    const handleDelete = useCallback((id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    }, []);

    const clearFiles = useCallback(() => {
        setFiles([]);
    }, []);

    const uncheckAll = useCallback(() => {
        setFiles(prev => prev.map(file => ({
            ...file,
            checked: false,
            checkedAt: null
        })));
    }, []);

    const addFile = useCallback((file) => {
        setFiles(prev => [...prev, file]);
    }, []);

    const importFiles = useCallback((newFiles) => {
        setFiles(newFiles);
    }, []);

    const moveFile = useCallback((fileId, newFolderPath) => {
        setFiles(prev => prev.map(file => {
            if (file.id === fileId) {
                const parts = file.name.split('/');
                const fileName = parts[parts.length - 1];
                const newPath = newFolderPath ? `${newFolderPath}/${fileName}` : fileName;
                return { ...file, name: newPath };
            }
            return file;
        }));
    }, []);

    const moveFolder = useCallback((oldPath, newPath) => {
        setFiles(prev => prev.map(file => {
            if (file.name === oldPath || file.name.startsWith(oldPath + '/')) {
                const updatedName = file.name.replace(oldPath, newPath);
                return { ...file, name: updatedName };
            }
            return file;
        }));
    }, []);

    return {
        files,
        setFiles,
        handleToggle,
        handleToggleHasChanges,
        handleNoteChange,
        handlePriorityChange,
        handleDelete,
        clearFiles,
        uncheckAll,
        addFile,
        importFiles,
        moveFile,
        moveFolder,
    };
}