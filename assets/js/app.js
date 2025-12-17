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

// Sidebar & Header Injection
function initLayout() {
    const user = checkAuth();
    if (!user) return;

    const sidebar = `
        <div class="sidebar-header">
            <h3><i class="fas fa-heartbeat me-2"></i>Nutrguide</h3>
        </div>
        <ul class="list-unstyled components">
            <li><a href="dashboard.html" class="${isActive('dashboard.html')}"><i class="fas fa-home"></i> الرئيسية</a></li>
            <li><a href="users.html" class="${isActive('users.html')}"><i class="fas fa-users-cog"></i> إدارة المستخدمين</a></li>
            <li><a href="doctors.html" class="${isActive('doctors.html')}"><i class="fas fa-user-md"></i> إدارة الأطباء</a></li>
            <li><a href="patients.html" class="${isActive('patients.html')}"><i class="fas fa-users"></i> إدارة المرضى</a></li>
            <li><a href="diet-plans.html" class="${isActive('diet-plans.html')}"><i class="fas fa-utensils"></i> خطط التغذية</a></li>
            <li><a href="measurements.html" class="${isActive('measurements.html')}"><i class="fas fa-weight"></i> القياسات</a></li>
            <li><a href="consultations.html" class="${isActive('consultations.html')}"><i class="fas fa-comments"></i> الاستشارات</a></li>
            <li><a href="subscriptions.html" class="${isActive('subscriptions.html')}"><i class="fas fa-credit-card"></i> الاشتراكات</a></li>
            <li><a href="invoices.html" class="${isActive('invoices.html')}"><i class="fas fa-file-invoice-dollar"></i> الفواتير</a></li>
            <li><a href="chat.html" class="${isActive('chat.html')}"><i class="fas fa-comment-dots"></i> المحادثات</a></li>
            <li><a href="settings.html" class="${isActive('settings.html')}"><i class="fas fa-cog"></i> الإعدادات</a></li>
        </ul>
    `;

    const navbar = `
        <div class="container-fluid">
            <button type="button" id="sidebarCollapse" class="btn btn-light navbar-btn">
                <i class="fas fa-bars"></i>
            </button>
            <div class="d-flex align-items-center">
                <div class="dropdown">
                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user-circle me-2"></i> ${user.name}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" onclick="logout()">تسجيل الخروج</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    document.getElementById('sidebar').innerHTML = sidebar;
    document.getElementById('navbar').innerHTML = navbar;

    // Sidebar Toggle
    document.getElementById('sidebarCollapse').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('active');
    });
}

function isActive(page) {
    return window.location.pathname.includes(page) ? 'active' : '';
}

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
document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.pathname.includes('dashboard.html')) {
        initLayout();
    }
});
