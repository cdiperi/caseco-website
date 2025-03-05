import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable, { Column } from '@/components/admin/DataTable';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import FormField from '@/components/admin/FormField';
import { adminService } from '@/services/adminService';

interface Product {
    id: string;
    manufacturerId: string;
    name: string;
    image: string;
    link: string;
}

interface Manufacturer {
    id: string;
    name: string;
}

const ProductsPage: React.FC = () => {
    // State for products data
    const [products, setProducts] = useState<Product[]>([]);
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for form
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Product>({
        id: '',
        manufacturerId: '',
        name: '',
        image: '',
        link: ''
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isEditing, setIsEditing] = useState(false);

    // State for delete confirmation
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch products and manufacturers when component mounts
    useEffect(() => {
        Promise.all([
            fetchProducts(),
            fetchManufacturers()
        ]);
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await adminService.getItems<Product>('products');
            setProducts(response.items);
        } catch (err: any) {
            console.error('Error fetching products:', err);
            setError(err.message || 'Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchManufacturers = async () => {
        try {
            const response = await adminService.getItems<Manufacturer>('manufacturers');
            setManufacturers(response.items);
        } catch (err: any) {
            console.error('Error fetching manufacturers:', err);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            errors.name = 'Product name is required';
        }

        if (!formData.manufacturerId) {
            errors.manufacturerId = 'Manufacturer is required';
        }

        if (!formData.image.trim()) {
            errors.image = 'Image URL is required';
        } else if (!formData.image.startsWith('http')) {
            errors.image = 'Image URL must be a valid URL';
        }

        if (!formData.link.trim()) {
            errors.link = 'Product link is required';
        } else if (!formData.link.startsWith('http')) {
            errors.link = 'Product link must be a valid URL';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddNew = () => {
        // Generate a unique ID for the new product
        const newId = `product-${Date.now()}`;

        setFormData({
            id: newId,
            manufacturerId: manufacturers.length > 0 ? manufacturers[0].id : '',
            name: '',
            image: '',
            link: ''
        });
        setFormErrors({});
        setIsEditing(false);
        setShowForm(true);
    };

    const handleEdit = (product: Product) => {
        setFormData({ ...product });
        setFormErrors({});
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = (product: Product) => {
        setProductToDelete(product);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;

        setIsSubmitting(true);

        try {
            await adminService.deleteItem('products', productToDelete.id, productToDelete.manufacturerId);
            setProducts(prev => prev.filter(p =>
                !(p.id === productToDelete.id && p.manufacturerId === productToDelete.manufacturerId)
            ));
            setShowDeleteDialog(false);
            setProductToDelete(null);
        } catch (err: any) {
            console.error('Error deleting product:', err);
            setError(err.message || 'Failed to delete product');
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
                // Update existing product
                await adminService.updateItem('products', formData.id, formData, formData.manufacturerId);

                // Update local state
                setProducts(prev =>
                    prev.map(p =>
                        (p.id === formData.id && p.manufacturerId === formData.manufacturerId)
                            ? formData
                            : p
                    )
                );
            } else {
                // Create new product
                const newProduct = await adminService.createItem<Product>('products', formData);

                // Update local state
                setProducts(prev => [...prev, newProduct]);
            }

            // Close form
            setShowForm(false);
        } catch (err: any) {
            console.error('Error saving product:', err);
            setError(err.message || 'Failed to save product');
        } finally {
            setIsSubmitting(false);
        }
    };

    const cancelForm = () => {
        setShowForm(false);
        setFormErrors({});
    };

    // Get manufacturer name by ID
    const getManufacturerName = (manufacturerId: string): string => {
        const manufacturer = manufacturers.find(m => m.id === manufacturerId);
        return manufacturer ? manufacturer.name : 'Unknown';
    };

    // Define columns for DataTable
    const columns: Column<Product>[] = [
        { header: 'Name', accessor: 'name' },
        {
            header: 'Manufacturer',
            accessor: (item) => getManufacturerName(item.manufacturerId)
        },
        {
            header: 'Image',
            accessor: (item) => (
                <div className="w-32 h-12 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.name}
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
            header: 'Link',
            accessor: (item) => (
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    View Product
                </a>
            )
        }
    ];

    return (
        <AdminLayout title="Products Management">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showForm ? (
                <div className="bg-white shadow-md rounded-md p-6 mb-6">
                    <h3 className="text-lg font-medium mb-4">
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="manufacturerId" className="block text-sm font-medium text-gray-700 mb-1">
                                Manufacturer<span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                                id="manufacturerId"
                                value={formData.manufacturerId}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    formErrors.manufacturerId ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            >
                                <option value="">Select a manufacturer</option>
                                {manufacturers.map(manufacturer => (
                                    <option key={manufacturer.id} value={manufacturer.id}>
                                        {manufacturer.name}
                                    </option>
                                ))}
                            </select>
                            {formErrors.manufacturerId && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.manufacturerId}</p>
                            )}
                        </div>

                        <FormField
                            id="name"
                            label="Product Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Product XYZ-100"
                            required
                            error={formErrors.name}
                        />

                        <FormField
                            id="image"
                            label="Image URL"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="https://example.com/product-image.jpg"
                            required
                            error={formErrors.image}
                            helpText="Enter a full URL to the product image"
                        />

                        <FormField
                            id="link"
                            label="Product Link"
                            type="url"
                            value={formData.link}
                            onChange={handleInputChange}
                            placeholder="https://example.com/product-page"
                            required
                            error={formErrors.link}
                            helpText="Link to the product page or specification"
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
                                {isSubmitting ? 'Saving...' : 'Save Product'}
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
                        Add Product
                    </button>
                </div>
            )}

            <DataTable<Product>
                columns={columns}
                data={products}
                isLoading={isLoading}
                keyField="id"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ConfirmationDialog
                isOpen={showDeleteDialog}
                title="Delete Product"
                message={`Are you sure you want to delete ${productToDelete?.name}? This action cannot be undone.`}
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

export default ProductsPage;