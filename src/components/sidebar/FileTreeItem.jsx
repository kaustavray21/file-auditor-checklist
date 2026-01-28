import {
    CheckCircle2,
    ChevronRight,
    ChevronDown,
    Folder,
    FolderOpen,
} from 'lucide-react';
import { getFileIcon } from '../../utils/fileIcons';

export function FileTreeItem({
    node,
    level,
    onSelectFolder,
    selectedFolder,
    activeFileId,
    expandedFolders,
    onToggleExpand,
}) {
    const isFolder = node.type === 'folder';
    const paddingLeft = `${level * 12 + 12}px`;
    const isOpen = expandedFolders.has(node.id);
    const isSelectedFolder = isFolder && selectedFolder === node.id;
    const isActiveFile = !isFolder && node.fileData && node.fileData.id === activeFileId;

    const handleClick = (e) => {
        e.stopPropagation();
        if (isFolder) {
            onToggleExpand(node.id);
            onSelectFolder(node.id);
        }
    };

    return (
        <div>
            <div
                onClick={handleClick}
                className={`flex items-center gap-1.5 py-1 pr-2 cursor-pointer text-sm select-none transition-colors border-l-2 ${isSelectedFolder || isActiveFile
                        ? 'bg-blue-50 text-blue-700 border-blue-500 font-medium'
                        : 'border-transparent hover:bg-stone-200/50 text-stone-700'
                    }`}
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

                {!isFolder && node.fileData && node.fileData.checked && (
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
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
