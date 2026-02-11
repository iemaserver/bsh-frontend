import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://backend-node-roan.vercel.app/api';;

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API endpoints
export const departmentApi = {
    get: () => api.get('/department'),
};

export const facultyApi = {
    getAll: () => api.get('/faculty'),
    getById: (id) => api.get(`/faculty/${id}`),
};

export const eventsApi = {
    getAll: (params) => api.get('/events', { params }),
};

export const noticesApi = {
    getAll: (active = true) => api.get('/notices', { params: { active } }),
};

export const facilitiesApi = {
    getAll: () => api.get('/facilities'),
};

export const accreditationApi = {
    getAll: () => api.get('/accreditation'),
};

export const advisoryBoardApi = {
    getAll: () => api.get('/advisory-board'),
};

export const bosMeetingsApi = {
    getAll: () => api.get('/bos-meetings'),
};

export const syllabiApi = {
    getAll: (params) => api.get('/syllabi', { params }),
};

export const programOutcomesApi = {
    getAll: () => api.get('/program-outcomes'),
};

export const journalsApi = {
    getAll: () => api.get('/journals'),
};

export const conferencesApi = {
    getAll: () => api.get('/conferences'),
};

export const clubsApi = {
    getAll: () => api.get('/clubs'),
};

export const publicationsApi = {
    getAll: (params) => api.get('/publications', { params }),
};

export const fundedProjectsApi = {
    getAll: () => api.get('/funded-projects'),
};

export const patentsApi = {
    getAll: () => api.get('/patents'),
};

export const researchSupervisorsApi = {
    getAll: () => api.get('/research-supervisors'),
};

export const phdStudentsApi = {
    getAll: (params) => api.get('/phd-students', { params }),
};

export const mousApi = {
    getAll: () => api.get('/mous'),
};

export const consultanciesApi = {
    getAll: () => api.get('/consultancies'),
};

export const awardsApi = {
    getAll: (params) => api.get('/awards', { params }),
};

export const galleryApi = {
    getAll: (params) => api.get('/gallery', { params }),
};

export const contactApi = {
    get: () => api.get('/contact'),
};

export const authApi = {
    login: (credentials) => api.post('/auth/login', credentials),
};

// Admin API for authentication
export const adminApi = {
    login: (username, password) => api.post('/auth/login', { username, password }),
};

// Batch API - Single call for all data
export const batchApi = {
    getEssential: () => api.get('/batch/essential'),
    getOptional: () => api.get('/batch/optional'),
};

export default api;
