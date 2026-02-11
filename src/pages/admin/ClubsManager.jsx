import React from 'react';
import { GraduationCap } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { clubsApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'name',
        label: 'Club Name',
        render: (value, item) => (
            <div className="flex items-center gap-3">
                {item.logoUrl ? (
                    <img src={item.logoUrl} alt={value} className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-violet-400" />
                    </div>
                )}
                <span className="font-medium text-white">{value}</span>
            </div>
        )
    },
    { key: 'coordinator', label: 'Coordinator' },
    { key: 'email', label: 'Email' },
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
    { name: 'name', label: 'Club Name', type: 'text', required: true, placeholder: 'Coding Club' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3, placeholder: 'Club description...', fullWidth: true },
    { name: 'coordinator', label: 'Coordinator Name', type: 'text', placeholder: 'Dr. Jane Doe' },
    { name: 'email', label: 'Contact Email', type: 'email', placeholder: 'club@iem.edu.in' },
    { name: 'phone', label: 'Contact Phone', type: 'text', placeholder: '+91 9876543210' },
    { name: 'logoUrl', label: 'Logo', type: 'image', placeholder: 'Upload club logo' },
    { name: 'websiteUrl', label: 'Website URL', type: 'url', placeholder: 'https://...' },
    { name: 'activitiesUrl', label: 'Activities URL', type: 'url', placeholder: 'https://...' },
];

const ClubsManager = () => {
    return (
        <CrudManager
            title="Clubs & Student Chapters"
            icon={GraduationCap}
            api={clubsApi}
            columns={columns}
            formFields={formFields}
            searchField="name"
        />
    );
};

export default ClubsManager;
