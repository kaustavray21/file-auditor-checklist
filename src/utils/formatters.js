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
