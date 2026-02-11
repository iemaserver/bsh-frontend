import React from 'react';
import { FileText } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { syllabiApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'title',
        label: 'Subject',
        render: (value) => (
            <span className="font-medium text-white">{value}</span>
        )
    },
    { key: 'subjectCode', label: 'Code' },
    { key: 'year', label: 'Year' },
    { key: 'category', label: 'Category' },
    {
        key: 'fileUrl',
        label: 'File',
        render: (value) => (
            value ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline text-sm">
                    View
                </a>
            ) : '-'
        )
    },
];

const formFields = [
    { name: 'title', label: 'Subject Title', type: 'text', required: true, placeholder: 'Mathematics-I' },
    { name: 'subjectCode', label: 'Subject Code', type: 'text', placeholder: 'MA101' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 2, placeholder: 'Subject description...' },
    { name: 'year', label: 'Year', type: 'text', placeholder: '1st Year' },
    {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: [
            { value: 'mathematics', label: 'Mathematics' },
            { value: 'physics', label: 'Physics' },
            { value: 'chemistry', label: 'Chemistry' },
            { value: 'english', label: 'English' },
            { value: 'other', label: 'Other' }
        ]
    },
    { name: 'fileUrl', label: 'Syllabus File URL', type: 'url', placeholder: 'https://...' },
];

const SyllabiManager = () => {
    return (
        <CrudManager
            title="Syllabi"
            icon={FileText}
            api={syllabiApi}
            columns={columns}
            formFields={formFields}
            searchField="title"
        />
    );
};

export default SyllabiManager;
