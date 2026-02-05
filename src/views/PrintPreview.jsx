import { ArrowLeft, Printer, Download, CheckCircle2, Circle, Clock } from 'lucide-react';
import { getPriorityColor, formatDate } from '../utils/helpers';

export function PrintPreview({
    filteredFiles,
    stats,
    onClose,
    onDownloadPDF,
    isPdfLibLoaded,
}) {
    // Separate changed files for dedicated section
    const changedFiles = filteredFiles.filter(file => file.hasChanges);

    return (
        <div className="min-h-screen bg-[#fdfbf7] font-sans">
            <style>{`
        /* PDF Generation Fix: Override oklch colors with RGB equivalents for html2canvas compatibility */
        #pdf-content, #pdf-content * {
          --color-white: #ffffff;
          --color-stone-50: #fafaf9;
          --color-stone-100: #f5f5f4;
          --color-stone-200: #e7e5e4;
          --color-stone-300: #d6d3d1;
          --color-stone-400: #a8a29e;
          --color-stone-500: #78716c;
          --color-stone-600: #57534e;
          --color-stone-700: #44403c;
          --color-stone-800: #292524;
          --color-stone-900: #1c1917;
          --color-blue-50: #eff6ff;
          --color-blue-600: #2563eb;
          --color-blue-700: #1d4ed8;
          --color-red-500: #ef4444;
        }
        #pdf-content {
          background-color: #ffffff !important;
          color: #1c1917 !important;
        }
        #pdf-content .bg-white { background-color: #ffffff !important; }
        #pdf-content .bg-stone-50 { background-color: #fafaf9 !important; }
        #pdf-content .bg-stone-100 { background-color: #f5f5f4 !important; }
        #pdf-content .bg-blue-50 { background-color: #eff6ff !important; }
        #pdf-content .text-stone-400 { color: #a8a29e !important; }
        #pdf-content .text-stone-500 { color: #78716c !important; }
        #pdf-content .text-stone-600 { color: #57534e !important; }
        #pdf-content .text-stone-900 { color: #1c1917 !important; }
        #pdf-content .text-blue-600 { color: #2563eb !important; }
        #pdf-content .text-blue-700 { color: #1d4ed8 !important; }
        #pdf-content .border-stone-100 { border-color: #f5f5f4 !important; }
        #pdf-content .border-stone-200 { border-color: #e7e5e4 !important; }
        
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
                <div id="pdf-content" style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #e7e5e4' }}>
                    <div style={{ borderBottom: '1px solid #e7e5e4', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '0.25rem' }}>File Audit Report</h1>
                                <p style={{ color: '#78716c', fontSize: '0.875rem' }}>Generated Checklist & Audit Trail</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#1c1917', backgroundColor: '#f5f5f4', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', display: 'inline-block', marginBottom: '0.25rem' }}>
                                    {new Date().toLocaleString('en-IN')}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#78716c' }}>
                                    Status: <span style={{ fontWeight: '500', color: '#1c1917' }}>{stats.checked}/{stats.total} Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                        borderBottom: index !== filteredFiles.length - 1 ? '1px solid #f5f5f4' : 'none',
                                        pageBreakInside: 'avoid'
                                    }}
                                >
                                    <div style={{ marginTop: '0.125rem', color: file.checked ? '#2563eb' : '#d6d3d1' }}>
                                        {file.checked ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                            <span style={{ position: 'relative', display: 'inline-block', overflow: 'visible' }}>
                                                <span
                                                    style={{
                                                        fontWeight: '500',
                                                        fontSize: '0.875rem',
                                                        color: file.checked ? '#a8a29e' : '#1c1917',
                                                        wordBreak: 'break-word',
                                                        overflowWrap: 'break-word'
                                                    }}
                                                >
                                                    {file.name}
                                                </span>
                                                {file.checked && (
                                                    <span style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', height: '1rem', pointerEvents: 'none', zIndex: 20, overflow: 'visible' }}>
                                                        <svg
                                                            viewBox="0 0 100 12"
                                                            preserveAspectRatio="none"
                                                            style={{ width: '100%', height: '100%' }}
                                                        >
                                                            <path
                                                                d="M0,10 L100,2"
                                                                vectorEffect="non-scaling-stroke"
                                                                stroke="#ef4444"
                                                                strokeWidth="2"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                style={{ opacity: 0.9 }}
                                                            />
                                                        </svg>
                                                    </span>
                                                )}
                                            </span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                                                <span
                                                    style={{
                                                        fontSize: '9px',
                                                        fontWeight: 'bold',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        padding: '0.125rem 0.375rem',
                                                        borderRadius: '0.25rem',
                                                        border: '1px solid',
                                                        backgroundColor: file.priority === 'high' ? '#fef2f2' : file.priority === 'low' ? '#f0fdf4' : '#fefce8',
                                                        color: file.priority === 'high' ? '#dc2626' : file.priority === 'low' ? '#16a34a' : '#ca8a04',
                                                        borderColor: file.priority === 'high' ? '#fecaca' : file.priority === 'low' ? '#bbf7d0' : '#fef08a'
                                                    }}
                                                >
                                                    {file.priority}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: '10px',
                                                        fontWeight: 'bold',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        padding: '0.125rem 0.375rem',
                                                        borderRadius: '0.25rem',
                                                        backgroundColor: file.checked ? '#eff6ff' : '#f5f5f4',
                                                        color: file.checked ? '#1d4ed8' : '#78716c'
                                                    }}
                                                >
                                                    {file.checked ? 'Done' : 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            {file.checkedAt && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '10px', color: '#a8a29e' }}>
                                                    <Clock size={10} /> Checked: {formatDate(file.checkedAt)}
                                                </div>
                                            )}
                                            {file.notes && (
                                                <div style={{ color: '#57534e', fontSize: '0.75rem', backgroundColor: '#fafaf9', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #f5f5f4', fontStyle: 'italic', display: 'inline-block', width: 'fit-content' }}>
                                                    {file.notes}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#a8a29e', fontStyle: 'italic', fontSize: '0.875rem' }}>
                                No files included in this report.
                            </div>
                        )}
                    </div>

                    {/* Changed Files Section */}
                    {changedFiles.length > 0 && (
                        <>
                            <div style={{ borderTop: '2px solid #e7e5e4', marginTop: '2rem', paddingTop: '1.5rem', pageBreakBefore: 'auto' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '0.25rem' }}>
                                        Changed Files
                                    </h2>
                                    <p style={{ color: '#78716c', fontSize: '0.875rem' }}>
                                        Files marked as edited or modified ({changedFiles.length} total)
                                    </p>
                                </div>

                                <div>
                                    {changedFiles.map((file, index) => (
                                        <div
                                            key={file.id}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.75rem',
                                                padding: '0.75rem 0',
                                                borderBottom: index !== changedFiles.length - 1 ? '1px solid #f5f5f4' : 'none',
                                                pageBreakInside: 'avoid',
                                                backgroundColor: '#fefce8',
                                                paddingLeft: '0.5rem',
                                                paddingRight: '0.5rem',
                                                borderRadius: '0.375rem',
                                                marginBottom: '0.5rem'
                                            }}
                                        >
                                            <div style={{ marginTop: '0.125rem', color: file.checked ? '#2563eb' : '#d6d3d1' }}>
                                                {file.checked ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                    <span style={{ position: 'relative', display: 'inline-block', overflow: 'visible' }}>
                                                        <span
                                                            style={{
                                                                fontWeight: '500',
                                                                fontSize: '0.875rem',
                                                                color: file.checked ? '#a8a29e' : '#1c1917',
                                                                wordBreak: 'break-word',
                                                                overflowWrap: 'break-word'
                                                            }}
                                                        >
                                                            {file.name}
                                                        </span>
                                                        {file.checked && (
                                                            <span style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', height: '1rem', pointerEvents: 'none', zIndex: 20, overflow: 'visible' }}>
                                                                <svg
                                                                    viewBox="0 0 100 12"
                                                                    preserveAspectRatio="none"
                                                                    style={{ width: '100%', height: '100%' }}
                                                                >
                                                                    <path
                                                                        d="M0,10 L100,2"
                                                                        vectorEffect="non-scaling-stroke"
                                                                        stroke="#ef4444"
                                                                        strokeWidth="2"
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        style={{ opacity: 0.9 }}
                                                                    />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                                                        <span
                                                            style={{
                                                                fontSize: '9px',
                                                                fontWeight: 'bold',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em',
                                                                padding: '0.125rem 0.375rem',
                                                                borderRadius: '0.25rem',
                                                                border: '1px solid',
                                                                backgroundColor: file.priority === 'high' ? '#fef2f2' : file.priority === 'low' ? '#f0fdf4' : '#fefce8',
                                                                color: file.priority === 'high' ? '#dc2626' : file.priority === 'low' ? '#16a34a' : '#ca8a04',
                                                                borderColor: file.priority === 'high' ? '#fecaca' : file.priority === 'low' ? '#bbf7d0' : '#fef08a'
                                                            }}
                                                        >
                                                            {file.priority}
                                                        </span>
                                                        <span
                                                            style={{
                                                                fontSize: '10px',
                                                                fontWeight: 'bold',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em',
                                                                padding: '0.125rem 0.375rem',
                                                                borderRadius: '0.25rem',
                                                                backgroundColor: file.checked ? '#eff6ff' : '#f5f5f4',
                                                                color: file.checked ? '#1d4ed8' : '#78716c'
                                                            }}
                                                        >
                                                            {file.checked ? 'Done' : 'Pending'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                    {file.checkedAt && (
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '10px', color: '#a8a29e' }}>
                                                            <Clock size={10} /> Checked: {formatDate(file.checkedAt)}
                                                        </div>
                                                    )}
                                                    {file.notes && (
                                                        <div style={{ color: '#57534e', fontSize: '0.75rem', backgroundColor: '#fafaf9', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #f5f5f4', fontStyle: 'italic', display: 'inline-block', width: 'fit-content' }}>
                                                            {file.notes}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

