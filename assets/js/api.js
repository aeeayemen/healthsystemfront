// // Static API Service using Mock DB
// const ApiService = {
//     // Auth
//     auth: {
//         login: async (email, password) => {
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     const user = db.login(email, password);
//                     if (user) {
//                         const token = 'mock-jwt-token-' + Date.now();
//                         localStorage.setItem('hnd_token', token);
//                         localStorage.setItem('hnd_user', JSON.stringify(user));
//                         resolve({ user, token });
//                     } else {
//                         reject({ response: { data: { message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' } } });
//                     }
//                 }, 500); // Simulate network delay
//             });
//         },
//         logout: async () => {
//             db.logout();
//             localStorage.removeItem('hnd_token');
//             localStorage.removeItem('hnd_user');
//             window.location.href = 'index.html';
//         },
//         me: () => Promise.resolve({ data: db.getCurrentUser() }),
//         forgotPassword: (email) => Promise.resolve({ message: 'تم إرسال رابط إعادة تعيين كلمة المرور' }),
//         resetPassword: (data) => Promise.resolve({ message: 'تم تغيير كلمة المرور بنجاح' })
//     },

//     // Dashboard
//     dashboard: {
//         stats: () => Promise.resolve({
//             data: {
//                 users: db.get('users').length,
//                 doctors: db.get('doctors').length,
//                 patients: db.get('patients').length,
//                 dietPlans: db.get('dietPlans').length
//             }
//         })
//     },

//     // Users
//     users: {
//         getAll: () => Promise.resolve({ data: db.get('users') }),
//         create: (data) => Promise.resolve({ data: db.add('users', data) }),
//         update: (id, data) => Promise.resolve({ data: db.update('users', id, data) }),
//         delete: (id) => Promise.resolve({ data: db.delete('users', id) })
//     },

//     // Doctors
//     doctors: {
//         getAll: () => Promise.resolve({ data: db.get('doctors') }),
//         create: (data) => Promise.resolve({ data: db.add('doctors', data) }),
//         update: (id, data) => Promise.resolve({ data: db.update('doctors', id, data) }),
//         delete: (id) => Promise.resolve({ data: db.delete('doctors', id) })
//     },

//     // Patients
//     patients: {
//         getAll: () => Promise.resolve({ data: db.get('patients') }),
//         create: (data) => Promise.resolve({ data: db.add('patients', data) }),
//         update: (id, data) => Promise.resolve({ data: db.update('patients', id, data) }),
//         delete: (id) => Promise.resolve({ data: db.delete('patients', id) })
//     },

//     // Diet Plans
//     dietPlans: {
//         getAll: () => Promise.resolve({ data: db.get('dietPlans') }),
//         get: (id) => Promise.resolve({ data: db.getById('dietPlans', id) }),
//         create: (data) => Promise.resolve({ data: db.add('dietPlans', data) }),
//         update: (id, data) => Promise.resolve({ data: db.update('dietPlans', id, data) }),
//         delete: (id) => Promise.resolve({ data: db.delete('dietPlans', id) })
//     },

//     // Measurements
//     measurements: {
//         getAll: () => Promise.resolve({ data: db.get('measurements') }),
//         create: (data) => Promise.resolve({ data: db.add('measurements', data) }),
//         update: (id, data) => Promise.resolve({ data: db.update('measurements', id, data) }),
//         delete: (id) => Promise.resolve({ data: db.delete('measurements', id) })
//     },

//     // Consultations
//     consultations: {
//         getAll: () => Promise.resolve({ data: db.get('consultations') }),
//         get: (id) => Promise.resolve({ data: db.getById('consultations', id) }),
//         create: (data) => Promise.resolve({ data: db.add('consultations', data) }),
//         update: (id, data) => Promise.resolve({ data: db.update('consultations', id, data) }),
//         delete: (id) => Promise.resolve({ data: db.delete('consultations', id) })
//     },

//     // Subscriptions
//     subscriptions: {
//         getAll: () => Promise.resolve({ data: db.get('subscriptions') }),
//         create: (data) => Promise.resolve({ data: db.add('subscriptions', data) }),
//         update: (id, data) => Promise.resolve({ data: db.update('subscriptions', id, data) }),
//         delete: (id) => Promise.resolve({ data: db.delete('subscriptions', id) })
//     },

//     // Invoices
//     invoices: {
//         getAll: () => Promise.resolve({ data: db.get('invoices') }),
//         create: (data) => Promise.resolve({ data: db.add('invoices', data) }),
//         update: (id, data) => Promise.resolve({ data: db.update('invoices', id, data) }),
//         delete: (id) => Promise.resolve({ data: db.delete('invoices', id) })
//     },

//     // Chat
//     chat: {
//         adminChats: () => Promise.resolve({ data: db.get('chats') }),
//         deleteConversation: (id) => Promise.resolve({ data: db.delete('chats', id) }),
//         deleteMessage: (id) => Promise.resolve({ message: 'Message deleted' }) // Mock implementation
//     },

//     // Settings
//     settings: {
//         get: () => Promise.resolve({ data: db.get('settings') }),
//         update: (data) => Promise.resolve({ data: db.save('settings', data) })
//     },

//     content: {
//         getAll: () => Promise.resolve({ data: db.get('content') }),
//         getById: (id) => Promise.resolve({ data: db.getById('content', id) }),
//         create: (data) => Promise.resolve({ data: db.add('content', data) }),
//         update: (id, data) => Promise.resolve({ data: db.update('content', id, data) }),
//         delete: (id) => Promise.resolve({ data: db.delete('content', id) })
//     },

//     forum: {
//         getPosts: () => Promise.resolve({ data: db.get('forum_posts') }),
//         getPost: (id) => Promise.resolve({ data: db.getById('forum_posts', id) }),
//         deletePost: (id) => Promise.resolve({ data: db.delete('forum_posts', id) }),
//         getComments: (postId) => Promise.resolve({ data: [] }), // Mock
//         deleteComment: (id) => Promise.resolve({ message: 'Comment deleted' })
//     },

//     notifications: {
//         getAll: () => Promise.resolve({ data: db.get('notifications') }),
//         send: (data) => Promise.resolve({ data: db.add('notifications', data) }),
//         delete: (id) => Promise.resolve({ data: db.delete('notifications', id) })
//     },

//     logs: {
//         getAll: (params) => Promise.resolve({ data: db.get('logs') }),
//         getByUser: (userId) => Promise.resolve({ data: [] }) // Mock
//     }
// };
