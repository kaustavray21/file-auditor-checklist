import { useState, useEffect, useMemo } from 'react';

/**
 * Hook for managing file tree navigation and folder state.
 */
export function useFileTree(files) {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [activeFileId, setActiveFileId] = useState(null);
    const [expandedFolders, setExpandedFolders] = useState(new Set());
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

    // Compute unique folders
    const uniqueFolders = useMemo(() => {
        const folders = new Set();
        files.forEach(f => {
            const parts = f.name.split('/');
            if (parts.length > 1) {
                folders.add(parts.slice(0, -1).join('/'));
            }
        });
        return Array.from(folders).sort();
    }, [files]);

    // Build file tree structure
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
    }, [files]);

    // Compute folder completion status - a folder is complete when all files in it and its subfolders are checked
    const folderCompletionStatus = useMemo(() => {
        const status = {};

        // Get all unique folder paths
        const folderPaths = new Set();
        files.forEach(f => {
            const parts = f.name.split('/');
            let path = '';
            for (let i = 0; i < parts.length - 1; i++) {
                path = path ? `${path}/${parts[i]}` : parts[i];
                folderPaths.add(path);
            }
        });

        // For each folder, check if ALL files within it (including subfolders) are checked
        folderPaths.forEach(folderPath => {
            const filesInFolder = files.filter(f =>
                f.name.startsWith(folderPath + '/')
            );

            if (filesInFolder.length === 0) {
                status[folderPath] = false;
            } else {
                status[folderPath] = filesInFolder.every(f => f.checked);
            }
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
