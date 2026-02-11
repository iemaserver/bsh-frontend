import React from 'react';
import { BookOpen } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { journalsApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'name',
        label: 'Journal Title',
        render: (value, item) => (
            <div className="flex items-center gap-3">
                {item.imageUrl && (
                    <img src={`/puppeteer_assets/${item.imageUrl.replace('puppeteer_assets/', '')}`} alt={value} className="w-12 h-12 rounded-lg object-cover" />
                )}
                <span className="font-medium text-white">{value}</span>
            </div>
        )
    },
    { key: 'issn', label: 'ISSN' },
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
    { name: 'name', label: 'Journal Name', type: 'text', required: true, placeholder: 'International Journal of...' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3, placeholder: 'Journal description...' },
    { name: 'issn', label: 'ISSN', type: 'text', placeholder: '1234-5678' },
    { name: 'websiteUrl', label: 'Website URL', type: 'url', placeholder: 'https://...' },
    { name: 'imageUrl', label: 'Cover Image', type: 'image', placeholder: 'Upload cover image' },
];

const JournalsManager = () => {
    return (
        <CrudManager
            title="Journals"
            icon={BookOpen}
            api={journalsApi}
            columns={columns}
            formFields={formFields}
            searchField="name"
        />
    );
};

export default JournalsManager;
