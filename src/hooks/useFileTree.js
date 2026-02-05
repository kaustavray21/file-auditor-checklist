import { useState, useEffect, useMemo, useRef } from 'react';

/**
 * Hook for managing file tree navigation and folder state.
 * Optimized to only rebuild tree when file names change, not when properties change.
 */
export function useFileTree(files) {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [activeFileId, setActiveFileId] = useState(null);
    const [expandedFolders, setExpandedFolders] = useState(new Set());
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Memoize file names to detect structural changes vs property changes
    const fileNamesKey = useMemo(() => {
        return files.map(f => `${f.id}:${f.name}`).join('|');
    }, [files]);

    // Initialize expanded folders on first load
    useEffect(() => {
        const rootFolders = new Set();
        files.forEach(f => {
            const parts = f.name.split('/');
            if (parts.length > 1) {
                rootFolders.add(parts[0]);
            }
        });
        setExpandedFolders(prev => {
            if (prev.size === 0 && rootFolders.size > 0) return rootFolders;
            return prev;
        });
    }, []);

    // Compute unique folders - only when file names change
    const uniqueFolders = useMemo(() => {
        const folders = new Set();
        files.forEach(f => {
            const parts = f.name.split('/');
            if (parts.length > 1) {
                folders.add(parts.slice(0, -1).join('/'));
            }
        });
        return Array.from(folders).sort();
    }, [fileNamesKey]);

    // Build file tree structure - only when file names change
    const fileTree = useMemo(() => {
        const root = [];
        const sortNodes = (nodes) => {
            return nodes.sort((a, b) => {
                if (a.type === b.type) return a.name.localeCompare(b.name);
                return a.type === 'folder' ? -1 : 1;
            });
        };

        files.forEach(file => {
            const parts = file.name.split('/');
            let currentLevel = root;
            let currentPath = '';

            parts.forEach((part, index) => {
                const isFile = index === parts.length - 1;
                currentPath = currentPath ? `${currentPath}/${part}` : part;

                const existingNode = currentLevel.find(
                    node => node.name === part && node.type === (isFile ? 'file' : 'folder')
                );

                if (existingNode) {
                    if (!isFile) {
                        currentLevel = existingNode.children;
                    } else {
                        // Update fileData reference for existing files
                        existingNode.fileData = file;
                    }
                } else {
                    const newNode = {
                        id: isFile ? file.id : currentPath,
                        name: part,
                        type: isFile ? 'file' : 'folder',
                        children: [],
                        fileData: isFile ? file : null,
                    };
                    currentLevel.push(newNode);
                    if (!isFile) {
                        currentLevel = newNode.children;
                    }
                }
            });
        });

        const recursiveSort = (nodes) => {
            nodes.forEach(node => {
                if (node.children && node.children.length > 0) {
                    recursiveSort(node.children);
                }
            });
            return sortNodes(nodes);
        };

        return recursiveSort(root);
    }, [files]); // Keep files dependency for fileData updates

    // Compute folder completion status - uses a Map for O(1) lookups
    const folderCompletionStatus = useMemo(() => {
        const status = {};
        const folderPaths = new Set();

        // Single pass to collect folder paths
        for (const f of files) {
            const parts = f.name.split('/');
            let path = '';
            for (let i = 0; i < parts.length - 1; i++) {
                path = path ? `${path}/${parts[i]}` : parts[i];
                folderPaths.add(path);
            }
        }

        // Check completion for each folder
        folderPaths.forEach(folderPath => {
            const prefix = folderPath + '/';
            let allChecked = true;
            let hasFiles = false;

            for (const f of files) {
                if (f.name.startsWith(prefix)) {
                    hasFiles = true;
                    if (!f.checked) {
                        allChecked = false;
                        break; // Early exit
                    }
                }
            }

            status[folderPath] = hasFiles && allChecked;
        });

        return status;
    }, [files]);

    const handleToggleFolderExpand = (folderId) => {
        setExpandedFolders(prev => {
            const next = new Set(prev);
            if (next.has(folderId)) {
                next.delete(folderId);
            } else {
                next.add(folderId);
            }
            return next;
        });
    };

    const handleCollapseAll = () => {
        setExpandedFolders(new Set());
    };

    const handleRefreshExplorer = () => {
        setSelectedFolder(null);
        setActiveFileId(null);
        const rootFolders = new Set();
        files.forEach(f => {
            const parts = f.name.split('/');
            if (parts.length > 1) rootFolders.add(parts[0]);
        });
        setExpandedFolders(rootFolders);
    };

    const handleRevealFolder = (file) => {
        const parts = file.name.split('/');
        if (parts.length > 1) {
            parts.pop();
            const folderPath = parts.join('/');
            setSelectedFolder(folderPath);

            setExpandedFolders(prev => {
                const next = new Set(prev);
                let pathAccumulator = '';
                const folders = folderPath.split('/');
                folders.forEach(part => {
                    pathAccumulator = pathAccumulator ? `${pathAccumulator}/${part}` : part;
                    next.add(pathAccumulator);
                });
                return next;
            });
        } else {
            setSelectedFolder(null);
        }
        setActiveFileId(file.id);
        setIsSidebarOpen(true);
    };

    const handleSelectFolder = (path) => {
        setSelectedFolder(path);
        setActiveFileId(null);
    };

    return {
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
    };
}
