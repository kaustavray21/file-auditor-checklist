import { useState, useEffect, useRef } from 'react';

/**
 * Hook for managing import/export and PDF functionality.
 */
export function useImportExport({ files, importFiles }) {
    const [isPdfLibLoaded, setIsPdfLibLoaded] = useState(false);
    const fileInputRef = useRef(null);

    // Load html2pdf script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        script.onload = () => setIsPdfLibLoaded(true);
        script.onerror = () => console.error("Failed to load html2pdf library");
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const handleExportJSON = () => {
        const dataStr = JSON.stringify(files, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `checklist-export-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadPDF = () => {
        const element = document.getElementById('pdf-content');

        if (!element) {
            console.error('PDF content element not found');
            return;
        }

        if (window.html2pdf) {
            document.body.style.cursor = 'wait';
            const opt = {
                margin: [5, 5, 5, 5],
                filename: `checklist-report-${new Date().toISOString().slice(0, 10)}.pdf`,
                image: { type: 'jpeg', quality: 0.95 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff',
                    x: 0,
                    y: 0,
                    scrollX: 0,
                    scrollY: -window.scrollY,
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
                pagebreak: { mode: 'avoid-all', before: '.page-break' }
            };

            window.html2pdf()
                .set(opt)
                .from(element)
                .save()
                .then(() => {
                    document.body.style.cursor = 'default';
                })
                .catch((error) => {
                    console.error('PDF generation failed:', error);
                    document.body.style.cursor = 'default';
                });
        } else {
            window.focus();
            window.print();
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                const standardized = Array.isArray(parsed) ? parsed.map((item, idx) => ({
                    id: item.id || Date.now() + idx,
                    name: item.name || item.filename || 'Unknown File',
                    checked: !!item.checked,
                    notes: item.notes || '',
                    priority: item.priority || 'medium',
                    checkedAt: item.checkedAt || (item.checked ? new Date().toISOString() : null)
                })) : [];
                importFiles(standardized);
            } catch (err) {
                console.error('Invalid JSON file format');
            }
        };
    };

    return {
        isPdfLibLoaded,
        fileInputRef,
        handleExportJSON,
        handleDownloadPDF,
        handleImportClick,
        handleFileChange,
    };
}
