import { ArrowLeft, Printer, Download, CheckCircle2, Circle, Clock } from 'lucide-react';
import { getPriorityColor, formatDate } from '../utils/helpers';

export function PrintPreview({
    filteredFiles,
    stats,
    onClose,
    onDownloadPDF,
    isPdfLibLoaded,
}) {
    return (
        <div className="min-h-screen bg-[#fdfbf7] font-sans">
            <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background-color: white !important; -webkit-print-color-adjust: exact; }
          .print-container { margin: 0; padding: 0; box-shadow: none; border: none; }
        }
      `}</style>

            <div className="no-print sticky top-0 left-0 right-0 bg-stone-900 text-white p-4 shadow-lg flex justify-between items-center z-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} /> Back
                    </button>
                    <div className="h-6 w-px bg-stone-700"></div>
                    <span className="font-semibold text-white">Print Preview (Audit Mode)</span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="hidden md:block px-4 py-2 hover:bg-stone-800 rounded-lg transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => window.print()}
                        title="Use System Print Dialog"
                        className="flex items-center gap-2 px-3 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-lg font-medium shadow-sm transition-transform active:scale-95"
                    >
                        <Printer size={18} />
                    </button>
                    <button
                        onClick={onDownloadPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-transform active:scale-95"
                    >
                        <Download size={18} /> {isPdfLibLoaded ? 'Download PDF' : 'Print PDF'}
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto my-8 print:my-0">
                <div id="pdf-content" className="print-container bg-white p-8 rounded-xl shadow-sm border border-stone-200">
                    <div className="border-b border-stone-200 pb-4 mb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-stone-900 mb-1">File Audit Report</h1>
                                <p className="text-stone-500 text-sm">Generated Checklist & Audit Trail</p>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-semibold text-stone-900 bg-stone-100 px-2 py-1 rounded inline-block mb-1">
                                    {new Date().toLocaleString('en-IN')}
                                </div>
                                <div className="text-xs text-stone-500">
                                    Status: <span className="font-medium text-stone-900">{stats.checked}/{stats.total} Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-0">
                        {filteredFiles.length > 0 ? (
                            filteredFiles.map((file, index) => (
                                <div
                                    key={file.id}
                                    className={`flex items-start gap-3 py-3 ${index !== filteredFiles.length - 1 ? 'border-b border-stone-100' : ''
                                        } break-inside-avoid`}
                                >
                                    <div className={`mt-0.5 ${file.checked ? 'text-blue-600' : 'text-stone-300'}`}>
                                        {file.checked ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="relative inline-block max-w-full">
                                                <span
                                                    className={`font-medium text-sm transition-all relative z-10 break-all ${file.checked ? 'text-stone-400' : 'text-stone-900'
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
                                            <div className="flex items-center gap-2 shrink-0 ml-2">
                                                <span
                                                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${getPriorityColor(
                                                        file.priority
                                                    )}`}
                                                >
                                                    {file.priority}
                                                </span>
                                                <span
                                                    className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${file.checked ? 'bg-blue-50 text-blue-700' : 'bg-stone-100 text-stone-500'
                                                        }`}
                                                >
                                                    {file.checked ? 'Done' : 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {file.checkedAt && (
                                                <div className="flex items-center gap-1 text-[10px] text-stone-400">
                                                    <Clock size={10} /> Checked: {formatDate(file.checkedAt)}
                                                </div>
                                            )}
                                            {file.notes && (
                                                <div className="text-stone-600 text-xs bg-stone-50 px-2 py-0.5 rounded border border-stone-100 italic inline-block w-fit">
                                                    {file.notes}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-stone-400 italic text-sm">
                                No files included in this report.
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-4 border-t border-stone-100 text-center text-stone-400 text-xs">
                        Page 1 of 1
                    </div>
                </div>
            </div>
        </div>
    );
}
