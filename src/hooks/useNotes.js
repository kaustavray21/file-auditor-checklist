import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'fileAuditor_notes';

/**
 * Hook for managing standalone note cards.
 * Notes are stored separately from file items.
 */
export function useNotes() {
    const [notes, setNotes] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(() => {
        try {
            const saved = localStorage.getItem('fileAuditor_rightSidebarOpen');
            return saved ? JSON.parse(saved) : true;
        } catch {
            return true;
        }
    });

    // Debounced save to localStorage for smooth typing
    const saveTimeoutRef = useRef(null);
    useEffect(() => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        }, 300); // 300ms debounce

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [notes]);

    // Persist sidebar state
    useEffect(() => {
        localStorage.setItem('fileAuditor_rightSidebarOpen', JSON.stringify(isRightSidebarOpen));
    }, [isRightSidebarOpen]);

    // Add a new note
    const addNote = useCallback(() => {
        const newNote = {
            id: Date.now(),
            title: 'New Note',
            content: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            color: 'default', // default, yellow, blue, green, pink
        };
        setNotes(prev => [newNote, ...prev]);
        return newNote.id;
    }, []);

    // Update a note
    const updateNote = useCallback((id, updates) => {
        setNotes(prev => prev.map(note =>
            note.id === id
                ? { ...note, ...updates, updatedAt: new Date().toISOString() }
                : note
        ));
    }, []);

    // Delete a note
    const deleteNote = useCallback((id) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    }, []);

    // Toggle right sidebar
    const toggleRightSidebar = useCallback(() => {
        setIsRightSidebarOpen(prev => !prev);
    }, []);

    return {
        notes,
        isRightSidebarOpen,
        setIsRightSidebarOpen,
        toggleRightSidebar,
        addNote,
        updateNote,
        deleteNote,
    };
}
