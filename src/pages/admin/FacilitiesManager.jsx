import React from 'react';
import { Layers } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { facilitiesApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'name',
        label: 'Facility',
        render: (value, item) => {
            // Get first image from comma-separated list
            const imageField = item.imageUrl || item.image_url || '';
            const firstImage = imageField ? imageField.split(',')[0].trim() : null;
            
            return (
                <div className="flex items-center gap-3">
                    {firstImage ? (
                        <img src={firstImage} alt={value} className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                            <Layers className="w-6 h-6 text-slate-400" />
                        </div>
                    )}
                    <span className="font-medium text-white">{value}</span>
                </div>
            );
        }
    },
    { key: 'icon', label: 'Icon' },
    { key: 'orderIndex', label: 'Order' },
];

const formFields = [
    { name: 'name', label: 'Facility Name', type: 'text', required: true, placeholder: 'Computer Lab' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3, placeholder: 'Facility details...', fullWidth: true },
    { name: 'location', label: 'Location', type: 'text', placeholder: 'Block A, Room 101' },
    { name: 'imageUrl', label: 'Image', type: 'image', placeholder: 'Upload facility image' },
    { name: 'orderIndex', label: 'Display Order', type: 'number', defaultValue: 0 },
];

const FacilitiesManager = () => {
    return (
        <CrudManager
            title="Facilities"
            icon={Layers}
            api={facilitiesApi}
            columns={columns}
            formFields={formFields}
            searchField="name"
        />
    );
};

export default FacilitiesManager;
