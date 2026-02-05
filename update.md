# Update Log - February 5, 2026

## Features Added

### 1. PDF Report - Inline Change Markings
- Replaced the separate "Changed Files" section with inline **orange** "Changed" badges
- Badges appear directly next to the file priority for easier scanning
- Uses unique orange color (`#fff7ed` bg, `#ea580c` text) distinct from other badges
- Report structure is now more concise and professional
- File: `src/views/PrintPreview.jsx`

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
| `src/views/PrintPreview.jsx` | Changed files section |
| `src/App.jsx` | Resizable sidebar integration |
