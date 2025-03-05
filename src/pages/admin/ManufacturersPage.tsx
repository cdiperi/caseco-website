import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable, { Column } from '@/components/admin/DataTable';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import FormField from '@/components/admin/FormField';
import { adminService } from '@/services/adminService';

interface Manufacturer {
    id: string;
    name: string;
    logo: string;
    website: string;
    description?: string;
}

const ManufacturersPage: React.FC = () => {
    // State for manufacturers data
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for form
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Manufacturer>({
        id: '',
        name: '',
        logo: '',
        website: '',
        description: ''
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isEditing, setIsEditing] = useState(false);

    // State for delete confirmation
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [manufacturerToDelete, setManufacturerToDelete] = useState<Manufacturer | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch manufacturers when component mounts
    useEffect(() => {
        fetchManufacturers();
    }, []);

    const fetchManufacturers = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await adminService.getItems<Manufacturer>('manufacturers');
            setManufacturers(response.items);
        } catch (err: any) {
            console.error('Error fetching manufacturers:', err);
            setError(err.message || 'Failed to fetch manufacturers');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));

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

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.logo.trim()) {
            errors.logo = 'Logo URL is required';
        } else if (!formData.logo.startsWith('http')) {
            errors.logo = 'Logo URL must be a valid URL';
        }

        if (!formData.website.trim()) {
            errors.website = 'Website URL is required';
        } else if (!formData.website.startsWith('http')) {
            errors.website = 'Website must be a valid URL';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddNew = () => {
        setFormData({
            id: '',
            name: '',
            logo: '',
            website: '',
            description: ''
        });
        setFormErrors({});
        setIsEditing(false);
        setShowForm(true);
    };

    const handleEdit = (manufacturer: Manufacturer) => {
        setFormData({ ...manufacturer });
        setFormErrors({});
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = (manufacturer: Manufacturer) => {
        setManufacturerToDelete(manufacturer);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!manufacturerToDelete) return;

        setIsSubmitting(true);

        try {
            await adminService.deleteItem('manufacturers', manufacturerToDelete.id);
            setManufacturers(prev => prev.filter(m => m.id !== manufacturerToDelete.id));
            setShowDeleteDialog(false);
            setManufacturerToDelete(null);
        } catch (err: any) {
            console.error('Error deleting manufacturer:', err);
            setError(err.message || 'Failed to delete manufacturer');
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
                // Update existing manufacturer
                await adminService.updateItem('manufacturers', formData.id, formData);

                // Update local state
                setManufacturers(prev =>
                    prev.map(m => m.id === formData.id ? formData : m)
                );
            } else {
                // Create new manufacturer
                const newManufacturer = await adminService.createItem<Manufacturer>('manufacturers', formData);

                // Update local state
                setManufacturers(prev => [...prev, newManufacturer]);
            }

            // Close form
            setShowForm(false);
        } catch (err: any) {
            console.error('Error saving manufacturer:', err);
            setError(err.message || 'Failed to save manufacturer');
        } finally {
            setIsSubmitting(false);
        }
    };

    const cancelForm = () => {
        setShowForm(false);
        setFormErrors({});
    };

    // Define columns for DataTable
    const columns: Column<Manufacturer>[] = [
        { header: 'Name', accessor: 'name' },
        {
            header: 'Logo',
            accessor: (item) => (
                <div className="w-32 h-12 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        className="max-h-10 max-w-full object-contain"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/150?text=Error';
                        }}
                    />
                </div>
            ),
            width: '150px'
        },
        {
            header: 'Website',
            accessor: (item) => (
                <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    {item.website}
                </a>
            )
        },
        {
            header: 'Description',
            accessor: (item) => (
                <div className="truncate max-w-xs">
                    {item.description || 'No description'}
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Manufacturers Management">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showForm ? (
                <div className="bg-white shadow-md rounded-md p-6 mb-6">
                    <h3 className="text-lg font-medium mb-4">
                        {isEditing ? 'Edit Manufacturer' : 'Add New Manufacturer'}
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <FormField
                            id="name"
                            label="Manufacturer Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Acme Corporation"
                            required
                            error={formErrors.name}
                        />

                        <FormField
                            id="logo"
                            label="Logo URL"
                            value={formData.logo}
                            onChange={handleInputChange}
                            placeholder="https://example.com/logo.png"
                            required
                            error={formErrors.logo}
                            helpText="Enter a full URL to the manufacturer's logo image"
                        />

                        <FormField
                            id="website"
                            label="Website"
                            type="url"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="https://example.com"
                            required
                            error={formErrors.website}
                        />

                        <FormField
                            id="description"
                            label="Description"
                            type="textarea"
                            value={formData.description || ''}
                            onChange={handleInputChange}
                            placeholder="Brief description of the manufacturer"
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
                                {isSubmitting ? 'Saving...' : 'Save Manufacturer'}
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
                        Add Manufacturer
                    </button>
                </div>
            )}

            <DataTable<Manufacturer>
                columns={columns}
                data={manufacturers}
                isLoading={isLoading}
                keyField="id"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ConfirmationDialog
                isOpen={showDeleteDialog}
                title="Delete Manufacturer"
                message={`Are you sure you want to delete ${manufacturerToDelete?.name}? This action cannot be undone and may impact related products.`}
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

export default ManufacturersPage;