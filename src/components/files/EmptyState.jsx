import { FileJson } from 'lucide-react';

export function EmptyState({ selectedFolder }) {
    return (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-stone-300">
            <FileJson className="mx-auto text-stone-300 mb-3" size={48} />
            <p className="text-stone-500 font-medium">No files found</p>
            <p className="text-stone-400 text-sm">
                {selectedFolder
                    ? 'No files found in this folder or matching your search.'
                    : 'Import a JSON file or add a new entry to get started.'}
            </p>
        </div>
    );
}
