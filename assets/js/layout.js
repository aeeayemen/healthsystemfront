const Layout = {
    renderSidebar: (activePage) => {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const menuStructure = [
            {
                type: 'dropdown',
                name: 'المستخدمين',
                icon: 'fas fa-users',
                id: 'users-menu',
                items: [
                    { name: 'المستخدمين العاديين', link: 'users-normal.html', id: 'users-normal' },
                    { name: 'المستخدمين الدافعين', link: 'users-paying.html', id: 'users-paying' },
                    { name: 'المستخدمين المشتركين', link: 'users-subscribed.html', id: 'users-subscribed' },
                    { name: 'الفحص الطبي', link: 'medical-tests.html', id: 'medical-tests' },
                    { name: 'الحساب الأساسي', link: 'main-calculation.html', id: 'main-calculation' },
                    { name: 'الحساب الأسبوعي', link: 'weekly-calculations.html', id: 'weekly-calculations' }
                ]
            },
            {
                type: 'dropdown',
                name: 'الدكاترة',
                icon: 'fas fa-user-md',
                id: 'doctors-menu',
                items: [
                    { name: 'المنتظرين', link: 'doctors-pending.html', id: 'doctors-pending' },
                    { name: 'المقبولين', link: 'doctors-approved.html', id: 'doctors-approved' },
                    { name: 'التقييم', link: 'doctor-ratings.html', id: 'doctor-ratings' },
                    { name: 'الرسائل', link: 'messages.html', id: 'messages' },
                    { name: 'مكونات خطة التغذية', link: 'diet-components.html', id: 'diet-components' }
                ]
            },
            {
                type: 'dropdown',
                name: 'النصائح',
                icon: 'fas fa-lightbulb',
                id: 'tips-menu',
                items: [
                    { name: 'النصائح', link: 'tips.html', id: 'tips' },
                    { name: 'فئات النصائح', link: 'tips-categories.html', id: 'tips-categories' },
                    { name: 'المنتدى', link: 'forum.html', id: 'forum' },
                    { name: 'الإعلانات', link: 'advertisements.html', id: 'advertisements' }
                ]
            },
            {
                type: 'dropdown',
                name: 'الوجبات',
                icon: 'fas fa-utensils',
                id: 'meals-menu',
                items: [
                    { name: 'الوجبات', link: 'meals.html', id: 'meals' },
                    { name: 'فئات الوجبات', link: 'meal-categories.html', id: 'meal-categories' }
                ]
            }
        ];

        let html = `
            <div class="sidebar-header">
                <h3><i class="fas fa-heartbeat me-2"></i> Nutrguide </h3>
            </div>
            <ul class="list-unstyled components">
                <li>
                    <a href="dashboard.html" class="${activePage === 'dashboard' ? 'active' : ''}">
                        <i class="fas fa-home"></i> الرئيسية
                    </a>
                </li>
        `;

        menuStructure.forEach(menu => {
            if (menu.type === 'dropdown') {
                const isOpen = menu.items.some(item => item.id === activePage);
                const hasActiveItem = menu.items.some(item => item.id === activePage);

                html += `
                <li class="sidebar-dropdown ${isOpen ? 'open' : ''}">
                    <a href="#${menu.id}" class="dropdown-toggle ${hasActiveItem ? 'active-parent' : ''}" data-bs-toggle="collapse" aria-expanded="${isOpen}">
                        <i class="${menu.icon}"></i> ${menu.name}
                        <i class="fas fa-chevron-down dropdown-arrow"></i>
                    </a>
                    <ul class="collapse list-unstyled submenu ${isOpen ? 'show' : ''}" id="${menu.id}">
                `;

                menu.items.forEach(item => {
                    const activeClass = activePage === item.id ? 'active' : '';
                    html += `
                        <li>
                            <a href="${item.link}" class="${activeClass}">
                                <i class="fas fa-circle-dot"></i> ${item.name}
                            </a>
                        </li>
                    `;
                });

                html += `
                    </ul>
                </li>
                `;
            }
        });

        html += `
            </ul>
            <div class="p-3">
                <button onclick="ApiService.auth.logout()" class="btn btn-danger w-100 btn-sm">
                    <i class="fas fa-sign-out-alt me-2"></i> تسجيل الخروج
                </button>
            </div>
        `;

        sidebar.innerHTML = html;

        // Initialize dropdown toggles
        document.querySelectorAll('.sidebar-dropdown .dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                const parent = this.parentElement;
                const submenu = parent.querySelector('.submenu');

                // Toggle current
                parent.classList.toggle('open');
                if (submenu.classList.contains('show')) {
                    submenu.classList.remove('show');
                } else {
                    submenu.classList.add('show');
                }
            });
        });
    },

    renderNavbar: () => {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        const userStr = localStorage.getItem('hnd_user') || localStorage.getItem('currentUser');
        const user = userStr ? JSON.parse(userStr) : null;
        const userName = user ? user.name : 'مدير النظام';
        const userRole = 'مدير';

        navbar.innerHTML = `
            <div class="container-fluid">
                <button type="button" id="sidebarCollapse" class="btn btn-light navbar-btn">
                    <i class="fas fa-bars text-primary"></i>
                </button>
                
                <div class="d-flex align-items-center">
                    <div class="dropdown">
                        <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle text-dark" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="${user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userName)}" alt="" width="32" height="32" class="rounded-circle me-2">
                            <div class="me-2 d-none d-sm-block">
                                <strong>${userName}</strong>
                                <div class="small text-muted">${userRole}</div>
                            </div>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end text-end shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="settings.html">الإعدادات</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="#" onclick="Layout.logout()">تسجيل الخروج</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Initialize sidebar toggle
        document.getElementById('sidebarCollapse')?.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('active');
        });
    },

    logout: () => {
        localStorage.removeItem('hnd_user');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    },

    init: (activePage) => {
        Layout.renderSidebar(activePage);
        Layout.renderNavbar();
    }
};

// Global Toast Notification
window.showToast = function (message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '1100';
        document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const bgColor = type === 'success' ? 'bg-success' : 'bg-danger';
    const html = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgColor} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const toastElement = tempDiv.firstElementChild;
    toastContainer.appendChild(toastElement);

    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();

    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
};
