import React from 'react';
import { Calendar } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { bosMeetingsApi } from '@/lib/adminApi';

const columns = [
    {
        key: 'meetingNumber',
        label: 'Meeting #',
        render: (value) => (
            <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 font-medium">
                #{value}
            </span>
        )
    },
    {
        key: 'date',
        label: 'Date',
        render: (value) => (
            <span className="text-white">
                {value ? new Date(value).toLocaleDateString() : '-'}
            </span>
        )
    },
    { key: 'venue', label: 'Venue' },
    {
        key: 'minutesUrl',
        label: 'Minutes',
        render: (value) => (
            value ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline text-sm">
                    View
                </a>
            ) : '-'
        )
    },
];

const formFields = [
    { name: 'meetingNumber', label: 'Meeting Number', type: 'number', required: true, placeholder: '1' },
    { name: 'date', label: 'Meeting Date', type: 'date', required: true },
    { name: 'venue', label: 'Venue', type: 'text', placeholder: 'Conference Room' },
    { name: 'agenda', label: 'Agenda', type: 'textarea', rows: 4, placeholder: 'Meeting agenda...', fullWidth: true },
    { name: 'minutesUrl', label: 'Minutes Document URL', type: 'url', placeholder: 'https://...' },
];

const BosMeetingsManager = () => {
    return (
        <CrudManager
            title="Board of Studies Meetings"
            icon={Calendar}
            api={bosMeetingsApi}
            columns={columns}
            formFields={formFields}
            searchField="venue"
        />
    );
};

export default BosMeetingsManager;
