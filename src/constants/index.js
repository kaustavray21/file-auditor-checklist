/**
 * Application-wide constants
 * Centralizes magic strings and configuration values
 */

// LocalStorage keys
export const STORAGE_KEYS = {
    FILES: 'checklist-data',
    NOTES: 'fileAuditor_notes',
    RIGHT_SIDEBAR_OPEN: 'fileAuditor_rightSidebarOpen',
    SIDEBAR_WIDTH: 'sidebarWidth',
};

// Note card color options
export const NOTE_COLORS = ['default', 'yellow', 'blue', 'green', 'pink'];

// File priority options
export const PRIORITIES = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
};

// Default files for new users
export const DEFAULT_FILES = [
    { id: 1, name: 'index.html', checked: true, notes: 'Main entry point validated', priority: 'high', checkedAt: new Date().toISOString() },
    { id: 2, name: 'styles.css', checked: false, notes: '', priority: 'medium', checkedAt: null },
    { id: 3, name: 'src/app.js', checked: false, notes: 'Needs refactoring on line 45', priority: 'high', checkedAt: null },
    { id: 4, name: 'src/components/Header.js', checked: true, notes: 'Component finalized', priority: 'low', checkedAt: new Date().toISOString() },
    { id: 5, name: 'src/utils/helpers.js', checked: false, notes: '', priority: 'medium', checkedAt: null },
    { id: 6, name: 'README.md', checked: false, notes: '', priority: 'medium', checkedAt: null },
];
