import React from 'react';
import { Users } from 'lucide-react';
import CrudManager from '@/components/admin/CrudManager';
import { facultyApi } from '@/lib/adminApi';

const facultyImages = [
    'puppeteer_assets/Abhijit.jpg',
    'puppeteer_assets/Animesh.jpg',
    'puppeteer_assets/Anjali.jpg',
    'puppeteer_assets/Anubhab.jpg',
    'puppeteer_assets/Arnab.jpg',
    'puppeteer_assets/Arun.jpg',
    'puppeteer_assets/Ayan.jpg',
    'puppeteer_assets/Biswadip.jpg',
    'puppeteer_assets/Bonani.jpg',
    'puppeteer_assets/Chandan.jpg',
    'puppeteer_assets/Debasmita.jpg',
    'puppeteer_assets/Deboleena.jpg',
    'puppeteer_assets/Dibakar.jpg',
    'puppeteer_assets/Emona.jpg',
    'puppeteer_assets/jeet.jpg',
    'puppeteer_assets/Kakoli.jpg',
    'puppeteer_assets/Kamakhya.jpg',
    'puppeteer_assets/Mrittika.jpg',
    'puppeteer_assets/Pratap.jpg',
    'puppeteer_assets/ranabir.jpg',
    'puppeteer_assets/Riya.jpg',
    'puppeteer_assets/Ruchira.jpg',
    'puppeteer_assets/samapika.jpg',
    'puppeteer_assets/Santanu.jpg',
    'puppeteer_assets/Saswati.jpg',
    'puppeteer_assets/Satavisha.jpg',
    'puppeteer_assets/Sharmistha.jpg',
    'puppeteer_assets/Soumyadipta.jpg',
    'puppeteer_assets/Subarna.jpg',
    'puppeteer_assets/Subhamoy.jpg',
    'puppeteer_assets/Susmita.jpg',
    'puppeteer_assets/swarup.jpg',
    'puppeteer_assets/tina.jpg',
    'puppeteer_assets/Saikat.jpg',
    'puppeteer_assets/message_hod.jpg'
];

// Helper to get display-ready image path
const getImagePath = (imageUrl) => {
    if (!imageUrl) return null;
    // Remove leading puppeteer_assets/ if present for the URL
    return `/${imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl}`;
};

const columns = [
    {
        key: 'name',
        label: 'Name',
        render: (value, item) => (
            <div className="flex items-center gap-3">
                {item.imageUrl ? (
                    <img src={getImagePath(item.imageUrl)} alt={value} className="w-10 h-10 rounded-full object-cover border-2 border-slate-600" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
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
    { key: 'email', label: 'Email' },
    {
        key: 'researchArea',
        label: 'Research Area',
        render: (value) => (
            <span className="text-sm text-slate-300 line-clamp-2">{value || '-'}</span>
        )
    },
    {
        key: 'isHod',
        label: 'HOD',
        render: (value) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${value ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-700 text-slate-400'
                }`}>
                {value ? 'Yes' : 'No'}
            </span>
        )
    },
];

const formFields = [
    { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Prof. Dr. John Doe' },
    { name: 'designation', label: 'Designation', type: 'text', required: true, placeholder: 'Associate Professor' },
    { name: 'qualification', label: 'Qualification', type: 'text', placeholder: 'Ph.D' },
    { name: 'experience', label: 'Experience', type: 'text', placeholder: '10 years' },
    { name: 'researchArea', label: 'Research Area', type: 'textarea', rows: 2, placeholder: 'Machine Learning, Data Science' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'john.doe@iem.edu.in' },
    { name: 'phone', label: 'Phone', type: 'text', placeholder: '+91 9876543210' },
    {
        name: 'imageUrl',
        label: 'Profile Image',
        type: 'image',
        placeholder: 'Upload profile image'
    },
    { name: 'orderIndex', label: 'Display Order', type: 'number', defaultValue: 0 },
    { name: 'isHod', label: 'Is Head of Department', type: 'checkbox', checkboxLabel: 'Mark as HOD' },
];

const FacultyManager = () => {
    return (
        <CrudManager
            title="Faculty Members"
            icon={Users}
            api={facultyApi}
            columns={columns}
            formFields={formFields}
            searchField="name"
        />
    );
};

export default FacultyManager;
