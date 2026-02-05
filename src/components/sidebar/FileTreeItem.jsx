import { memo } from 'react';
import {
    CheckCircle2,
    ChevronRight,
    ChevronDown,
    Folder,
    FolderOpen,
} from 'lucide-react';
import { getFileIcon } from '../../utils/fileIcons';

export const FileTreeItem = memo(function FileTreeItem({
    node,
    level,
    onSelectFolder,
    selectedFolder,
    activeFileId,
    expandedFolders,
    onToggleExpand,
    folderCompletionStatus,
    // Drag and drop props
    draggedItem,
    dropTarget,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
}) {
    const isFolder = node.type === 'folder';
    const paddingLeft = `${level * 12 + 12}px`;
    const isOpen = expandedFolders.has(node.id);
    const isSelectedFolder = isFolder && selectedFolder === node.id;
    const isActiveFile = !isFolder && node.fileData && node.fileData.id === activeFileId;

    // Drag and drop state
    const isDragging = draggedItem && draggedItem.id === node.id;
    const isDropTarget = isFolder && dropTarget === node.id && !isDragging;

    // Folder completion state - show green checkmark when all files in folder are checked
    const isFolderComplete = isFolder && folderCompletionStatus && folderCompletionStatus[node.id];

    const handleClick = (e) => {
        e.stopPropagation();
        if (isFolder) {
            onToggleExpand(node.id);
            onSelectFolder(node.id);
        }
    };

    // Drag handlers
    const handleDragStart = (e) => {
        if (onDragStart) onDragStart(e, node);
    };

    const handleDragOver = (e) => {
        if (onDragOver) onDragOver(e, node);
    };

    const handleDragLeave = (e) => {
        if (onDragLeave) onDragLeave(e);
    };

    const handleDrop = (e) => {
        if (onDrop) onDrop(e, node);
    };

    const handleDragEnd = (e) => {
        if (onDragEnd) onDragEnd(e);
    };

    // Build dynamic class names
    let itemClasses = `flex items-center gap-1.5 py-1 pr-2 cursor-pointer text-sm select-none transition-all border-l-2 `;

    if (isSelectedFolder || isActiveFile) {
        itemClasses += 'bg-blue-50 text-blue-700 border-blue-500 font-medium ';
    } else {
        itemClasses += 'border-transparent hover:bg-stone-200/50 text-stone-700 ';
    }

    // Drag state classes
    if (isDragging) {
        itemClasses += 'opacity-50 ';
    }
    if (isDropTarget) {
        itemClasses += 'bg-blue-100 border-blue-400 ring-2 ring-blue-300 ring-inset ';
    }

    return (
        <div>
            <div
                onClick={handleClick}
                draggable={true}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                className={itemClasses}
                style={{ paddingLeft }}
            >
                <span className={`shrink-0 ${isSelectedFolder || isActiveFile ? 'text-blue-500' : 'text-stone-400'}`}>
                    {isFolder ? (
                        isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    ) : (
                        <div className="w-3.5" />
                    )}
                </span>

                <span
                    className={`shrink-0 ${isFolder
                        ? isSelectedFolder
                            ? 'text-blue-600'
                            : isDropTarget
                                ? 'text-blue-500'
                                : 'text-blue-500'
                        : isActiveFile
                            ? 'text-blue-600'
                            : 'text-stone-400'
                        }`}
                >
                    {isFolder ? (
                        isOpen ? <FolderOpen size={16} /> : <Folder size={16} />
                    ) : (
                        getFileIcon(node.name)
                    )}
                </span>

                <span className="truncate">{node.name}</span>

                {/* Show checkmark for completed files */}
                {!isFolder && node.fileData && node.fileData.checked && (
                    <CheckCircle2 size={14} className="ml-auto text-emerald-500 shrink-0" />
                )}

                {/* Show checkmark for completed folders (all files checked) */}
                {isFolder && isFolderComplete && (
                    <CheckCircle2 size={14} className="ml-auto text-emerald-500 shrink-0" />
                )}
            </div>

            {isFolder && isOpen && (
                <div>
                    {node.children.map((child) => (
                        <FileTreeItem
                            key={child.id}
                            node={child}
                            level={level + 1}
                            onSelectFolder={onSelectFolder}
                            selectedFolder={selectedFolder}
                            activeFileId={activeFileId}
                            expandedFolders={expandedFolders}
                            onToggleExpand={onToggleExpand}
                            folderCompletionStatus={folderCompletionStatus}
                            // Pass drag and drop props down
                            draggedItem={draggedItem}
                            dropTarget={dropTarget}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            onDragEnd={onDragEnd}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});
