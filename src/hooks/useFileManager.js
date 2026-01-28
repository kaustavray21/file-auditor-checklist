import { useFiles } from './useFiles';
import { useFileTree } from './useFileTree';
import { useFilters } from './useFilters';
import { useModals } from './useModals';
import { useImportExport } from './useImportExport';

/**
 * Main composition hook that combines all file management functionality.
 * This provides a single API for the App component while keeping
 * the underlying logic modular and maintainable.
 */
export function useFileManager() {
    // Core file CRUD operations
    const {
        files,
        handleToggle,
        handleNoteChange,
        handlePriorityChange,
        handleDelete,
        clearFiles,
        addFile,
        importFiles,
    } = useFiles();

    // File tree and folder navigation
    const {
        selectedFolder,
        activeFileId,
        expandedFolders,
        setExpandedFolders,
        isSidebarOpen,
        setIsSidebarOpen,
        uniqueFolders,
        fileTree,
        handleToggleFolderExpand,
        handleCollapseAll,
        handleRefreshExplorer,
        handleRevealFolder,
        handleSelectFolder,
    } = useFileTree(files);

    // Filtering and search
    const {
        filter,
        setFilter,
        priorityFilter,
        setPriorityFilter,
        search,
        setSearch,
        filteredFiles,
        stats,
    } = useFilters(files, selectedFolder);

    // Modal state management
    const {
        showPreview,
        setShowPreview,
        showClearConfirm,
        setShowClearConfirm,
        showAddFileModal,
        setShowAddFileModal,
        newFileForm,
        setNewFileForm,
        handleClearListClick,
        confirmClear,
        handleToolbarNewFile,
        handleToolbarNewFolder,
        handleAddFile,
        confirmAddFile,
    } = useModals({
        selectedFolder,
        addFile,
        clearFiles,
        setExpandedFolders,
    });

    // Import/Export functionality
    const {
        isPdfLibLoaded,
        fileInputRef,
        handleExportJSON,
        handleDownloadPDF,
        handleImportClick,
        handleFileChange,
    } = useImportExport({ files, importFiles });

    return {
        // State
        files,
        filter,
        setFilter,
        priorityFilter,
        setPriorityFilter,
        search,
        setSearch,
        selectedFolder,
        activeFileId,
        expandedFolders,
        showPreview,
        setShowPreview,
        isPdfLibLoaded,
        showClearConfirm,
        setShowClearConfirm,
        showAddFileModal,
        setShowAddFileModal,
        newFileForm,
        setNewFileForm,
        isSidebarOpen,
        setIsSidebarOpen,
        fileInputRef,

        // Computed
        uniqueFolders,
        fileTree,
        stats,
        filteredFiles,

        // Handlers
        handleToggle,
        handleNoteChange,
        handlePriorityChange,
        handleDelete,
        handleToggleFolderExpand,
        handleCollapseAll,
        handleRefreshExplorer,
        handleRevealFolder,
        handleSelectFolder,
        handleClearListClick,
        confirmClear,
        handleToolbarNewFile,
        handleToolbarNewFolder,
        handleAddFile,
        confirmAddFile,
        handleExportJSON,
        handleDownloadPDF,
        handleImportClick,
        handleFileChange,
    };
}
