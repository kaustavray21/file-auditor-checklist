import { CheckCircle2, Circle, Trash2, Clock, FolderSymlink } from 'lucide-react';
import { getPriorityColor, formatDate } from '../../utils/helpers';

export function FileListItem({
    file,
    onToggle,
    onNoteChange,
    onPriorityChange,
    onDelete,
    onReveal,
}) {
    return (
        <div
            className={`group flex flex-col md:flex-row items-start md:items-center bg-white p-4 rounded-xl border transition-all hover:shadow-md ${file.checked ? 'border-blue-200 bg-blue-50/30' : 'border-stone-200'
                }`}
        >
            <div
                className="flex items-center gap-4 flex-1 cursor-pointer min-w-[200px]"
                onClick={() => onToggle(file.id)}
            >
                <div
                    className={`flex-shrink-0 transition-colors ${file.checked ? 'text-blue-600' : 'text-stone-300 group-hover:text-stone-400'
                        }`}
                >
                    {file.checked ? (
                        <CheckCircle2 size={24} className="fill-blue-100" />
                    ) : (
                        <Circle size={24} />
                    )}
                </div>
                <div className="flex flex-col relative">
                    <span className="relative inline-block max-w-full">
                        <span
                            className={`font-medium text-lg transition-all relative z-10 break-all ${file.checked ? 'text-stone-400' : 'text-stone-800'
                                }`}
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
                    <div className="flex flex-col gap-1 mt-1 md:hidden">
                        <span className="text-xs text-stone-400">
                            {file.checked ? 'Completed' : 'Pending review'}
                        </span>
                        {file.checkedAt && (
                            <span className="text-[10px] text-stone-400 flex items-center gap-1">
                                <Clock size={10} /> {formatDate(file.checkedAt)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full md:w-auto mt-3 md:mt-0 md:mx-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <select
                        value={file.priority}
                        onChange={(e) => onPriorityChange(file.id, e.target.value)}
                        className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border outline-none cursor-pointer transition-colors ${getPriorityColor(
                            file.priority
                        )}`}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Med</option>
                        <option value="high">High</option>
                    </select>
                    <input
                        type="text"
                        value={file.notes}
                        onChange={(e) => onNoteChange(file.id, e.target.value)}
                        placeholder="Add notes..."
                        className={`flex-1 bg-transparent border-b border-transparent focus:border-blue-400 focus:bg-stone-50 px-2 py-1 outline-none text-stone-600 placeholder-stone-400 transition-all ${file.checked ? 'opacity-75' : ''
                            }`}
                    />
                </div>
                {file.checked && file.checkedAt && (
                    <div className="hidden md:flex items-center gap-1 text-xs text-stone-400 pl-1">
                        <Clock size={12} /> Checked: {formatDate(file.checkedAt)}
                    </div>
                )}
            </div>

            <div className="flex gap-1 hidden group-hover:flex">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onReveal(file);
                    }}
                    className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Reveal in Explorer"
                >
                    <FolderSymlink size={18} />
                </button>
                <button
                    onClick={() => onDelete(file.id)}
                    className="p-2 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove file"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}
