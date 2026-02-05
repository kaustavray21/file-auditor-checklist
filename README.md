# 📋 File Audit Checklist

A modern, feature-rich file auditing application built with React + Vite. Track, review, and manage your project files with an intuitive interface.

![File Audit Checklist](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan)

## ✨ Features

### Core Features
- **File Explorer Sidebar** - Navigate your files with a VS Code-style tree view
- **Resizable Sidebar** - Drag the sidebar edge to adjust width (200px - 600px)
- **Check/Uncheck Files** - Track which files have been reviewed
- **Priority Levels** - Mark files as High, Medium, or Low priority
- **Notes** - Add notes to any file for context
- **Mark as Changed** - Flag files that have been edited or modified

### Filtering & Search
- **Smart Filtering** - Filter by status (All/Pending/Completed/Changed)
- **Filter Badges** - See file counts for each filter category
- **Priority Filter** - Filter by High, Medium, or Low priority
- **Filename Search** - Quick search through all filenames
- **Folder-Scoped Counts** - Badge counts reflect selected folder

### Import/Export
- **Import JSON** - Load your file list from a JSON file
- **Export JSON** - Save your audit progress as JSON
- **PDF Report** - Generate printable audit reports with changed files section
- **Auto-Save** - Your data persists automatically in localStorage

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/kaustavray21/file-auditor-checklist.git

# Navigate to project directory
cd file-auditor-checklist

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📖 How to Use

### Adding Files

1. **Manual Entry**: Click the **+** button next to the search bar
2. **Import JSON**: Click **Import** to load a JSON file with your file list

### Managing Files

- **Toggle Status**: Click on a file to mark it as reviewed/pending
- **Change Priority**: Use the dropdown on each file card (High/Med/Low)
- **Add Notes**: Type in the notes field on each file card
- **Mark as Changed**: Click the pen icon to flag a file as edited/modified
- **Delete**: Hover over a file and click the trash icon
- **Reveal in Explorer**: Hover and click the folder icon to navigate to that file's folder

### Using the Sidebar

- **Resize**: Drag the right edge of the sidebar to adjust width
- **Collapse/Expand Folders**: Click on folders to toggle
- **Collapse All**: Click the collapse button in the toolbar
- **Select Folder**: Click a folder to filter the main view to its contents

### Filtering

- **Status Filter**: Switch between All, Pending, Completed, and Changed tabs
- **Filter Badges**: Each filter shows the count of files in that category
- **Priority Filter**: Use the dropdown to filter by priority level
- **Search**: Type in the search box to filter by filename
- **Folder Filter**: Click on a folder in the sidebar to view only its contents

### Exporting

- **JSON Export**: Click **JSON** to download your data
- **PDF Report**: Click **PDF** to generate a printable report
  - Includes a separate "Changed Files" section for edited files

---

## 📁 JSON Data Format

Import your file list as a JSON array. Each file object supports the following fields:

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | File path (use `/` for folders, e.g., `src/App.jsx`) |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | `number` | Auto-generated | Unique identifier |
| `checked` | `boolean` | `false` | Whether the file has been reviewed |
| `notes` | `string` | `""` | Notes about the file |
| `priority` | `string` | `"medium"` | Priority level: `"high"`, `"medium"`, or `"low"` |
| `hasChanges` | `boolean` | `false` | Whether the file has been edited/modified |
| `checkedAt` | `string` | `null` | ISO timestamp when the file was checked |

### Example JSON

```json
[
  {
    "name": "index.html",
    "checked": true,
    "notes": "Main entry point validated",
    "priority": "high"
  },
  {
    "name": "src/App.jsx",
    "checked": false,
    "notes": "Needs refactoring on line 45",
    "priority": "high"
  },
  {
    "name": "src/components/Header.jsx",
    "checked": true,
    "priority": "low"
  },
  {
    "name": "src/utils/helpers.js",
    "priority": "medium"
  },
  {
    "name": "styles/main.css"
  }
]
```

### Folder Structure

Files are automatically organized into folders based on their path:

```json
[
  { "name": "README.md" },
  { "name": "src/App.jsx" },
  { "name": "src/components/Header.jsx" },
  { "name": "src/components/Footer.jsx" },
  { "name": "src/utils/helpers.js" },
  { "name": "public/index.html" }
]
```

This creates the following tree view:
```
📁 public
   └── 📄 index.html
📁 src
   ├── 📁 components
   │   ├── 📄 Footer.jsx
   │   └── 📄 Header.jsx
   ├── 📁 utils
   │   └── 📄 helpers.js
   └── 📄 App.jsx
📄 README.md
```

### Minimal JSON Example

At minimum, you only need to provide the `name` field:

```json
[
  { "name": "file1.js" },
  { "name": "file2.py" },
  { "name": "folder/file3.txt" }
]
```

### Full JSON Example (All Fields)

```json
[
  {
    "id": 1,
    "name": "src/App.jsx",
    "checked": true,
    "notes": "Main component refactored",
    "priority": "high",
    "checkedAt": "2025-01-28T12:30:00.000Z"
  },
  {
    "id": 2,
    "name": "src/components/Header.jsx",
    "checked": false,
    "notes": "",
    "priority": "medium",
    "checkedAt": null
  }
]
```

---

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Vite 7** - Build Tool
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons
- **html2pdf.js** - PDF Generation

---

## 📂 Project Structure

```
src/
├── components/
│   ├── files/          # FileListItem, EmptyState
│   ├── filters/        # FilterBar
│   ├── header/         # Header
│   ├── modals/         # AddFileModal, ClearConfirmModal
│   └── sidebar/        # FileTreeItem, ExplorerToolbar, SidebarFooter
├── hooks/
│   ├── useFiles.js        # Core CRUD operations
│   ├── useFileTree.js     # Tree navigation
│   ├── useFilters.js      # Filter/search state
│   ├── useModals.js       # Modal state
│   ├── useImportExport.js # Import/Export/PDF
│   ├── useSidebarResize.js # Resizable sidebar
│   ├── useDragAndDrop.js  # Drag and drop
│   └── useFileManager.js  # Composition hook
├── utils/
│   ├── fileIcons.jsx   # File type icons
│   └── helpers.js      # Utility functions
├── views/
│   └── PrintPreview.jsx
└── App.jsx
```

---

## 📄 License

MIT © [kaustavray21](https://github.com/kaustavray21)
