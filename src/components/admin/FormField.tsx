import React from 'react';

interface FormFieldProps {
    id: string;
    label: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'textarea';
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    helpText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
                                                 id,
                                                 label,
                                                 type = 'text',
                                                 value,
                                                 onChange,
                                                 placeholder = '',
                                                 required = false,
                                                 disabled = false,
                                                 error,
                                                 helpText
                                             }) => {
    const commonClasses = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
    } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`;

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {type === 'textarea' ? (
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={`${commonClasses} min-h-[100px]`}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={commonClasses}
                />
            )}

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            {helpText && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
        </div>
    );
};

export default FormField;