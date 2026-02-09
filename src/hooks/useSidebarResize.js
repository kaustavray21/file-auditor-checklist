import { useState, useEffect, useCallback, useRef } from 'react';
import { STORAGE_KEYS } from '../constants';

/**
 * Hook for managing resizable sidebar functionality.
 * Uses refs and direct DOM manipulation for smooth, lag-free resizing.
 */
export function useSidebarResize() {
    const MIN_WIDTH = 200;
    const MAX_WIDTH = 600;
    const DEFAULT_WIDTH = 384; // 96 * 4 = w-96 in Tailwind

    const [sidebarWidth, setSidebarWidth] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.SIDEBAR_WIDTH);
        return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
    });

    const [isResizing, setIsResizing] = useState(false);
    const isResizingRef = useRef(false);
    const startXRef = useRef(0);
    const startWidthRef = useRef(0);
    const currentWidthRef = useRef(sidebarWidth);
    const sidebarRef = useRef(null);
    const rafRef = useRef(null);

    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        isResizingRef.current = true;
        setIsResizing(true);
        startXRef.current = e.clientX;
        startWidthRef.current = currentWidthRef.current;

        // Find sidebar element if not already set
        if (!sidebarRef.current) {
            sidebarRef.current = e.target.closest('aside');
        }

        // Disable transitions during resize for immediate feedback
        if (sidebarRef.current) {
            sidebarRef.current.style.transition = 'none';
        }
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizingRef.current) return;

            // Cancel any pending animation frame
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            // Use requestAnimationFrame for smooth updates
            rafRef.current = requestAnimationFrame(() => {
                const delta = e.clientX - startXRef.current;
                const newWidth = Math.min(Math.max(startWidthRef.current + delta, MIN_WIDTH), MAX_WIDTH);
                currentWidthRef.current = newWidth;

                // Direct DOM manipulation for immediate visual feedback
                if (sidebarRef.current) {
                    sidebarRef.current.style.width = `${newWidth}px`;
                }
            });
        };

        const handleMouseUp = () => {
            if (!isResizingRef.current) return;

            // Cancel any pending animation frame
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            isResizingRef.current = false;
            setIsResizing(false);

            // Re-enable transitions
            if (sidebarRef.current) {
                sidebarRef.current.style.transition = '';
            }

            // Sync final width to React state and localStorage
            setSidebarWidth(currentWidthRef.current);
            localStorage.setItem(STORAGE_KEYS.SIDEBAR_WIDTH, currentWidthRef.current.toString());
        };

        // Add listeners to document for global mouse tracking
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    // Update body styles during resize
    useEffect(() => {
        if (isResizing) {
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    }, [isResizing]);

    return {
        sidebarWidth,
        isResizing,
        handleMouseDown,
    };
}
