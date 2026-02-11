import React from 'react';
import { Briefcase } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { fundedProjectsApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'title',
        label: 'Project Title',
        render: (value) => (
            <span className="font-medium text-white">{value}</span>
        )
    },
    { key: 'principalInvestigator', label: 'PI' },
    { key: 'fundingAgency', label: 'Funding Agency' },
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
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'ongoing' ? 'bg-blue-500/20 text-blue-400' :
                    value === 'completed' ? 'bg-green-500/20 text-green-400' :
                        'bg-amber-500/20 text-amber-400'
                }`}>
                {value}
            </span>
        )
    },
];

const formFields = [
    { name: 'title', label: 'Project Title', type: 'text', required: true, placeholder: 'Research project title...' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3, placeholder: 'Project description...', fullWidth: true },
    { name: 'principalInvestigator', label: 'Principal Investigator', type: 'text', required: true, placeholder: 'Dr. John Doe' },
    { name: 'coPrincipalInvestigator', label: 'Co-PI', type: 'text', placeholder: 'Dr. Jane Smith' },
    { name: 'fundingAgency', label: 'Funding Agency', type: 'text', required: true, placeholder: 'DST, AICTE, etc.' },
    { name: 'amount', label: 'Amount (₹)', type: 'number', placeholder: '500000' },
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'ongoing', label: 'Ongoing' },
            { value: 'completed', label: 'Completed' },
            { value: 'submitted', label: 'Submitted' }
        ]
    },
    { name: 'startDate', label: 'Start Date', type: 'date' },
    { name: 'endDate', label: 'End Date', type: 'date' },
];

const FundedProjectsManager = () => {
    return (
        <CrudManager
            title="Funded Projects"
            icon={Briefcase}
            api={fundedProjectsApi}
            columns={columns}
            formFields={formFields}
            searchField="title"
            filterOptions={{
                field: 'status',
                label: 'Status',
                options: [
                    { value: 'ongoing', label: 'Ongoing' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'submitted', label: 'Submitted' }
                ]
            }}
        />
    );
};

export default FundedProjectsManager;
