import React from 'react';
import { Users } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { researchSupervisorsApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'name',
        label: 'Supervisor Name',
        render: (value) => (
            <span className="font-medium text-white">{value}</span>
        )
    },
    { key: 'designation', label: 'Designation' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'email', label: 'Email' },
];

const formFields = [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Dr. John Doe' },
    { name: 'designation', label: 'Designation', type: 'text', placeholder: 'Professor' },
    { name: 'qualification', label: 'Qualification', type: 'text', placeholder: 'Ph.D.' },
    { name: 'specialization', label: 'Research Area', type: 'text', placeholder: 'Machine Learning' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'john.doe@iem.edu.in' },
];

const ResearchSupervisorsManager = () => {
    return (
        <CrudManager
            title="Research Supervisors"
            icon={Users}
            api={researchSupervisorsApi}
            columns={columns}
            formFields={formFields}
            searchField="name"
        />
    );
};

export default ResearchSupervisorsManager;
