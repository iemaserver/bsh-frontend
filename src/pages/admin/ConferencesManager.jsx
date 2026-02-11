import React from 'react';
import { Briefcase } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { conferencesApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'name',
        label: 'Conference',
        render: (value, item) => (
            <div>
                <span className="font-medium text-white">{value}</span>
                {item.shortName && (
                    <span className="ml-2 px-2 py-0.5 bg-teal-500/20 text-teal-400 text-xs rounded-full">{item.shortName}</span>
                )}
            </div>
        )
    },
    { key: 'year', label: 'Year' },
    {
        key: 'websiteUrl',
        label: 'Website',
        render: (value) => (
            value ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline text-sm">
                    Visit
                </a>
            ) : '-'
        )
    },
];

const formFields = [
    { name: 'name', label: 'Conference Name', type: 'text', required: true, placeholder: 'International Conference on...' },
    { name: 'shortName', label: 'Short Name', type: 'text', placeholder: 'ICELTS' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3, placeholder: 'Conference details...' },
    { name: 'year', label: 'Year', type: 'text', placeholder: '2024' },
    { name: 'websiteUrl', label: 'Website URL', type: 'url', placeholder: 'https://...' },
];

const ConferencesManager = () => {
    return (
        <CrudManager
            title="Conferences"
            icon={Briefcase}
            api={conferencesApi}
            columns={columns}
            formFields={formFields}
            searchField="name"
        />
    );
};

export default ConferencesManager;
