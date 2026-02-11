import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backend-node-roan.vercel.app/api';;

// Create axios instance with auth interceptor
const adminAxios = axios.create({
    baseURL: API_BASE_URL,
});

// Add token to all requests
adminAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401/403 responses
adminAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

// Generic CRUD operations factory
const createCrudApi = (endpoint) => ({
    getAll: (params) => adminAxios.get(`/${endpoint}`, { params }),
    getById: (id) => adminAxios.get(`/${endpoint}/${id}`),
    create: (data) => adminAxios.post(`/admin/${endpoint}`, data),
    update: (id, data) => adminAxios.put(`/admin/${endpoint}/${id}`, data),
    delete: (id) => adminAxios.delete(`/admin/${endpoint}/${id}`),
});

// Auth API
export const authApi = {
    login: (username, password) => adminAxios.post('/auth/login', { username, password }),
    verifyToken: () => adminAxios.get('/auth/verify'),
};

// Entity APIs
export const facultyApi = createCrudApi('faculty');
export const noticesApi = createCrudApi('notices');
export const eventsApi = createCrudApi('events');
export const awardsApi = createCrudApi('awards');
export const galleryApi = createCrudApi('gallery');
export const clubsApi = createCrudApi('clubs');
export const journalsApi = createCrudApi('journals');
export const conferencesApi = createCrudApi('conferences');
export const publicationsApi = createCrudApi('publications');
export const mousApi = createCrudApi('mous');
export const consultanciesApi = createCrudApi('consultancies');
export const facilitiesApi = createCrudApi('facilities');
export const syllabiApi = createCrudApi('syllabi');
export const programOutcomesApi = createCrudApi('program-outcomes');
export const advisoryBoardApi = createCrudApi('advisory-board');
export const accreditationApi = createCrudApi('accreditation');
export const fundedProjectsApi = createCrudApi('funded-projects');
export const patentsApi = createCrudApi('patents');
export const researchSupervisorsApi = createCrudApi('research-supervisors');
export const phdStudentsApi = createCrudApi('phd-students');
export const bosMeetingsApi = createCrudApi('bos-meetings');
export const departmentApi = {
    get: () => adminAxios.get('/department'),
    update: (id, data) => adminAxios.put(`/admin/department/${id}`, data),
};
export const contactApi = {
    get: () => adminAxios.get('/contact'),
    update: (id, data) => adminAxios.put(`/admin/contact/${id}`, data),
};

// Popup API
export const popupApi = {
    getActive: () => adminAxios.get('/popup/active'),
    getAll: () => adminAxios.get('/admin/popups'),
    create: (data) => adminAxios.post('/admin/popups', data),
    update: (id, data) => adminAxios.put(`/admin/popups/${id}`, data),
    delete: (id) => adminAxios.delete(`/admin/popups/${id}`),
    activate: (id) => adminAxios.post(`/admin/popups/${id}/activate`),
    deactivate: (id) => adminAxios.post(`/admin/popups/${id}/deactivate`),
};

// Dashboard Stats
export const dashboardApi = {
    getStats: () => adminAxios.get('/admin/dashboard/stats'),
};

export const uploadApi = {
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return adminAxios.post('/admin/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};

export default adminAxios;
