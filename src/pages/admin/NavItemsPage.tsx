import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable, { Column } from '@/components/admin/DataTable';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import FormField from '@/components/admin/FormField';
import { adminService } from '@/services/adminService';

interface NavItem {
    section: string;
    title: string;
    link?: string;
    path?: string;
    isInternal?: boolean;
    subitems?: NavSubItem[];
}

interface NavSubItem {
    title: string;
    link: string;
    isInternal?: boolean;
}

const NavItemsPage: React.FC = () => {
    // State for nav items data
    const [navItems, setNavItems] = useState<NavItem[]>([]);
    const [sections, setSections] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for form
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<NavItem>({
        section: '',
        title: '',
        link: '',
        isInternal: false
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isEditing, setIsEditing] = useState(false);

    // State for delete confirmation
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [navItemToDelete, setNavItemToDelete] = useState<NavItem | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch nav items when component mounts
    useEffect(() => {
        fetchNavItems();
    }, []);

    const fetchNavItems = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await adminService.getItems<NavItem>('nav-items');
            setNavItems(response.items);

            // Extract unique sections
            const uniqueSections = [...new Set(response.items.map(item => item.section))];
            setSections(uniqueSections);
        } catch (err: any) {
            console.error('Error fetching navigation items:', err);
            setError(err.message || 'Failed to fetch navigation items');
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

        if (!formData.section.trim()) {
            errors.section = 'Section is required';
        }

        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        }

        // Either link or path is required if no subitems
        if (!formData.subitems || formData.subitems.length === 0) {
            if (!formData.link && !formData.path) {
                errors.link = 'Either Link or Path must be provided';
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddNew = () => {
        const initialSection = sections.length > 0 ? sections[0] : 'Applications';

        setFormData({
            section: initialSection,
            title: '',
            link: '',
            isInternal: false
        });
        setFormErrors({});
        setIsEditing(false);
        setShowForm(true);
    };

    const handleEdit = (navItem: NavItem) => {
        setFormData({ ...navItem });
        setFormErrors({});
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = (navItem: NavItem) => {
        setNavItemToDelete(navItem);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!navItemToDelete) return;

        setIsSubmitting(true);

        try {
            await adminService.deleteItem('nav-items', navItemToDelete.section, navItemToDelete.title);
            setNavItems(prev => prev.filter(item =>
                !(item.section === navItemToDelete.section && item.title === navItemToDelete.title)
            ));
            setShowDeleteDialog(false);
            setNavItemToDelete(null);
        } catch (err: any) {
            console.error('Error deleting navigation item:', err);
            setError(err.message || 'Failed to delete navigation item');
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
                // Update existing nav item
                await adminService.updateItem('nav-items', formData.section, formData, formData.title);

                // Update local state
                setNavItems(prev =>
                    prev.map(item =>
                        (item.section === formData.section && item.title === formData.title)
                            ? formData
                            : item
                    )
                );
            } else {
                // Create new nav item
                const newNavItem = await adminService.createItem<NavItem>('nav-items', formData);

                // Update local state
                setNavItems(prev => [...prev, newNavItem]);

                // Update sections if it's a new section
                if (!sections.includes(formData.section)) {
                    setSections(prev => [...prev, formData.section]);
                }
            }

            // Close form
            setShowForm(false);
        } catch (err: any) {
            console.error('Error saving navigation item:', err);
            setError(err.message || 'Failed to save navigation item');
        } finally {
            setIsSubmitting(false);
        }
    };

    const cancelForm = () => {
        setShowForm(false);
        setFormErrors({});
    };

    // Define columns for DataTable
    const columns: Column<NavItem>[] = [
        { header: 'Section', accessor: 'section' },
        { header: 'Title', accessor: 'title' },
        {
            header: 'Link Type',
            accessor: (item) => {
                if (item.subitems && item.subitems.length > 0) {
                    return 'Has Subitems';
                } else if (item.isInternal) {
                    return 'Internal Link';
                } else {
                    return 'External Link';
                }
            }
        },
        {
            header: 'Destination',
            accessor: (item) => {
                if (item.subitems && item.subitems.length > 0) {
                    return `${item.subitems.length} subitems`;
                } else if (item.path) {
                    return item.path;
                } else if (item.link) {
                    return (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {item.link}
                        </a>
                    );
                } else {
                    return 'No destination';
                }
            }
        }
    ];

    return (
        <AdminLayout title="Navigation Items Management">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showForm ? (
                <div className="bg-white shadow-md rounded-md p-6 mb-6">
                    <h3 className="text-lg font-medium mb-4">
                        {isEditing ? 'Edit Navigation Item' : 'Add New Navigation Item'}
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
                                Section<span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="flex">
                                <select
                                    id="section"
                                    value={formData.section}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        formErrors.section ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    {sections.map(section => (
                                        <option key={section} value={section}>{section}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Or enter new section"
                                    className="ml-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            setFormData(prev => ({ ...prev, section: e.target.value }));
                                        }
                                    }}
                                />
                            </div>
                            {formErrors.section && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.section}</p>
                            )}
                        </div>

                        <FormField
                            id="title"
                            label="Title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g. Home, About Us, Products"
                            required
                            error={formErrors.title}
                        />

                        <div className="mb-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isInternal"
                                    checked={formData.isInternal || false}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isInternal: e.target.checked }))}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isInternal" className="ml-2 block text-sm text-gray-700">
                                    Internal Link (within the website)
                                </label>
                            </div>
                        </div>

                        {formData.isInternal ? (
                            <FormField
                                id="path"
                                label="Path"
                                value={formData.path || ''}
                                onChange={handleInputChange}
                                placeholder="e.g. /about, /products"
                                error={formErrors.path}
                                helpText="Internal path starting with /"
                            />
                        ) : (
                            <FormField
                                id="link"
                                label="External Link"
                                type="url"
                                value={formData.link || ''}
                                onChange={handleInputChange}
                                placeholder="https://example.com"
                                error={formErrors.link}
                                helpText="Full URL to external website"
                            />
                        )}

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
                                {isSubmitting ? 'Saving...' : 'Save Navigation Item'}
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
                        Add Navigation Item
                    </button>
                </div>
            )}

            <DataTable<NavItem>
                columns={columns}
                data={navItems}
                isLoading={isLoading}
                keyField="title"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ConfirmationDialog
                isOpen={showDeleteDialog}
                title="Delete Navigation Item"
                message={`Are you sure you want to delete "${navItemToDelete?.title}" from the "${navItemToDelete?.section}" section? This action cannot be undone.`}
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

export default NavItemsPage;