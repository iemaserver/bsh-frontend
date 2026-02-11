import React from 'react';
import { Briefcase } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { consultanciesApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'title',
        label: 'Project Title',
        render: (value) => (
            <span className="font-medium text-white">{value}</span>
        )
    },
    { key: 'clientName', label: 'Client' },
    {
        key: 'amount',
        label: 'Amount',
        render: (value) => (
            <span className="text-emerald-400 font-medium">
                {value ? `₹${value.toLocaleString()}` : '-'}
            </span>
        )
    },
    {
        key: 'status',
        label: 'Status',
        render: (value) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'completed' ? 'bg-green-500/20 text-green-400' :
                    value === 'ongoing' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-amber-500/20 text-amber-400'
                }`}>
                {value}
            </span>
        )
    },
];

const formFields = [
    { name: 'title', label: 'Project Title', type: 'text', required: true, placeholder: 'Consultancy project...' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3, placeholder: 'Project details...', fullWidth: true },
    { name: 'clientName', label: 'Client Name', type: 'text', required: true, placeholder: 'Company Name' },
    { name: 'principalConsultant', label: 'Principal Consultant', type: 'text', placeholder: 'Dr. John Doe' },
    { name: 'amount', label: 'Amount (₹)', type: 'number', placeholder: '100000' },
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'ongoing', label: 'Ongoing' },
            { value: 'completed', label: 'Completed' }
        ]
    },
    { name: 'startDate', label: 'Start Date', type: 'date' },
    { name: 'endDate', label: 'End Date', type: 'date' },
];

const ConsultanciesManager = () => {
    return (
        <CrudManager
            title="Consultancy Projects"
            icon={Briefcase}
            api={consultanciesApi}
            columns={columns}
            formFields={formFields}
            searchField="title"
            filterOptions={{
                field: 'status',
                label: 'Status',
                options: [
                    { value: 'ongoing', label: 'Ongoing' },
                    { value: 'completed', label: 'Completed' }
                ]
            }}
        />
    );
};

export default ConsultanciesManager;
