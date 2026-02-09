import { FilePlus, FolderPlus, RefreshCw, Minimize2 } from 'lucide-react';

export function ExplorerToolbar({ onNewFile, onNewFolder, onRefresh, onCollapseAll }) {
    return (
        <div className="flex gap-1 justify-end pb-2">
            <button
                onClick={onNewFile}
                className="p-1 text-stone-500 hover:bg-stone-200 rounded transition-colors"
                title="New File"
            >
                <FilePlus size={16} />
            </button>
            <button
                onClick={onNewFolder}
                className="p-1 text-stone-500 hover:bg-stone-200 rounded transition-colors"
                title="New Folder"
            >
                <FolderPlus size={16} />
            </button>
            <button
                onClick={onRefresh}
                className="p-1 text-stone-500 hover:bg-stone-200 rounded transition-colors"
                title="Refresh Explorer"
            >
                <RefreshCw size={16} />
            </button>
            <button
                onClick={onCollapseAll}
                className="p-1 text-stone-500 hover:bg-stone-200 rounded transition-colors"
                title="Collapse All"
            >
                <Minimize2 size={16} />
            </button>
        </div>
    );
}
