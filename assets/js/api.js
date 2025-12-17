const API_BASE_URL = 'https://health-system-backend-c9pb.onrender.com/api'; // Update this with your actual backend URL

const ApiService = {
    // Helper for making requests
    async request(endpoint, method = 'GET', body = null) {
        const token = localStorage.getItem('auth_token');
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            method,
            headers
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

            // Handle 401 Unauthorized (Token expired/invalid)
            if (response.status === 401) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('hnd_user');
                window.location.href = 'index.html';
                return;
            }

            const text = await response.text();
            let data;
            try {
                data = text ? JSON.parse(text) : {};
            } catch (e) {
                console.warn('Response was not JSON:', text);
                data = {}; // Fallback to empty object if parsing fails but response was ok
            }

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    },

    // Helper for uploading files with FormData
    async uploadFormData(endpoint, method = 'POST', formData) {
        const token = localStorage.getItem('auth_token');
        const headers = {
            'Accept': 'application/json'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            method,
            headers,
            body: formData
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

            if (response.status === 401) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('hnd_user');
                window.location.href = 'index.html';
                return;
            }

            const text = await response.text();
            let data;
            try {
                data = text ? JSON.parse(text) : {};
            } catch (e) {
                console.warn('Response was not JSON:', text);
                data = {};
            }

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('API Upload Failed:', error);
            throw error;
        }
    },

    // Auth
    auth: {
        login: (email, password) => ApiService.request('/login', 'POST', { email, password }),
        register: (data) => ApiService.request('/register', 'POST', data),
        logout: () => ApiService.request('/logout', 'POST'),
        me: () => ApiService.request('/me'),
        forgotPassword: (email) => ApiService.request('/forgot-password', 'POST', { email }),
        resetPassword: (data) => ApiService.request('/reset-password', 'POST', data)
    },

    // Dashboard
    dashboard: {
        stats: (period = 'all') => ApiService.request(`/dashboard/stats?period=${period}`),
        recentActivity: () => ApiService.request('/dashboard/recent-activity')
    },

    // Reports
    reports: {
        usage: (params) => ApiService.request(`/reports/usage?${new URLSearchParams(params)}`),
        ratings: (params) => ApiService.request(`/rates?${new URLSearchParams(params)}`),
        diets: (year) => ApiService.request(`/reports/diets?year=${year}`),
        measurements: (period) => ApiService.request(`/reports/measurements?period=${period}`)
    },

    // Users
    users: {
        getAll: (params) => ApiService.request(`/users?${new URLSearchParams(params)}`),
        getNormal: () => ApiService.request('/users/normal'),
        getPayed: () => ApiService.request('/users/payed'),
        get: (id) => ApiService.request(`/users/${id}`),
        create: (data) => ApiService.request('/users', 'POST', data),
        update: (id, data) => ApiService.request(`/users/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/users/${id}`, 'DELETE'),
        toggleBan: (id) => ApiService.request(`/users/${id}/toggle-ban`, 'POST')
    },

    // Doctors
    doctors: {
        getAll: (params) => ApiService.request(`/doctors?${new URLSearchParams(params)}`),
        getPending: () => ApiService.request('/doctors/pending'),
        get: (id) => ApiService.request(`/doctors/${id}`),
        create: (data) => ApiService.request('/doctors', 'POST', data),
        update: (id, data) => ApiService.request(`/doctors/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/doctors/${id}`, 'DELETE'),
        approve: (id) => ApiService.request(`/doctors/${id}/approve`, 'POST'),
        reject: (id, reason) => ApiService.request(`/doctors/${id}/reject`, 'POST', { reason }),
        updateStatus: (id, status) => ApiService.request(`/doctors/${id}/status`, 'POST', { status })
    },

    // Patients (Assuming similar structure to users or specific endpoint)
    patients: {
        getAll: (params) => ApiService.request(`/users-subscribed?${new URLSearchParams(params)}`), // Assuming /patients endpoint exists or filtered users
        get: (id) => ApiService.request(`/users-subscribed/${id}`),
        create: (data) => ApiService.request('/users-subscribed', 'POST', data),
        update: (id, data) => ApiService.request(`/users-subscribed/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/users-subscribed/${id}`, 'DELETE')
    },

    // Diet Plans
    dietPlans: {
        getAll: (params) => ApiService.request(`/diet-plans?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/diet-plans/${id}`),
        create: (data) => ApiService.request('/diet-plans', 'POST', data),
        update: (id, data) => ApiService.request(`/diet-plans/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/diet-plans/${id}`, 'DELETE')
    },

    // Measurements
    measurements: {
        getAll: (params) => ApiService.request(`/measurements?${new URLSearchParams(params)}`),
        // Add other CRUD if needed
    },

    // Consultations
    consultations: {
        getAll: (params) => ApiService.request(`/consultations?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/consultations/${id}`),
        create: (data) => ApiService.request('/consultations', 'POST', data),
        update: (id, data) => ApiService.request(`/consultations/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/consultations/${id}`, 'DELETE'),
        updateStatus: (id, status) => ApiService.request(`/consultations/${id}/status`, 'PUT', { status })
    },

    // Subscriptions
    subscriptions: {
        getAll: (params) => ApiService.request(`/subscriptions?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/subscriptions/${id}`),
        create: (data) => ApiService.request('/subscriptions', 'POST', data),
        update: (id, data) => ApiService.request(`/subscriptions/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/subscriptions/${id}`, 'DELETE')
    },

    // Invoices
    invoices: {
        getAll: (params) => ApiService.request(`/invoices?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/invoices/${id}`),
        create: (data) => ApiService.request('/invoices', 'POST', data),
        update: (id, data) => ApiService.request(`/invoices/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/invoices/${id}`, 'DELETE')
    },

    // Tips
    tips: {
        getAll: (params) => ApiService.request(`/tips?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/tips/${id}`),
        create: (data) => ApiService.request('/tips', 'POST', data),
        update: (id, data) => ApiService.request(`/tips/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/tips/${id}`, 'DELETE')
    },

    // Meals
    meals: {
        getAll: (params) => ApiService.request(`/meals?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/meals/${id}`),
        create: (data) => ApiService.request('/meals', 'POST', data),
        update: (id, data) => ApiService.request(`/meals/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/meals/${id}`, 'DELETE')
    },

    // Advertisements
    advertisements: {
        getAll: (params) => ApiService.request(`/advertisements?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/advertisements/${id}`),
        create: (data) => ApiService.request('/advertisements', 'POST', data),
        update: (id, data) => ApiService.request(`/advertisements/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/advertisements/${id}`, 'DELETE')
    },

    // Forums
    forums: {
        getAll: (params) => ApiService.request(`/forums?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/forums/${id}`),
        create: (data) => ApiService.request('/forums', 'POST', data),
        update: (id, data) => ApiService.request(`/forums/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/forums/${id}`, 'DELETE'),
        getMembers: (forumId) => ApiService.request(`/forums/${forumId}/members`),
        addUser: (forumId, userId) => ApiService.request(`/forums/${forumId}/users`, 'POST', { user_id: userId }),
        removeUser: (forumId, userId) => ApiService.request(`/forums/${forumId}/users/${userId}`, 'DELETE')
    },

    // Chat
    chat: {
        getConversations: () => ApiService.request('/chat/conversations'),
        getMessages: (id) => ApiService.request(`/chat/conversations/${id}/messages`),
        sendMessage: (data) => ApiService.request('/chat/messages', 'POST', data),
        adminChats: () => ApiService.request('/admin/chats'),
        deleteConversation: (id) => ApiService.request(`/admin/chats/${id}`, 'DELETE'),
        deleteMessage: (id) => ApiService.request(`/admin/messages/${id}`, 'DELETE')
    },

    // Settings
    settings: {
        get: () => ApiService.request('/settings'),
        update: (data) => ApiService.request('/settings', 'POST', data),
        backup: () => ApiService.request('/settings/backup'),
        restore: (data) => ApiService.request('/settings/restore', 'POST', data)
    },

    // Tips Categories
    tipsCategories: {
        getAll: () => ApiService.request('/tips-categories'),
        get: (id) => ApiService.request(`/tips-categories/${id}`),
        create: (data) => ApiService.request('/tips-categories', 'POST', data),
        update: (id, data) => ApiService.request(`/tips-categories/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/tips-categories/${id}`, 'DELETE')
    },

    // Meal Categories
    mealCategories: {
        getAll: () => ApiService.request('/meal-categories'),
        get: (id) => ApiService.request(`/meal-categories/${id}`),
        create: (data) => ApiService.request('/meal-categories', 'POST', data),
        update: (id, data) => ApiService.request(`/meal-categories/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/meal-categories/${id}`, 'DELETE')
    },

    // Subscribed Users (Patients with subscriptions)
    subscribedUsers: {
        getAll: (params) => ApiService.request(`/patients?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/patients/${id}`),
        create: (data) => ApiService.request('/patients', 'POST', data),
        update: (id, data) => ApiService.request(`/patients/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/patients/${id}`, 'DELETE')
    },

    // Notifications
    notifications: {
        getAll: () => ApiService.request('/notifications'),
        get: (id) => ApiService.request(`/notifications/${id}`),
        send: (data) => ApiService.request('/notifications/send', 'POST', data),
        delete: (id) => ApiService.request(`/notifications/${id}`, 'DELETE')
    },

    // Messages
    messages: {
        getAll: () => ApiService.request('/chat/conversations'),
        get: (id) => ApiService.request(`/chat/conversations/${id}/messages`),
        send: (data) => ApiService.request('/chat/messages', 'POST', data),
        delete: (id) => ApiService.request(`/admin/messages/${id}`, 'DELETE')
    },

    // Medical Tests
    medicalTests: {
        getAll: (params) => ApiService.request(`/medical-tests?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/medical-tests/${id}`),
        create: (data) => ApiService.request('/medical-tests', 'POST', data),
        update: (id, data) => ApiService.request(`/medical-tests/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/medical-tests/${id}`, 'DELETE'),
        updateStatus: (id, status) => ApiService.request(`/medical-tests/${id}/status`, 'PUT', { status })
    },

    // Weekly Calculations
    weeklyCalculations: {
        getAll: (params) => ApiService.request(`/weekly-calculations?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/weekly-calculations/${id}`),
        create: (data) => ApiService.request('/weekly-calculations', 'POST', data),
        update: (id, data) => ApiService.request(`/weekly-calculations/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/weekly-calculations/${id}`, 'DELETE')
    },

    // Main Calculations
    mainCalculations: {
        getAll: (params) => ApiService.request(`/main-calculations/`),
        get: (id) => ApiService.request(`/main-calculations/${id}`),
        create: (data) => ApiService.request('/main-calculations', 'POST', data),
        update: (id, data) => ApiService.request(`/main-calculations/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/main-calculations/${id}`, 'DELETE')
    },

    // Diet Components
    dietComponents: {
        getAll: (params) => ApiService.request(`/diet-components?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/diet-components/${id}`),
        create: (data) => ApiService.request('/diet-components', 'POST', data),
        update: (id, data) => ApiService.request(`/diet-components/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/diet-components/${id}`, 'DELETE')
    },

    // Rates (Doctor Ratings)
    rates: {
        getAll: (params) => ApiService.request(`/rates?${new URLSearchParams(params)}`),
        get: (id) => ApiService.request(`/rates/${id}`),
        create: (data) => ApiService.request('/rates', 'POST', data),
        update: (id, data) => ApiService.request(`/rates/${id}`, 'PUT', data),
        delete: (id) => ApiService.request(`/rates/${id}`, 'DELETE')
    },

    // Logs
    logs: {
        getAll: (params) => ApiService.request(`/logs?${new URLSearchParams(params)}`)
    },

    // Legacy/Grouped (kept for backward compatibility)
    content: {
        tipsCategories: {
            getAll: () => ApiService.request('/tips-categories'),
            create: (data) => ApiService.request('/tips-categories', 'POST', data)
        },
        mealCategories: {
            getAll: () => ApiService.request('/meal-categories'),
            create: (data) => ApiService.request('/meal-categories', 'POST', data)
        }
    },

    engagement: {
        medicalTests: {
            getAll: (params) => ApiService.request(`/medical-tests?${new URLSearchParams(params)}`),
            updateStatus: (id, status) => ApiService.request(`/medical-tests/${id}/status`, 'PUT', { status })
        }
    },

    system: {
        logs: (params) => ApiService.request(`/logs?${new URLSearchParams(params)}`),
        notifications: {
            getAll: () => ApiService.request('/notifications'),
            send: (data) => ApiService.request('/notifications/send', 'POST', data)
        }
    }
};

