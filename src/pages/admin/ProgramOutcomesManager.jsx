import React from 'react';
import { Lightbulb } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { programOutcomesApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'code',
        label: 'Code',
        render: (value) => (
            <span className="px-2 py-1 rounded bg-teal-500/20 text-teal-400 font-mono font-medium">
                {value}
            </span>
        )
    },
    {
        key: 'title',
        label: 'Title',
        render: (value) => (
            <span className="font-medium text-white">{value}</span>
        )
    },
    { key: 'orderIndex', label: 'Order' },
];

const formFields = [
    { name: 'code', label: 'Code', type: 'text', required: true, placeholder: 'PO1' },
    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Engineering Knowledge' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 4, placeholder: 'Detailed description...', fullWidth: true },
    { name: 'orderIndex', label: 'Display Order', type: 'number', defaultValue: 0 },
];

const ProgramOutcomesManager = () => {
    return (
        <CrudManager
            title="Program Outcomes"
            icon={Lightbulb}
            api={programOutcomesApi}
            columns={columns}
            formFields={formFields}
            searchField="title"
        />
    );
};

export default ProgramOutcomesManager;
