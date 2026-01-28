import { useState, useMemo } from 'react';

/**
 * Hook for managing file filtering and search.
 */
export function useFilters(files, selectedFolder) {
    const [filter, setFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filteredFiles = useMemo(() => {
        return files.filter(file => {
            if (filter === 'completed' && !file.checked) return false;
            if (filter === 'pending' && file.checked) return false;
            if (priorityFilter !== 'all' && file.priority !== priorityFilter) return false;
            if (search && !file.name.toLowerCase().includes(search.toLowerCase())) return false;
            if (selectedFolder) {
                return file.name.startsWith(selectedFolder + '/');
            }
            return true;
        });
    }, [files, filter, priorityFilter, search, selectedFolder]);

    const stats = useMemo(() => ({
        total: files.length,
        checked: files.filter(f => f.checked).length,
        percentage: files.length === 0 ? 0 : Math.round((files.filter(f => f.checked).length / files.length) * 100)
    }), [files]);

    return {
        filter,
        setFilter,
        priorityFilter,
        setPriorityFilter,
        search,
        setSearch,
        filteredFiles,
        stats,
    };
}
