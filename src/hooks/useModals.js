import { useState } from 'react';

/**
 * Hook for managing modal state.
 */
export function useModals({ selectedFolder, addFile, clearFiles, setExpandedFolders }) {
    const [showPreview, setShowPreview] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [showAddFileModal, setShowAddFileModal] = useState(false);
    const [newFileForm, setNewFileForm] = useState({
        name: '',
        folder: '',
        isNewFolder: false,
        newFolderName: ''
    });

    const handleClearListClick = () => setShowClearConfirm(true);

    const confirmClear = () => {
        clearFiles();
        setShowClearConfirm(false);
    };

    const handleToolbarNewFile = () => {
        setNewFileForm({
            name: '',
            folder: selectedFolder || '',
            isNewFolder: false,
            newFolderName: ''
        });
        setShowAddFileModal(true);
    };

    const handleToolbarNewFolder = () => {
        const folderName = prompt("Enter new folder name:");
        if (folderName && folderName.trim()) {
            const path = `${folderName.trim()}/.keep`;
            addFile({
                id: Date.now(),
                name: path,
                checked: false,
                notes: 'Folder created',
                priority: 'medium',
                checkedAt: null
            });
            setExpandedFolders(prev => new Set(prev).add(folderName.trim()));
        }
    };

    const handleAddFile = () => {
        setNewFileForm({
            name: '',
            folder: selectedFolder || '',
            isNewFolder: false,
            newFolderName: ''
        });
        setShowAddFileModal(true);
    };

    const confirmAddFile = () => {
        if (!newFileForm.name.trim()) return;

        let finalFolder = '';
        if (newFileForm.isNewFolder) {
            finalFolder = newFileForm.newFolderName.trim();
        } else {
            finalFolder = newFileForm.folder;
        }

        finalFolder = finalFolder.replace(/\/$/, '');
        const fullPath = finalFolder ? `${finalFolder}/${newFileForm.name}` : newFileForm.name;

        addFile({
            id: Date.now(),
            name: fullPath,
            checked: false,
            notes: '',
            priority: 'medium',
            checkedAt: null
        });
        setShowAddFileModal(false);

        if (finalFolder) {
            setExpandedFolders(prev => new Set(prev).add(finalFolder));
        }
    };

    return {
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
    };
}
