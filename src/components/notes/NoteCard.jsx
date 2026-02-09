import { memo, useState, useEffect, useRef } from 'react';
import { Trash2, ChevronDown, ChevronUp, Palette } from 'lucide-react';

const colorClasses = {
    default: 'bg-white border-stone-300',
    yellow: 'bg-amber-50 border-amber-300',
    blue: 'bg-blue-50 border-blue-300',
    green: 'bg-emerald-50 border-emerald-300',
    pink: 'bg-pink-50 border-pink-300',
};

const colorOptions = ['default', 'yellow', 'blue', 'green', 'pink'];

export const NoteCard = memo(function NoteCard({ note, onUpdate, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colorPickerRef = useRef(null);

    // Local state for smooth typing
    const [localTitle, setLocalTitle] = useState(note.title);
    const [localContent, setLocalContent] = useState(note.content);

    // Sync from props when note changes externally
    useEffect(() => {
        setLocalTitle(note.title);
    }, [note.title]);

    useEffect(() => {
        setLocalContent(note.content);
    }, [note.content]);

    // Debounced sync to parent for title
    useEffect(() => {
        if (localTitle === note.title) return;
        const timeout = setTimeout(() => {
            onUpdate(note.id, { title: localTitle });
        }, 300);
        return () => clearTimeout(timeout);
    }, [localTitle, note.id, note.title, onUpdate]);

    // Debounced sync to parent for content
    useEffect(() => {
        if (localContent === note.content) return;
        const timeout = setTimeout(() => {
            onUpdate(note.id, { content: localContent });
        }, 300);
        return () => clearTimeout(timeout);
    }, [localContent, note.id, note.content, onUpdate]);

    // Close color picker when clicking outside
    useEffect(() => {
        if (!showColorPicker) return;
        const handleClick = (e) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
                setShowColorPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [showColorPicker]);

    // Sync immediately on blur
    const handleTitleBlur = () => {
        if (localTitle !== note.title) {
            onUpdate(note.id, { title: localTitle });
        }
    };

    const handleContentBlur = () => {
        if (localContent !== note.content) {
            onUpdate(note.id, { content: localContent });
        }
    };

    return (
        <div
            className={`rounded-lg border-2 shadow-sm transition-all ${colorClasses[note.color] || colorClasses.default}`}
        >
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-inherit">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1 text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 rounded transition-colors flex-shrink-0"
                    title={isExpanded ? "Collapse" : "Expand"}
                >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                <input
                    type="text"
                    value={localTitle}
                    onChange={(e) => setLocalTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    className="flex-1 bg-transparent font-semibold text-sm text-stone-800 outline-none placeholder-stone-400 min-w-0"
                    placeholder="Note title..."
                />

                {/* Action buttons - grouped together inside card */}
                <div className="flex items-center gap-0.5 bg-stone-100 rounded-md p-0.5 flex-shrink-0 relative" ref={colorPickerRef}>
                    <button
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="p-1.5 text-stone-600 hover:text-blue-600 hover:bg-white rounded transition-colors"
                        title="Change color"
                    >
                        <Palette size={15} />
                    </button>
                    <button
                        onClick={() => onDelete(note.id)}
                        className="p-1.5 text-stone-600 hover:text-rose-600 hover:bg-white rounded transition-colors"
                        title="Delete note"
                    >
                        <Trash2 size={15} />
                    </button>

                    {/* Color picker dropdown */}
                    {showColorPicker && (
                        <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-stone-200 rounded-lg shadow-xl p-2 flex gap-1.5">
                            {colorOptions.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => {
                                        onUpdate(note.id, { color });
                                        setShowColorPicker(false);
                                    }}
                                    className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-125 ${color === note.color ? 'ring-2 ring-blue-500 ring-offset-2 scale-110' : ''
                                        } ${color === 'default' ? 'bg-white border-stone-400' :
                                            color === 'yellow' ? 'bg-amber-300 border-amber-400' :
                                                color === 'blue' ? 'bg-blue-300 border-blue-400' :
                                                    color === 'green' ? 'bg-emerald-300 border-emerald-400' :
                                                        'bg-pink-300 border-pink-400'
                                        }`}
                                    title={color.charAt(0).toUpperCase() + color.slice(1)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            {isExpanded && (
                <div className="p-3">
                    <textarea
                        value={localContent}
                        onChange={(e) => setLocalContent(e.target.value)}
                        onBlur={handleContentBlur}
                        placeholder="Write your note here..."
                        className="w-full bg-transparent text-sm text-stone-700 outline-none resize-none min-h-[80px] placeholder-stone-400 leading-relaxed"
                        rows={4}
                    />
                </div>
            )}
        </div>
    );
});
