import { Folder, X, Home, Menu } from 'lucide-react';

// Hooks
import { useFileManager } from './hooks/useFileManager';

// Components
import { ClearConfirmModal } from './components/modals/ClearConfirmModal';
import { AddFileModal } from './components/modals/AddFileModal';
import { FileTreeItem } from './components/sidebar/FileTreeItem';
import { ExplorerToolbar } from './components/sidebar/ExplorerToolbar';
import { SidebarFooter } from './components/sidebar/SidebarFooter';
import { Header } from './components/header/Header';
import { FilterBar } from './components/filters/FilterBar';
import { FileListItem } from './components/files/FileListItem';
import { EmptyState } from './components/files/EmptyState';
import { RightSidebar } from './components/notes/RightSidebar';

// Views
import { PrintPreview } from './views/PrintPreview';

export default function App() {
  const {
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
    handleUncheckAll,
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
    handleSidebarMouseDown,

    // Notes
    notes,
    isRightSidebarOpen,
    toggleRightSidebar,
    addNote,
    updateNote,
    deleteNote,
  } = useFileManager();

  // Render Print Preview
  if (showPreview) {
    return (
      <PrintPreview
        filteredFiles={filteredFiles}
        stats={stats}
        onClose={() => setShowPreview(false)}
        onDownloadPDF={handleDownloadPDF}
        isPdfLibLoaded={isPdfLibLoaded}
      />
    );
  }

  return (
    <div className="flex h-screen bg-[#fdfbf7] text-stone-800 font-sans overflow-hidden">
      {/* Modals */}
      <ClearConfirmModal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={confirmClear}
      />

      <AddFileModal
        isOpen={showAddFileModal}
        onClose={() => setShowAddFileModal(false)}
        onAdd={confirmAddFile}
        folders={uniqueFolders}
        formState={newFileForm}
        setFormState={setNewFileForm}
      />

      {/* Sidebar */}
      <aside
        style={{ width: isSidebarOpen ? `${sidebarWidth}px` : '0' }}
        className="flex-none bg-[#f5f2eb] border-r border-stone-200 flex flex-col transition-all duration-300 overflow-hidden relative"
      >
        <div className="px-4 pt-4 pb-2 border-b border-stone-200 bg-[#fdfbf7]/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
              <Folder size={14} /> Explorer
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-stone-400 hover:text-stone-600"
            >
              <X size={16} />
            </button>
          </div>

          <ExplorerToolbar
            onNewFile={handleToolbarNewFile}
            onNewFolder={handleToolbarNewFolder}
            onRefresh={handleRefreshExplorer}
            onCollapseAll={handleCollapseAll}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
          <div
            onClick={() => handleSelectFolder(null)}
            className={`flex items-center gap-2 px-3 py-2 cursor-pointer text-sm font-medium rounded-md mb-2 transition-colors border-l-2 ${!selectedFolder
              ? 'bg-blue-50 text-blue-700 border-blue-500'
              : 'text-stone-600 hover:bg-stone-200/50 border-transparent'
              }`}
          >
            <Home size={16} />
            All Files
          </div>

          {fileTree.length > 0 ? (
            fileTree.map((node) => (
              <FileTreeItem
                key={node.id}
                node={node}
                level={0}
                onSelectFolder={handleSelectFolder}
                selectedFolder={selectedFolder}
                activeFileId={activeFileId}
                expandedFolders={expandedFolders}
                onToggleExpand={handleToggleFolderExpand}
                folderCompletionStatus={folderCompletionStatus}
                // Drag and drop props
                draggedItem={draggedItem}
                dropTarget={dropTarget}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
              />
            ))
          ) : (
            <div className="text-center py-10 px-4 text-stone-400 text-sm italic">
              No files loaded. <br /> Import JSON to view structure.
            </div>
          )}
        </div>

        <SidebarFooter itemCount={files.length} />

        {/* Resize Handle */}
        {isSidebarOpen && (
          <div
            onMouseDown={handleSidebarMouseDown}
            className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors ${isResizing ? 'bg-blue-500' : 'bg-transparent'
              }`}
            style={{ zIndex: 50 }}
          >
            <div className="absolute top-0 right-0 w-1 h-full" />
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-20 p-2 bg-white border border-stone-200 rounded-md shadow-sm text-stone-500 hover:text-blue-600"
          >
            <Menu size={20} />
          </button>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sticky Header Section */}
          <div className="sticky top-0 z-10 bg-[#fdfbf7] px-4 md:px-8 pt-4 md:pt-8">
            <div className="max-w-5xl mx-auto">
              <Header
                stats={stats}
                selectedFolder={selectedFolder}
                onImport={handleImportClick}
                onClear={handleClearListClick}
                onUncheckAll={handleUncheckAll}
                onExport={handleExportJSON}
                onPreview={() => setShowPreview(true)}
                fileInputRef={fileInputRef}
                onFileChange={handleFileChange}
              />

              <FilterBar
                filter={filter}
                setFilter={setFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                search={search}
                setSearch={setSearch}
                onAddFile={handleAddFile}
                filterCounts={filterCounts}
              />
            </div>
          </div>

          {/* Scrollable File List */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 custom-scrollbar">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-3">
                {filteredFiles.length > 0 ? (
                  filteredFiles.map((file) => (
                    <FileListItem
                      key={file.id}
                      file={file}
                      onToggle={handleToggle}
                      onToggleHasChanges={handleToggleHasChanges}
                      onNoteChange={handleNoteChange}
                      onPriorityChange={handlePriorityChange}
                      onDelete={handleDelete}
                      onReveal={handleRevealFolder}
                    />
                  ))
                ) : (
                  <EmptyState selectedFolder={selectedFolder} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar - Notes Panel */}
      <RightSidebar
        notes={notes}
        isOpen={isRightSidebarOpen}
        onToggle={toggleRightSidebar}
        onAddNote={addNote}
        onUpdateNote={updateNote}
        onDeleteNote={deleteNote}
      />
    </div>
  );
}