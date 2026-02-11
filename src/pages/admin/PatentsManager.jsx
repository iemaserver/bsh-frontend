import React from 'react';
import { Shield } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { patentsApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'title',
        label: 'Patent Title',
        render: (value) => (
            <span className="font-medium text-white">{value}</span>
        )
    },
    { key: 'inventors', label: 'Inventors' },
    { key: 'patentNumber', label: 'Patent No.' },
    {
        key: 'status',
        label: 'Status',
        render: (value) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'granted' ? 'bg-green-500/20 text-green-400' :
                    value === 'filed' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-amber-500/20 text-amber-400'
                }`}>
                {value}
            </span>
        )
    },
];

const formFields = [
    { name: 'title', label: 'Patent Title', type: 'text', required: true, placeholder: 'Invention title...' },
    { name: 'inventors', label: 'Inventors', type: 'text', required: true, placeholder: 'John Doe, Jane Smith' },
    { name: 'patentNumber', label: 'Patent/Application Number', type: 'text', placeholder: 'IN202X/XXX' },
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'filed', label: 'Filed' },
            { value: 'published', label: 'Published' },
            { value: 'granted', label: 'Granted' }
        ]
    },
    { name: 'filingDate', label: 'Filing Date', type: 'date' },
    { name: 'country', label: 'Country', type: 'text', placeholder: 'India' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3, placeholder: 'Brief description...', fullWidth: true },
];

const PatentsManager = () => {
    return (
        <CrudManager
            title="Patents"
            icon={Shield}
            api={patentsApi}
            columns={columns}
            formFields={formFields}
            searchField="title"
            filterOptions={{
                field: 'status',
                label: 'Status',
                options: [
                    { value: 'filed', label: 'Filed' },
                    { value: 'published', label: 'Published' },
                    { value: 'granted', label: 'Granted' }
                ]
            }}
        />
    );
};

export default PatentsManager;
