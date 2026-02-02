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
        className={`${isSidebarOpen ? 'w-96' : 'w-0'
          } flex-none bg-[#f5f2eb] border-r border-stone-200 flex flex-col transition-all duration-300 overflow-hidden relative`}
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

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto flex flex-col min-h-full">
            <div className="flex-1">
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
              />

              <div className="space-y-3 pb-8">
                {filteredFiles.length > 0 ? (
                  filteredFiles.map((file) => (
                    <FileListItem
                      key={file.id}
                      file={file}
                      onToggle={handleToggle}
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
    </div>
  );
}