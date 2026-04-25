// API definition removed - using static ApiService in api.js

function isAuthenticated() {
    return !!localStorage.getItem('auth_token');
}

function getCurrentUser() {
    const userStr = localStorage.getItem('hnd_user');
    return userStr ? JSON.parse(userStr) : null;
}

// Check Auth
// function checkAuth() {
//     const user = getCurrentUser();
//     const isLoginPage = window.location.pathname.includes('dashboard.html');

//     if (!isAuthenticated() && !isLoginPage) {
//         window.location.href = 'dashboard.html';
//     } else if (isAuthenticated() && isLoginPage) {
//         window.location.href = 'dashboard.html';
//     }
//     return user;
// }

// Sidebar & Header Injection (Legacy - Replaced by Layout in layout.js)
// function initLayout() {
// ...
// }

// function isActive(page) {
//     return window.location.pathname.includes(page) ? 'active' : '';
// }

async function logout() {
    try {
        await ApiService.auth.logout();
    } catch (error) {
        console.error('Logout failed:', error);
    } finally {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('hnd_user');
        window.location.href = 'index.html';
    }
}

function showToast(message, type = 'success') {
    // Simple alert for now, can be upgraded to Bootstrap Toast
    alert(message);
}

// Initialize
// document.addEventListener('DOMContentLoaded', () => {
//     if (!window.location.pathname.includes('dashboard.html')) {
//         initLayout();
//     }
// });
