import React from 'react';
import { Users } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { advisoryBoardApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'name',
        label: 'Name',
        render: (value, item) => (
            <div className="flex items-center gap-3">
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={value} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                        {value?.charAt(0)}
                    </div>
                )}
                <div>
                    <p className="font-medium text-white">{value}</p>
                    <p className="text-xs text-slate-400">{item.designation}</p>
                </div>
            </div>
        )
    },
    { key: 'organization', label: 'Organization' },
    { key: 'orderIndex', label: 'Order' },
];

const formFields = [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Dr. John Doe' },
    { name: 'designation', label: 'Designation', type: 'text', placeholder: 'Director' },
    { name: 'organization', label: 'Organization', type: 'text', placeholder: 'IIT Kharagpur' },
    { name: 'qualification', label: 'Qualification', type: 'text', placeholder: 'Ph.D., M.Tech' },
    { name: 'expertise', label: 'Area of Expertise', type: 'text', placeholder: 'Machine Learning' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'email@org.com' },
    { name: 'imageUrl', label: 'Photo', type: 'image', placeholder: 'Upload profile photo' },
    { name: 'bio', label: 'Biography', type: 'textarea', rows: 3, placeholder: 'Brief bio...', fullWidth: true },
    { name: 'orderIndex', label: 'Display Order', type: 'number', defaultValue: 0 },
];

const AdvisoryBoardManager = () => {
    return (
        <CrudManager
            title="Advisory Board"
            icon={Users}
            api={advisoryBoardApi}
            columns={columns}
            formFields={formFields}
            searchField="name"
        />
    );
};

export default AdvisoryBoardManager;
