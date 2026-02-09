import { useFiles } from './useFiles';
import { useFileTree } from './useFileTree';
import { useFilters } from './useFilters';
import { useModals } from './useModals';
import { useImportExport } from './useImportExport';
import { useDragAndDrop } from './useDragAndDrop';
import { useSidebarResize } from './useSidebarResize';
import { useNotes } from './useNotes';

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
        handleToggleHasChanges,
        handleNoteChange,
        handlePriorityChange,
        handleDelete,
        clearFiles,
        uncheckAll,
        addFile,
        importFiles,
        moveFile,
        moveFolder,
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
        folderCompletionStatus,
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
        filterCounts,
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
    } = useImportExport({ files, importFiles, filteredFiles, selectedFolder });

    // Drag and drop functionality
    const {
        draggedItem,
        dropTarget,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDragEnd,
    } = useDragAndDrop({ moveFile, moveFolder });

    // Sidebar resize functionality
    const {
        sidebarWidth,
        isResizing,
        handleMouseDown,
    } = useSidebarResize();

    // Notes functionality
    const {
        notes,
        isRightSidebarOpen,
        toggleRightSidebar,
        addNote,
        updateNote,
        deleteNote,
    } = useNotes();

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
        folderCompletionStatus,
        stats,
        filteredFiles,
        filterCounts,

        // Handlers
        handleToggle,
        handleToggleHasChanges,
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
        handleUncheckAll: uncheckAll,
        handleToolbarNewFile,
        handleToolbarNewFolder,
        handleAddFile,
        confirmAddFile,
        handleExportJSON,
        handleDownloadPDF,
        handleImportClick,
        handleFileChange,

        // Drag and drop
        draggedItem,
        dropTarget,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDragEnd,

        // Sidebar resize
        sidebarWidth,
        isResizing,
        handleSidebarMouseDown: handleMouseDown,

        // Notes
        notes,
        isRightSidebarOpen,
        toggleRightSidebar,
        addNote,
        updateNote,
        deleteNote,
    };
}