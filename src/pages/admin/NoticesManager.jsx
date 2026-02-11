import React from 'react';
import { Bell } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { noticesApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'title',
        label: 'Title',
        render: (value) => (
            <span className="font-medium text-white">{value}</span>
        )
    },
    {
        key: 'date',
        label: 'Date',
        render: (value) => (
            <span className="text-slate-300">
                {value ? new Date(value).toLocaleDateString() : '-'}
            </span>
        )
    },
    {
        key: 'isActive',
        label: 'Status',
        render: (value) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${value ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
                }`}>
                {value ? 'Active' : 'Inactive'}
            </span>
        )
    },
    {
        key: 'documentUrl',
        label: 'Document',
        render: (value) => (
            value ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline text-sm">
                    View
                </a>
            ) : (
                <span className="text-slate-500">-</span>
            )
        )
    },
];

const formFields = [
    { name: 'title', label: 'Notice Title', type: 'text', required: true, placeholder: 'Important Notice...' },
    { name: 'content', label: 'Content', type: 'textarea', rows: 4, placeholder: 'Notice details...', fullWidth: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'documentUrl', label: 'Document URL', type: 'url', placeholder: 'https://...' },
    { name: 'isActive', label: 'Active', type: 'checkbox', checkboxLabel: 'Display this notice on the website', defaultValue: true },
];

const NoticesManager = () => {
    return (
        <CrudManager
            title="Notices"
            icon={Bell}
            api={noticesApi}
            columns={columns}
            formFields={formFields}
            searchField="title"
            filterOptions={{
                field: 'isActive',
                label: 'Status',
                options: [
                    { value: true, label: 'Active' },
                    { value: false, label: 'Inactive' }
                ]
            }}
        />
    );
};

export default NoticesManager;
