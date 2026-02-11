import React from 'react';
import { GraduationCap } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { phdStudentsApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'name',
        label: 'Student Name',
        render: (value) => (
            <span className="font-medium text-white">{value}</span>
        )
    },
    { key: 'researchTopic', label: 'Research Topic' },
    { key: 'enrollmentYear', label: 'Enrolled' },
    {
        key: 'status',
        label: 'Status',
        render: (value) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'pursuing' ? 'bg-blue-500/20 text-blue-400' :
                    value === 'completed' ? 'bg-green-500/20 text-green-400' :
                        'bg-amber-500/20 text-amber-400'
                }`}>
                {value}
            </span>
        )
    },
];

const formFields = [
    { name: 'name', label: 'Student Name', type: 'text', required: true, placeholder: 'Scholar Name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'scholar@email.com' },
    { name: 'researchTopic', label: 'Research Topic', type: 'text', required: true, placeholder: 'PhD research topic...' },
    { name: 'enrollmentYear', label: 'Enrollment Year', type: 'text', placeholder: '2022' },
    { name: 'supervisorId', label: 'Supervisor ID', type: 'number', placeholder: 'Supervisor ID from database' },
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'pursuing', label: 'Pursuing' },
            { value: 'completed', label: 'Completed' },
            { value: 'submitted', label: 'Thesis Submitted' }
        ]
    },
];

const PhdStudentsManager = () => {
    return (
        <CrudManager
            title="PhD Students"
            icon={GraduationCap}
            api={phdStudentsApi}
            columns={columns}
            formFields={formFields}
            searchField="name"
            filterOptions={{
                field: 'status',
                label: 'Status',
                options: [
                    { value: 'pursuing', label: 'Pursuing' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'submitted', label: 'Submitted' }
                ]
            }}
        />
    );
};

export default PhdStudentsManager;
