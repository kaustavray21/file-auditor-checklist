import { FileText, Upload, Trash2, Save, Printer, SquareX } from 'lucide-react';

export function Header({
    stats,
    selectedFolder,
    onImport,
    onClear,
    onUncheckAll,
    onExport,
    onPreview,
    fileInputRef,
    onFileChange,
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 ml-8 md:ml-0">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
                        <FileText className="text-blue-600" />
                        File Audit Checklist
                    </h1>
                    <p className="text-stone-500 mt-1">
                        {selectedFolder ? `Viewing: ${selectedFolder}` : 'Manage your file review process'}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onFileChange}
                        className="hidden"
                        accept=".json"
                    />
                    <button
                        onClick={onImport}
                        className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors font-medium text-xs md:text-sm"
                    >
                        <Upload size={14} /> Import
                    </button>
                    <button
                        onClick={onUncheckAll}
                        className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 rounded-lg transition-colors font-medium text-xs md:text-sm"
                    >
                        <SquareX size={14} /> Uncheck All
                    </button>
                    <button
                        onClick={onClear}
                        className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg transition-colors font-medium text-xs md:text-sm"
                    >
                        <Trash2 size={14} /> Clear
                    </button>
                    <button
                        onClick={onExport}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-xs md:text-sm shadow-sm"
                    >
                        <Save size={14} /> JSON
                    </button>
                    <button
                        onClick={onPreview}
                        className="flex items-center gap-2 px-3 py-1.5 bg-stone-700 hover:bg-stone-800 text-white rounded-lg transition-colors font-medium text-xs md:text-sm shadow-sm"
                    >
                        <Printer size={14} /> PDF
                    </button>
                </div>
            </div>

            <div className="w-full bg-stone-100 rounded-full h-4 mb-2 overflow-hidden">
                <div
                    className="bg-blue-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${stats.percentage}%` }}
                />
            </div>
            <div className="flex justify-between text-sm text-stone-500 font-medium">
                <span>Progress: {stats.percentage}%</span>
                <span>{stats.checked} / {stats.total} Files Reviewed</span>
            </div>
        </div>
    );
}