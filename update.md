# Update Log - February 9, 2026

## Features Added

### 1. Section-Based JSON Export
- **Current View Export**: JSON export now only includes files from the currently viewed section/folder
- **Change Status Tracking**: Added `hasChanges` field to each file in the exported JSON
- **Enhanced Metadata**: Export includes section name, total file count, and count of changed files
- **Dynamic Filename**: Export filename now includes the section name (e.g., `checklist-src-components-2026-02-09.json`)
- **Bug Fix**: Fixed import logic to support the new JSON structure with metadata
- **Files Modified**: `src/hooks/useImportExport.js`, `src/hooks/useFileManager.js`

### 2. Copy Path Context Menu
- **Right-Click to Copy**: Right-click on any file name in the list to access "Copy Path" option
- **Clipboard Integration**: Full file path is copied to clipboard for easy pasting
- **Clean UX**: Context menu auto-closes when clicking outside or right-clicking elsewhere
- **Visual Hint**: Tooltip shows "(Right-click to copy path)" on hover
- **Files Modified**: `src/components/files/FileListItem.jsx`

### 3. Collapsible Right Sidebar - Notes Panel
- **Standalone Notes**: Create, edit, and delete note cards separate from file items
- **Collapsible Panel**: Click chevron arrow on right edge to toggle visibility
- **Persistent Storage**: Notes and sidebar state saved to localStorage
- **Color Coding**: 5 color options (default, yellow, blue, green, pink) for visual organization
- **Expandable Cards**: Each note card can be collapsed/expanded individually
- **Real-time Editing**: Title and content editable inline with auto-save
- **New Files**:
  - `src/hooks/useNotes.js` - Notes state management hook
  - `src/components/notes/NoteCard.jsx` - Individual note card component
  - `src/components/notes/RightSidebar.jsx` - Right sidebar container
- **Files Modified**: `src/hooks/useFileManager.js`, `src/App.jsx`

### JSON Export Format
```json
{
  "exportDate": "2026-02-09T12:00:00.000Z",
  "section": "src/components",
  "totalFiles": 10,
  "changedFiles": 3,
  "files": [
    {
      "id": 1,
      "name": "src/components/Button.jsx",
      "checked": true,
      "notes": "Updated styling",
      "priority": "high",
      "checkedAt": "2026-02-09T10:00:00.000Z",
      "hasChanges": true
    }
  ]
}
```

---

# Update Log - February 5, 2026

## Features Added

### 1. Black & White Print System
- **Total Redesign**: Switched to a pure Black & White layout for professional printing
- **Removed Colors**: No colored badges or backgrounds; text is pure black on white
- **No Strikethroughs**: Removed strikethrough effects on completed tasks for better clarity
- **Prominent Filenames**: Used bold monospace fonts for filenames to ensure they stand out
- **Improved Alignment**: Optimized content width (190mm max) and added word-wrapping (`break-all`) to prevent cutoff on A4 pages
- **Native Printing**: Removed "Download PDF" button to encourage using the browser's superior "Print to PDF" dialog
- **Files**: `src/views/PrintPreview.jsx`, `src/hooks/useImportExport.js`

### 2. Resizable Sidebar
- VS Code-style draggable resize handle on sidebar
- Width constraints: 200px minimum, 600px maximum
- Width persists in localStorage across sessions
- Smooth 60fps resizing using `requestAnimationFrame`
- Direct DOM manipulation during drag for zero lag
- File: `src/hooks/useSidebarResize.js`

### 3. Filter Badges
- Added count badges to filter buttons (All, Pending, Completed, Changed)
- Counts reflect currently selected folder, not total files
- Dynamic updates when files change
- Styled with blue (active) / gray (inactive) backgrounds
- Files: `src/components/filters/FilterBar.jsx`, `src/hooks/useFilters.js`

---

## Performance Optimizations

### React.memo Wrappers
- `FileListItem.jsx` - prevents re-renders when other files change
- `FileTreeItem.jsx` - optimizes recursive tree rendering
- `FilterBar.jsx` - prevents re-renders on unrelated state changes

### useCallback for Handlers
- All handlers in `useFiles.js` now use `useCallback`
- Stable function references prevent child re-renders

### Debounced Operations
| Operation | Delay |
|-----------|-------|
| Search input | 200ms |
| localStorage writes | 500ms |

### Optimized Calculations
- **stats**: Single-pass `reduce()` instead of multiple `.filter()` calls
- **filterCounts**: Single for-loop counting all categories at once
- **folderFiles**: Pre-computed and reused

### PDF Generation
| Setting | Before | After |
|---------|--------|-------|
| html2canvas.scale | 2 | 1.5 |
| image.quality | 0.98 | 0.85 |
| allowTaint | - | true |
| removeContainer | - | true |

### File Tree Optimization
- `fileNamesKey` memoization for structural change detection
- Early exit in folder completion checks
- `for-of` loops for better performance

---

## Files Modified

| File | Changes |
|------|---------|
| `src/hooks/useSidebarResize.js` | **NEW** - Sidebar resize logic |
| `src/hooks/useFileManager.js` | Integrated sidebar resize, exposed filterCounts |
| `src/hooks/useFiles.js` | useCallback wrappers, debounced localStorage |
| `src/hooks/useFilters.js` | Debounced search, optimized calculations |
| `src/hooks/useFileTree.js` | Structural change detection, early exits |
| `src/hooks/useImportExport.js` | Optimized PDF settings |
| `src/components/files/FileListItem.jsx` | React.memo wrapper |
| `src/components/sidebar/FileTreeItem.jsx` | React.memo wrapper |
| `src/components/filters/FilterBar.jsx` | React.memo, filter badges |
| `src/views/PrintPreview.jsx` | Black & White layout, wrap-text fix |
| `src/App.jsx` | Resizable sidebar integration |
