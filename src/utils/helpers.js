/**
 * Returns Tailwind CSS classes for priority badge styling.
 * @param {string} priority - 'high', 'medium', or 'low'
 * @returns {string} - Tailwind class string
 */
export const getPriorityColor = (priority) => {
    switch (priority) {
        case 'high':
            return 'bg-rose-100 text-rose-700 border-rose-200';
        case 'low':
            return 'bg-stone-100 text-stone-700 border-stone-200';
        default:
            return 'bg-amber-100 text-amber-700 border-amber-200';
    }
};

/**
 * Formats an ISO date string to a localized string.
 * @param {string|null} isoString - ISO date string
 * @returns {string} - Formatted date string or empty string
 */
export const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};
