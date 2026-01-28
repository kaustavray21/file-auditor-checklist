import { AlertTriangle } from 'lucide-react';

export function ClearConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-stone-200 scale-100 animate-in zoom-in-95 duration-200">
                <div className="flex items-start gap-4 mb-4">
                    <div className="bg-rose-100 p-2 rounded-full">
                        <AlertTriangle className="text-rose-600" size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-stone-900">Clear All Files?</h3>
                        <p className="text-stone-500 text-sm mt-1">
                            This will permanently remove all items. Cannot be undone.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-stone-600 font-medium hover:bg-stone-100 rounded-lg transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-rose-600 text-white font-medium hover:bg-rose-700 rounded-lg transition-colors shadow-sm text-sm"
                    >
                        Yes, Clear All
                    </button>
                </div>
            </div>
        </div>
    );
}
