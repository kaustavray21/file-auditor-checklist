import { useRef, useEffect } from 'react';
import { StickyNote, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { NoteCard } from './NoteCard';

export function NotesPanel({
    notes,
    isOpen,
    onToggle,
    onAddNote,
    onUpdateNote,
    onDeleteNote,
}) {
    const sidebarRef = useRef(null);

    // Close panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onToggle();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onToggle]);

    return (
        <>
            {/* Toggle button when closed */}
            {!isOpen && (
                <button
                    onClick={onToggle}
                    className="fixed right-0 top-24 z-30 bg-amber-500 hover:bg-amber-600 text-white border-0 rounded-l-lg px-2 py-3 shadow-lg transition-all hover:shadow-xl flex items-center gap-1.5 group"
                    title="Open Notes Panel"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    <span className="text-sm font-medium">Notes</span>
                </button>
            )}

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                style={{ width: isOpen ? '280px' : '0' }}
                className="flex-none bg-[#f5f2eb] border-l border-stone-200 flex flex-col transition-all duration-300 overflow-hidden"
            >
                {/* Header */}
                <div className="px-4 pt-4 pb-3 border-b border-stone-200 bg-[#fdfbf7]/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                            <StickyNote size={14} /> Notes
                        </h2>
                        <button
                            onClick={onToggle}
                            className="text-stone-400 hover:text-stone-600 transition-colors"
                            title="Close panel"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Add note button */}
                    <button
                        onClick={onAddNote}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        <Plus size={16} />
                        Add Note
                    </button>
                </div>

                {/* Notes list */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onUpdate={onUpdateNote}
                                onDelete={onDeleteNote}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 px-4 text-stone-400 text-sm italic">
                            No notes yet.<br />
                            Click "Add Note" to create one.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-stone-200 bg-[#fdfbf7]/50 text-xs text-stone-400 text-center">
                    {notes.length} note{notes.length !== 1 ? 's' : ''}
                </div>
            </aside>
        </>
    );
}
