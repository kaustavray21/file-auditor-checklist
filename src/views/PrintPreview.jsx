import { ArrowLeft, Printer, Download, CheckCircle2, Circle, Clock } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export function PrintPreview({
    filteredFiles,
    stats,
    onClose,
    onDownloadPDF,
    isPdfLibLoaded,
}) {
    return (
        <div className="min-h-screen bg-white font-sans">
            <style>{`
        #pdf-content, #pdf-content * {
          color: #000000 !important;
          background-color: #ffffff !important;
        }
        @media print {
          .no-print { display: none !important; }
          body { background-color: white !important; }
          .print-container { margin: 0; padding: 0; }
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
                    <span className="font-semibold text-white">Print Preview (B&W Mode)</span>
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
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-transform active:scale-95"
                    >
                        <Printer size={18} /> Print PDF
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto py-8 px-4 print:p-0 print:max-w-none">
                <div id="pdf-content" style={{
                    backgroundColor: '#ffffff',
                    padding: '1.5rem',
                    margin: '0 auto',
                    maxWidth: '190mm',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {/* Header */}
                    <div style={{ borderBottom: '2px solid #000000', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#000000', marginBottom: '0.25rem' }}>File Audit Report</h1>
                                <p style={{ color: '#000000', fontSize: '0.875rem' }}>Generated Checklist & Audit Trail</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#000000', marginBottom: '0.25rem' }}>
                                    {new Date().toLocaleString('en-IN')}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: '#000000' }}>
                                    Status: <span style={{ fontWeight: 'bold' }}>{stats.checked}/{stats.total} Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* File List */}
                    <div>
                        {filteredFiles.length > 0 ? (
                            filteredFiles.map((file, index) => (
                                <div
                                    key={file.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem',
                                        padding: '0.75rem 0',
                                        borderBottom: index !== filteredFiles.length - 1 ? '1px solid #cccccc' : 'none',
                                        pageBreakInside: 'avoid'
                                    }}
                                >
                                    {/* Checkbox */}
                                    <div style={{ marginTop: '0.125rem', color: '#000000', flexShrink: 0 }}>
                                        {file.checked ? (
                                            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>☑</span>
                                        ) : (
                                            <span style={{ fontSize: '1rem' }}>☐</span>
                                        )}
                                    </div>

                                    {/* File Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        {/* Filename - Prominent */}
                                        <div style={{
                                            fontSize: '0.875rem',
                                            fontWeight: 'bold',
                                            color: '#000000',
                                            marginBottom: '0.25rem',
                                            fontFamily: 'monospace',
                                            wordBreak: 'break-all',
                                            overflowWrap: 'break-word'
                                        }}>
                                            {file.name}
                                        </div>

                                        {/* Metadata Row */}
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            fontSize: '0.75rem',
                                            color: '#000000',
                                            marginBottom: file.notes ? '0.25rem' : 0
                                        }}>
                                            <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                                                [{file.priority}]
                                            </span>
                                            <span>
                                                {file.checked ? '✓ Done' : '○ Pending'}
                                            </span>
                                            {file.hasChanges && (
                                                <span style={{ fontWeight: '600' }}>
                                                    [CHANGED]
                                                </span>
                                            )}
                                            {file.checkedAt && (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    Checked: {formatDate(file.checkedAt)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Notes */}
                                        {file.notes && (
                                            <div style={{
                                                color: '#000000',
                                                fontSize: '0.75rem',
                                                fontStyle: 'italic',
                                                paddingLeft: '0.5rem',
                                                borderLeft: '2px solid #000000'
                                            }}>
                                                {file.notes}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#000000', fontStyle: 'italic', fontSize: '0.875rem' }}>
                                No files included in this report.
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #cccccc', fontSize: '0.75rem', color: '#000000', textAlign: 'center' }}>
                        Generated by File Audit Checklist
                    </div>
                </div>
            </div>
        </div>
    );
}
