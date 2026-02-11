import React from 'react';
import { Calendar } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { eventsApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'title',
        label: 'Event',
        render: (value, item) => (
            <div className="flex items-center gap-3">
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={value} className="w-12 h-12 rounded-lg object-cover" />
                ) : (
                    <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-slate-400" />
                    </div>
                )}
                <div>
                    <p className="font-medium text-white">{value}</p>
                    <p className="text-xs text-slate-400">{item.category}</p>
                </div>
            </div>
        )
    },
    { key: 'venue', label: 'Venue' },
    { key: 'year', label: 'Year' },
    {
        key: 'category',
        label: 'Category',
        render: (value) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'workshop' ? 'bg-blue-500/20 text-blue-400' :
                value === 'seminar' ? 'bg-purple-500/20 text-purple-400' :
                    value === 'conference' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-slate-700 text-slate-400'
                }`}>
                {value}
            </span>
        )
    },
];

const formFields = [
    { name: 'title', label: 'Event Title', type: 'text', required: true, placeholder: 'Annual Tech Fest 2024' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 4, placeholder: 'Event details...', fullWidth: true },
    {
        name: 'category',
        label: 'Category',
        type: 'select',
        required: true,
        options: [
            { value: 'workshop', label: 'Workshop' },
            { value: 'seminar', label: 'Seminar' },
            { value: 'conference', label: 'Conference' },
            { value: 'competition', label: 'Competition' },
            { value: 'cultural', label: 'Cultural' },
            { value: 'other', label: 'Other' }
        ]
    },
    { name: 'venue', label: 'Venue', type: 'text', placeholder: 'Main Auditorium' },
    { name: 'year', label: 'Year', type: 'text', placeholder: '2024' },
    { name: 'imageUrl', label: 'Image', type: 'image', placeholder: 'Upload event image' },
    { name: 'link', label: 'External Link', type: 'url', placeholder: 'https://...' },
];

const EventsManager = () => {
    return (
        <CrudManager
            title="Events"
            icon={Calendar}
            api={eventsApi}
            columns={columns}
            formFields={formFields}
            searchField="title"
            filterOptions={{
                field: 'category',
                label: 'Categories',
                options: [
                    { value: 'workshop', label: 'Workshop' },
                    { value: 'seminar', label: 'Seminar' },
                    { value: 'conference', label: 'Conference' },
                    { value: 'competition', label: 'Competition' },
                    { value: 'cultural', label: 'Cultural' },
                    { value: 'other', label: 'Other' }
                ]
            }}
        />
    );
};

export default EventsManager;
