import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable, { Column } from '@/components/admin/DataTable';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import FormField from '@/components/admin/FormField';
import { adminService } from '@/services/adminService';

interface DownloadItem {
    category: string;
    title: string;
    url: string;
    isExternal?: boolean;
}

const DownloadsPage: React.FC = () => {
    // State for downloads data
    const [downloads, setDownloads] = useState<DownloadItem[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for form
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<DownloadItem>({
        category: '',
        title: '',
        url: '',
        isExternal: false
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isEditing, setIsEditing] = useState(false);

    // State for delete confirmation
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [downloadToDelete, setDownloadToDelete] = useState<DownloadItem | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch downloads when component mounts
    useEffect(() => {
        fetchDownloads();
    }, []);

    const fetchDownloads = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await adminService.getItems<DownloadItem>('downloads');
            setDownloads(response.items);

            // Extract unique categories
            const uniqueCategories = [...new Set(response.items.map(item => item.category))];
            setCategories(uniqueCategories);
        } catch (err: any) {
            console.error('Error fetching downloads:', err);
            setError(err.message || 'Failed to fetch downloads');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;

        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [id]: checkbox.checked }));
        } else {
            setFormData(prev => ({ ...prev, [id]: value }));
        }

        // Clear error for this field when user types
        if (formErrors[id]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[id];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.category.trim()) {
            errors.category = 'Category is required';
        }

        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        }

        if (!formData.url.trim()) {
            errors.url = 'URL is required';
        } else if (formData.isExternal && !formData.url.startsWith('http')) {
            errors.url = 'External URL must start with http:// or https://';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddNew = () => {
        const initialCategory = categories.length > 0 ? categories[0] : 'Technical Documentation';

        setFormData({
            category: initialCategory,
            title: '',
            url: '',
            isExternal: false
        });
        setFormErrors({});
        setIsEditing(false);
        setShowForm(true);
    };

    const handleEdit = (download: DownloadItem) => {
        setFormData({ ...download });
        setFormErrors({});
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = (download: DownloadItem) => {
        setDownloadToDelete(download);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!downloadToDelete) return;

        setIsSubmitting(true);

        try {
            await adminService.deleteItem('downloads', downloadToDelete.category, downloadToDelete.title);
            setDownloads(prev => prev.filter(item =>
                !(item.category === downloadToDelete.category && item.title === downloadToDelete.title)
            ));
            setShowDeleteDialog(false);
            setDownloadToDelete(null);
        } catch (err: any) {
            console.error('Error deleting download item:', err);
            setError(err.message || 'Failed to delete download item');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            if (isEditing) {
                // Update existing download item
                await adminService.updateItem('downloads', formData.category, formData, formData.title);

                // Update local state
                setDownloads(prev =>
                    prev.map(item =>
                        (item.category === formData.category && item.title === formData.title)
                            ? formData
                            : item
                    )
                );
            } else {
                // Create new download item
                const newDownload = await adminService.createItem<DownloadItem>('downloads', formData);

                // Update local state
                setDownloads(prev => [...prev, newDownload]);

                // Update categories if it's a new category
                if (!categories.includes(formData.category)) {
                    setCategories(prev => [...prev, formData.category]);
                }
            }

            // Close form
            setShowForm(false);
        } catch (err: any) {
            console.error('Error saving download item:', err);
            setError(err.message || 'Failed to save download item');
        } finally {
            setIsSubmitting(false);
        }
    };

    const cancelForm = () => {
        setShowForm(false);
        setFormErrors({});
    };

    // Define columns for DataTable
    const columns: Column<DownloadItem>[] = [
        { header: 'Category', accessor: 'category' },
        { header: 'Title', accessor: 'title' },
        {
            header: 'Type',
            accessor: (item) => item.isExternal ? 'External Link' : 'Internal Document'
        },
        {
            header: 'URL',
            accessor: (item) => (
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    {item.url.length > 50 ? `${item.url.substring(0, 50)}...` : item.url}
                </a>
            )
        }
    ];

    return (
        <AdminLayout title="Downloads Management">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showForm ? (
                <div className="bg-white shadow-md rounded-md p-6 mb-6">
                    <h3 className="text-lg font-medium mb-4">
                        {isEditing ? 'Edit Download Item' : 'Add New Download Item'}
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Category<span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="flex">
                                <select
                                    id="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        formErrors.category ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Or enter new category"
                                    className="ml-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            setFormData(prev => ({ ...prev, category: e.target.value }));
                                        }
                                    }}
                                />
                            </div>
                            {formErrors.category && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>
                            )}
                        </div>

                        <FormField
                            id="title"
                            label="Title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g. Product Manual"
                            required
                            error={formErrors.title}
                        />

                        <div className="mb-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isExternal"
                                    checked={formData.isExternal || false}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isExternal: e.target.checked }))}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isExternal" className="ml-2 block text-sm text-gray-700">
                                    External Link (to another website)
                                </label>
                            </div>
                        </div>

                        <FormField
                            id="url"
                            label={formData.isExternal ? "External URL" : "Document Path"}
                            type="text"
                            value={formData.url}
                            onChange={handleInputChange}
                            placeholder={formData.isExternal ? "https://example.com/document.pdf" : "documents/manual.pdf"}
                            required
                            error={formErrors.url}
                            helpText={formData.isExternal
                                ? "Full URL to external document"
                                : "Path to document on the server (without domain)"
                            }
                        />

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                type="button"
                                onClick={cancelForm}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Download Item'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="mb-4 flex justify-end">
                    <button
                        onClick={handleAddNew}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Download Item
                    </button>
                </div>
            )}

            <DataTable<DownloadItem>
                columns={columns}
                data={downloads}
                isLoading={isLoading}
                keyField="title"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ConfirmationDialog
                isOpen={showDeleteDialog}
                title="Delete Download Item"
                message={`Are you sure you want to delete "${downloadToDelete?.title}" from the "${downloadToDelete?.category}" category? This action cannot be undone.`}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteDialog(false)}
                isLoading={isSubmitting}
                variant="danger"
            />
        </AdminLayout>
    );
};

export default DownloadsPage;