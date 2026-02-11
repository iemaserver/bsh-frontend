import React from 'react';
import { FileText } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { publicationsApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'title',
        label: 'Title',
        render: (value) => (
            <span className="font-medium text-white line-clamp-2">{value}</span>
        )
    },
    { key: 'authors', label: 'Authors' },
    { key: 'year', label: 'Year' },
    {
        key: 'publicationType',
        label: 'Type',
        render: (value) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'journal' ? 'bg-teal-500/20 text-teal-400' :
                    value === 'conference' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-amber-500/20 text-amber-400'
                }`}>
                {value}
            </span>
        )
    },
];

const formFields = [
    { name: 'title', label: 'Publication Title', type: 'text', required: true, placeholder: 'Research paper title...' },
    { name: 'authors', label: 'Authors', type: 'text', required: true, placeholder: 'John Doe, Jane Smith' },
    {
        name: 'publicationType',
        label: 'Type',
        type: 'select',
        required: true,
        options: [
            { value: 'journal', label: 'Journal' },
            { value: 'conference', label: 'Conference' },
            { value: 'book', label: 'Book/Book Chapter' }
        ]
    },
    { name: 'journalName', label: 'Journal/Conference/Book Name', type: 'text', placeholder: 'IEEE Transactions on...' },
    { name: 'year', label: 'Year', type: 'text', placeholder: '2024' },
    { name: 'volume', label: 'Volume', type: 'text', placeholder: 'Vol. 12' },
    { name: 'pages', label: 'Pages', type: 'text', placeholder: '100-110' },
    { name: 'doi', label: 'DOI', type: 'text', placeholder: '10.1000/xyz123' },
    { name: 'url', label: 'Paper URL', type: 'url', placeholder: 'https://...' },
];

const PublicationsManager = () => {
    return (
        <CrudManager
            title="Publications"
            icon={FileText}
            api={publicationsApi}
            columns={columns}
            formFields={formFields}
            searchField="title"
            filterOptions={{
                field: 'publicationType',
                label: 'Types',
                options: [
                    { value: 'journal', label: 'Journal' },
                    { value: 'conference', label: 'Conference' },
                    { value: 'book', label: 'Book' }
                ]
            }}
        />
    );
};

export default PublicationsManager;
