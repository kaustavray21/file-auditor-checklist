import { useState, useMemo, useEffect, useRef } from 'react';

/**
 * Hook for managing file filtering and search.
 * Optimized with debounced search for better performance with large datasets.
 */
export function useFilters(files, selectedFolder) {
    const [filter, setFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search input by 200ms
    const searchTimeoutRef = useRef(null);
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
            setDebouncedSearch(search);
        }, 200);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [search]);

    // Pre-compute folder files once for reuse
    const folderFiles = useMemo(() => {
        if (!selectedFolder) return files;

        const prefix = selectedFolder + '/';
        return files.filter(file => {
            if (!file.name.startsWith(prefix)) return false;
            const remainingPath = file.name.slice(prefix.length);
            return !remainingPath.includes('/');
        });
    }, [files, selectedFolder]);

    const filteredFiles = useMemo(() => {
        const searchLower = debouncedSearch.toLowerCase();

        return folderFiles.filter(file => {
            if (filter === 'completed' && !file.checked) return false;
            if (filter === 'pending' && file.checked) return false;
            if (filter === 'changed' && !file.hasChanges) return false;
            if (priorityFilter !== 'all' && file.priority !== priorityFilter) return false;
            if (searchLower && !file.name.toLowerCase().includes(searchLower)) return false;
            return true;
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, [folderFiles, filter, priorityFilter, debouncedSearch]);

    // Optimized stats - single pass through files
    const stats = useMemo(() => {
        const checked = files.reduce((count, f) => count + (f.checked ? 1 : 0), 0);
        const total = files.length;
        return {
            total,
            checked,
            percentage: total === 0 ? 0 : Math.round((checked / total) * 100)
        };
    }, [files]);

    // Optimized filter counts - single pass through folderFiles
    const filterCounts = useMemo(() => {
        let pending = 0, completed = 0, changed = 0;

        for (const file of folderFiles) {
            if (file.checked) completed++;
            else pending++;
            if (file.hasChanges) changed++;
        }

        return {
            all: folderFiles.length,
            pending,
            completed,
            changed,
        };
    }, [folderFiles]);

    return {
        filter,
        setFilter,
        priorityFilter,
        setPriorityFilter,
        search,
        setSearch,
        filteredFiles,
        stats,
        filterCounts,
    };
}
