import { useState, useCallback } from 'react';

/**
 * Hook for managing drag-and-drop state and logic for file tree items.
 * Handles dragging files/folders and dropping them into new locations.
 */
export function useDragAndDrop({ moveFile, moveFolder }) {
    const [draggedItem, setDraggedItem] = useState(null);
    const [dropTarget, setDropTarget] = useState(null);
    const [dropPosition, setDropPosition] = useState(null); // 'inside' for folders

    /**
     * Check if dropping source into target would create a circular reference
     * (i.e., dropping a folder into itself or its descendant)
     */
    const isInvalidDrop = useCallback((sourceId, targetId, sourceType) => {
        if (!sourceId || !targetId) return true;
        if (sourceId === targetId) return true;

        // If dragging a folder, prevent dropping into its own descendants
        if (sourceType === 'folder') {
            // targetId would start with sourceId/ if it's a descendant
            if (targetId.startsWith(sourceId + '/')) return true;
        }

        return false;
    }, []);

    /**
     * Handle drag start - store the dragged item info
     */
    const handleDragStart = useCallback((e, node) => {
        e.stopPropagation();

        const dragData = {
            id: node.id,
            name: node.name,
            type: node.type,
            fullPath: node.type === 'folder' ? node.id : node.fileData?.name,
        };

        setDraggedItem(dragData);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', JSON.stringify(dragData));

        // Add a slight delay to allow the drag image to be captured
        requestAnimationFrame(() => {
            e.target.classList.add('dragging');
        });
    }, []);

    /**
     * Handle drag over - determine if this is a valid drop target
     */
    const handleDragOver = useCallback((e, node) => {
        e.preventDefault();
        e.stopPropagation();

        if (!draggedItem) return;

        // Only allow dropping into folders
        if (node.type !== 'folder') {
            e.dataTransfer.dropEffect = 'none';
            return;
        }

        // Check for invalid drops (circular reference)
        if (isInvalidDrop(draggedItem.id, node.id, draggedItem.type)) {
            e.dataTransfer.dropEffect = 'none';
            return;
        }

        e.dataTransfer.dropEffect = 'move';
        setDropTarget(node.id);
        setDropPosition('inside');
    }, [draggedItem, isInvalidDrop]);

    /**
     * Handle drag leave - clear drop target styling
     */
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        // Only clear if we're leaving the actual target element
        const relatedTarget = e.relatedTarget;
        if (!e.currentTarget.contains(relatedTarget)) {
            setDropTarget(null);
            setDropPosition(null);
        }
    }, []);

    /**
     * Handle drop - perform the move operation
     */
    const handleDrop = useCallback((e, targetNode) => {
        e.preventDefault();
        e.stopPropagation();

        if (!draggedItem || !targetNode || targetNode.type !== 'folder') {
            setDraggedItem(null);
            setDropTarget(null);
            setDropPosition(null);
            return;
        }

        // Validate the drop
        if (isInvalidDrop(draggedItem.id, targetNode.id, draggedItem.type)) {
            setDraggedItem(null);
            setDropTarget(null);
            setDropPosition(null);
            return;
        }

        const targetPath = targetNode.id; // folder path

        if (draggedItem.type === 'file') {
            // Move single file
            moveFile(draggedItem.id, targetPath);
        } else {
            // Move entire folder - update all file paths
            const oldPath = draggedItem.id;
            const folderName = draggedItem.name;
            const newPath = targetPath + '/' + folderName;
            moveFolder(oldPath, newPath);
        }

        // Clean up drag state
        setDraggedItem(null);
        setDropTarget(null);
        setDropPosition(null);
    }, [draggedItem, isInvalidDrop, moveFile, moveFolder]);

    /**
     * Handle drag end - cleanup
     */
    const handleDragEnd = useCallback((e) => {
        e.target.classList.remove('dragging');
        setDraggedItem(null);
        setDropTarget(null);
        setDropPosition(null);
    }, []);

    return {
        draggedItem,
        dropTarget,
        dropPosition,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDragEnd,
    };
}
