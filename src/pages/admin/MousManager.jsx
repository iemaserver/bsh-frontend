import React from 'react';
import { Building2 } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { mousApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'organizationName',
        label: 'Organization',
        render: (value) => (
            <span className="font-medium text-white">{value}</span>
        )
    },
    { key: 'purpose', label: 'Purpose' },
    {
        key: 'signedDate',
        label: 'Signed Date',
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
                {value ? 'Active' : 'Expired'}
            </span>
        )
    },
];

const formFields = [
    { name: 'organizationName', label: 'Organization Name', type: 'text', required: true, placeholder: 'Partner Organization' },
    { name: 'organizationType', label: 'Organization Type', type: 'text', placeholder: 'Industry/Academic' },
    { name: 'purpose', label: 'Purpose', type: 'textarea', rows: 3, placeholder: 'MoU purpose...', fullWidth: true },
    { name: 'signedDate', label: 'Signed Date', type: 'date' },
    { name: 'validUntil', label: 'Valid Until', type: 'date' },
    { name: 'documentUrl', label: 'Document URL', type: 'url', placeholder: 'https://...' },
    { name: 'isActive', label: 'Active', type: 'checkbox', checkboxLabel: 'MoU is currently active', defaultValue: true },
];

const MousManager = () => {
    return (
        <CrudManager
            title="Memorandum of Understanding (MoUs)"
            icon={Building2}
            api={mousApi}
            columns={columns}
            formFields={formFields}
            searchField="organizationName"
        />
    );
};

export default MousManager;
