import React from 'react';
import { Award } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { awardsApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'title',
        label: 'Award',
        render: (value, item) => (
            <div className="flex items-center gap-3">
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={value} className="w-12 h-12 rounded-lg object-cover" />
                ) : (
                    <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Award className="w-6 h-6 text-amber-400" />
                    </div>
                )}
                <div>
                    <p className="font-medium text-white">{value}</p>
                    <p className="text-xs text-slate-400">{item.recipientName}</p>
                </div>
            </div>
        )
    },
    { key: 'recipientName', label: 'Recipient' },
    { key: 'year', label: 'Year' },
    {
        key: 'category',
        label: 'Category',
        render: (value) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'faculty' ? 'bg-teal-500/20 text-teal-400' :
                'bg-violet-500/20 text-violet-400'
                }`}>
                {value === 'faculty' ? 'Faculty' : 'Student'}
            </span>
        )
    },
];

const formFields = [
    { name: 'title', label: 'Award Title', type: 'text', required: true, placeholder: 'Best Researcher Award' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3, placeholder: 'Award details...' },
    { name: 'recipientName', label: 'Recipient Name', type: 'text', required: true, placeholder: 'Dr. John Doe' },
    {
        name: 'category',
        label: 'Category',
        type: 'select',
        required: true,
        options: [
            { value: 'faculty', label: 'Faculty Award' },
            { value: 'student', label: 'Student Award' }
        ]
    },
    { name: 'year', label: 'Year', type: 'text', placeholder: '2024' },
    { name: 'imageUrl', label: 'Image', type: 'image', placeholder: 'Upload award image' },
];

const AwardsManager = () => {
    return (
        <CrudManager
            title="Awards"
            icon={Award}
            api={awardsApi}
            columns={columns}
            formFields={formFields}
            searchField="title"
            filterOptions={{
                field: 'category',
                label: 'Categories',
                options: [
                    { value: 'faculty', label: 'Faculty' },
                    { value: 'student', label: 'Student' }
                ]
            }}
        />
    );
};

export default AwardsManager;
