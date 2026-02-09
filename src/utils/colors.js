import { PRIORITIES } from '../constants';

/**
 * Returns Tailwind CSS classes for priority badge styling.
 * @param {string} priority - 'high', 'medium', or 'low'
 * @returns {string} - Tailwind class string
 */
export const getPriorityColor = (priority) => {
    switch (priority) {
        case PRIORITIES.HIGH:
            return 'bg-rose-100 text-rose-700 border-rose-200';
        case PRIORITIES.LOW:
            return 'bg-stone-100 text-stone-700 border-stone-200';
        case PRIORITIES.MEDIUM:
        default:
            return 'bg-amber-100 text-amber-700 border-amber-200';
    }
};
