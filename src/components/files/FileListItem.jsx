import { memo, useState, useEffect, useCallback, useRef } from 'react';
import { CheckCircle2, Circle, Trash2, Clock, FolderSymlink, FilePenLine, Copy } from 'lucide-react';
import { getPriorityColor, formatDate } from '../../utils/helpers';

export const FileListItem = memo(function FileListItem({
    file,
    onToggle,
    onToggleHasChanges,
    onNoteChange,
    onPriorityChange,
    onDelete,
    onReveal,
}) {
    // Context menu state
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

    // Local state for smooth typing
    const [localNotes, setLocalNotes] = useState(file.notes);

    // Sync from props when file.notes changes externally
    useEffect(() => {
        setLocalNotes(file.notes);
    }, [file.notes]);

    // Debounced sync to parent (300ms)
    useEffect(() => {
        if (localNotes === file.notes) return;
        const timeout = setTimeout(() => {
            onNoteChange(file.id, localNotes);
        }, 300);
        return () => clearTimeout(timeout);
    }, [localNotes, file.id, file.notes, onNoteChange]);

    // Sync immediately on blur
    const handleNotesBlur = useCallback(() => {
        if (localNotes !== file.notes) {
            onNoteChange(file.id, localNotes);
        }
    }, [localNotes, file.notes, file.id, onNoteChange]);

    // Handle right-click on file name
    const handleContextMenu = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    }, []);

    // Copy path to clipboard
    const handleCopyPath = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(file.name);
            setContextMenu({ visible: false, x: 0, y: 0 });
        } catch (err) {
            console.error('Failed to copy path:', err);
        }
    }, [file.name]);

    // Close context menu on click outside
    useEffect(() => {
        if (!contextMenu.visible) return;

        const handleClickOutside = () => {
            setContextMenu({ visible: false, x: 0, y: 0 });
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('contextmenu', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('contextmenu', handleClickOutside);
        };
    }, [contextMenu.visible]);

    return (
        <div
            className={`group bg-white p-4 rounded-xl border transition-all hover:shadow-md ${file.checked ? 'border-blue-200 bg-blue-50/30' : 'border-stone-200'
                }`}
        >
            {/* Context Menu */}
            {contextMenu.visible && (
                <div
                    className="fixed z-50 bg-white border border-stone-200 rounded-lg shadow-lg py-1 min-w-[160px]"
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={handleCopyPath}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 transition-colors"
                    >
                        <Copy size={14} />
                        Copy Path
                    </button>
                </div>
            )}

            {/* Main row - uses grid for consistent column sizing */}
            <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-start">
                {/* Checkbox */}
                <div
                    className={`flex-shrink-0 cursor-pointer transition-colors pt-0.5 ${file.checked ? 'text-blue-600' : 'text-stone-300 group-hover:text-stone-400'
                        }`}
                    onClick={() => onToggle(file.id)}
                >
                    {file.checked ? (
                        <CheckCircle2 size={22} className="fill-blue-100" />
                    ) : (
                        <Circle size={22} />
                    )}
                </div>

                {/* Content area */}
                <div className="min-w-0 flex flex-col gap-2">
                    {/* File name row */}
                    <div
                        className="flex flex-wrap items-center gap-x-3 gap-y-1 cursor-pointer"
                        onClick={() => onToggle(file.id)}
                    >
                        {/* File name with strikethrough */}
                        <span
                            className="relative inline-flex items-center min-w-0"
                            onContextMenu={handleContextMenu}
                        >
                            <span
                                className={`font-medium text-base transition-all truncate max-w-[200px] sm:max-w-[280px] ${file.checked ? 'text-stone-400' : 'text-stone-800'
                                    }`}
                                title={`${file.name} (Right-click to copy path)`}
                            >
                                {file.name.split('/').pop()}
                            </span>
                            {file.checked && (
                                <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-4 pointer-events-none z-20 overflow-visible">
                                    <svg
                                        viewBox="0 0 100 12"
                                        preserveAspectRatio="none"
                                        className="w-full h-full"
                                        style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' }}
                                    >
                                        <path
                                            d="M0,10 L100,2"
                                            vectorEffect="non-scaling-stroke"
                                            stroke="#ef4444"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="opacity-90"
                                        />
                                    </svg>
                                </span>
                            )}
                        </span>

                        {/* Priority badge */}
                        <select
                            value={file.priority}
                            onChange={(e) => {
                                e.stopPropagation();
                                onPriorityChange(file.id, e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border outline-none cursor-pointer transition-colors flex-shrink-0 ${getPriorityColor(
                                file.priority
                            )}`}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Med</option>
                            <option value="high">High</option>
                        </select>

                        {/* Checked timestamp - inline on larger screens */}
                        {file.checked && file.checkedAt && (
                            <span className="hidden sm:flex items-center gap-1 text-xs text-stone-400 flex-shrink-0">
                                <Clock size={12} /> {formatDate(file.checkedAt)}
                            </span>
                        )}
                    </div>

                    {/* Notes input - full width below */}
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={localNotes}
                            onChange={(e) => setLocalNotes(e.target.value)}
                            onBlur={handleNotesBlur}
                            placeholder="Add notes..."
                            className={`w-full bg-stone-50/50 border border-stone-200 focus:border-blue-400 focus:bg-white px-3 py-1.5 rounded-md outline-none text-sm text-stone-600 placeholder-stone-400 transition-all ${file.checked ? 'opacity-75' : ''
                                }`}
                        />
                    </div>

                    {/* Mobile-only timestamp */}
                    {file.checked && file.checkedAt && (
                        <span className="sm:hidden flex items-center gap-1 text-xs text-stone-400">
                            <Clock size={12} /> Checked: {formatDate(file.checkedAt)}
                        </span>
                    )}
                </div>

                {/* Action buttons */}
                <div className={`flex gap-1 items-start flex-shrink-0 transition-opacity ${file.hasChanges ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleHasChanges(file.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${file.hasChanges
                            ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                            : 'text-stone-300 hover:text-amber-600 hover:bg-amber-50'}`}
                        title={file.hasChanges ? "Marked as changed" : "Mark as changed"}
                    >
                        <FilePenLine size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onReveal(file);
                        }}
                        className="p-1.5 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Reveal in Explorer"
                    >
                        <FolderSymlink size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(file.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove file"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
});
