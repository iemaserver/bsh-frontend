import React from 'react';
import { Award } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { accreditationApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'name',
        label: 'Accreditation',
        render: (value, item) => (
            <div className="flex items-center gap-3">
                {item.logoUrl ? (
                    <img src={item.logoUrl} alt={value} className="w-12 h-12 rounded-lg object-contain bg-white p-1" />
                ) : (
                    <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                        <Award className="w-6 h-6 text-slate-400" />
                    </div>
                )}
                <span className="font-medium text-white">{value}</span>
            </div>
        )
    },
    { key: 'validUntil', label: 'Valid Until' },
    { key: 'grade', label: 'Grade' },
];

const formFields = [
    { name: 'name', label: 'Accreditation Name', type: 'text', required: true, placeholder: 'NBA Accreditation' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3, placeholder: 'Accreditation details...' },
    { name: 'logoUrl', label: 'Logo', type: 'image', placeholder: 'Upload accreditation logo' },
    { name: 'certificateUrl', label: 'Certificate URL', type: 'url', placeholder: 'https://...' },
    { name: 'validFrom', label: 'Valid From', type: 'date' },
    { name: 'validUntil', label: 'Valid Until', type: 'date' },
    { name: 'grade', label: 'Grade', type: 'text', placeholder: 'A++' },
];

const AccreditationManager = () => {
    return (
        <CrudManager
            title="Accreditation"
            icon={Award}
            api={accreditationApi}
            columns={columns}
            formFields={formFields}
            searchField="name"
        />
    );
};

export default AccreditationManager;
