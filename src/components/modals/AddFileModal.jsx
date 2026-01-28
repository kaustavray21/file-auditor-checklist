import { Plus, Folder, FolderOpen, ChevronDown } from 'lucide-react';

export function AddFileModal({
    isOpen,
    onClose,
    onAdd,
    folders,
    formState,
    setFormState,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-stone-200 scale-100 animate-in zoom-in-95 duration-200">
                <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                    <Plus className="text-emerald-600" size={20} />
                    Add New File
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                            Filename
                        </label>
                        <input
                            type="text"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            placeholder="e.g. script.js"
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-[#fdfbf7]"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                            Folder Location
                        </label>
                        <div className="flex gap-2 mb-3">
                            <button
                                onClick={() => setFormState({ ...formState, isNewFolder: false })}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors flex items-center justify-center gap-2 ${!formState.isNewFolder
                                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                                    }`}
                            >
                                <Folder size={14} /> Existing Folder
                            </button>
                            <button
                                onClick={() => setFormState({ ...formState, isNewFolder: true })}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors flex items-center justify-center gap-2 ${formState.isNewFolder
                                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                                    }`}
                            >
                                <Plus size={14} /> New Folder
                            </button>
                        </div>

                        {formState.isNewFolder ? (
                            <div className="relative">
                                <FolderOpen className="absolute left-3 top-2.5 text-stone-400" size={16} />
                                <input
                                    type="text"
                                    value={formState.newFolderName}
                                    onChange={(e) => setFormState({ ...formState, newFolderName: e.target.value })}
                                    placeholder="e.g. src/components"
                                    className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-[#fdfbf7]"
                                />
                            </div>
                        ) : (
                            <div className="relative">
                                <Folder className="absolute left-3 top-2.5 text-stone-400" size={16} />
                                <select
                                    value={formState.folder}
                                    onChange={(e) => setFormState({ ...formState, folder: e.target.value })}
                                    className="w-full pl-9 pr-8 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#fdfbf7] text-sm appearance-none"
                                >
                                    <option value="">Root Directory ( / )</option>
                                    {folders.map((f) => (
                                        <option key={f} value={f}>
                                            {f}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-3 text-stone-400 pointer-events-none" size={14} />
                            </div>
                        )}
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
                        onClick={onAdd}
                        className="px-4 py-2 bg-emerald-600 text-white font-medium hover:bg-emerald-700 rounded-lg transition-colors shadow-sm text-sm"
                    >
                        Add File
                    </button>
                </div>
            </div>
        </div>
    );
}
