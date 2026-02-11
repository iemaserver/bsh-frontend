import React from 'react';
import { Image } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { galleryApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'imageUrl',
        label: 'Image',
        render: (value, item) => (
            <div className="flex items-center gap-3">
                {value ? (
                    <img src={value} alt={item.title || 'Gallery'} className="w-16 h-12 rounded-lg object-cover" />
                ) : (
                    <div className="w-16 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                        <Image className="w-6 h-6 text-slate-400" />
                    </div>
                )}
                <p className="font-medium text-white">{item.title || 'Untitled'}</p>
            </div>
        )
    },
    { key: 'category', label: 'Category' },
    {
        key: 'date',
        label: 'Date',
        render: (value) => (
            <span className="text-slate-300">
                {value ? new Date(value).toLocaleDateString() : '-'}
            </span>
        )
    },
];

const formFields = [
    { name: 'title', label: 'Image Title', type: 'text', placeholder: 'Event Photo' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 2, placeholder: 'Photo description...' },
    { name: 'imageUrl', label: 'Image', type: 'image', required: true, placeholder: 'Upload gallery image' },
    {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: [
            { value: 'event', label: 'Event' },
            { value: 'seminar', label: 'Seminar' },
            { value: 'workshop', label: 'Workshop' },
            { value: 'campus', label: 'Campus' },
            { value: 'achievement', label: 'Achievement' },
            { value: 'other', label: 'Other' }
        ]
    },
    { name: 'date', label: 'Date', type: 'date' },
];

const GalleryManager = () => {
    return (
        <CrudManager
            title="Photo Gallery"
            icon={Image}
            api={galleryApi}
            columns={columns}
            formFields={formFields}
            searchField="title"
            filterOptions={{
                field: 'category',
                label: 'Categories',
                options: [
                    { value: 'event', label: 'Event' },
                    { value: 'seminar', label: 'Seminar' },
                    { value: 'workshop', label: 'Workshop' },
                    { value: 'campus', label: 'Campus' },
                    { value: 'achievement', label: 'Achievement' },
                    { value: 'other', label: 'Other' }
                ]
            }}
        />
    );
};

export default GalleryManager;
