import React from 'react';

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    width?: string;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    keyField: keyof T;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}

function DataTable<T>({
                          columns,
                          data,
                          isLoading = false,
                          keyField,
                          onEdit,
                          onDelete
                      }: DataTableProps<T>) {
    if (isLoading) {
        return (
            <div className="bg-white shadow-md rounded-md">
                <div className="p-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-2 text-gray-600">Loading data...</p>
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="bg-white shadow-md rounded-md">
                <div className="p-8 text-center">
                    <p className="text-gray-600">No data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                style={{ width: column.width }}
                            >
                                {column.header}
                            </th>
                        ))}
                        {(onEdit || onDelete) && (
                            <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        )}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                        <tr key={String(item[keyField])} className="hover:bg-gray-50">
                            {columns.map((column, columnIndex) => (
                                <td key={columnIndex} className="px-6 py-4 whitespace-nowrap">
                                    {typeof column.accessor === 'function'
                                        ? column.accessor(item)
                                        : String(item[column.accessor] || '')}
                                </td>
                            ))}
                            {(onEdit || onDelete) && (
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {onEdit && (
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            onClick={() => onDelete(item)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable;