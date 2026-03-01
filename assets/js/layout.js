const Layout = {
    renderSidebar: (activePage) => {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        // const menuItems = [
        //     { name: 'لوحة التحكم', icon: 'fas fa-home', link: 'dashboard.html', id: 'dashboard' },
        //     { name: 'المستخدمين', icon: 'fas fa-users', link: 'users.html', id: 'users' },
        //     { name: 'الأطباء', icon: 'fas fa-user-md', link: 'doctors.html', id: 'doctors' },
        //     { name: 'الفحوصات الطبية', icon: 'fas fa-flask', link: 'medical-tests.html', id: 'medical-tests' },
        //     { name: 'خطط التغذية', icon: 'fas fa-utensils', link: 'diet-plans.html', id: 'diet-plans' },
        //     { name: 'التقارير', icon: 'fas fa-chart-bar', link: 'reports.html', id: 'reports' },
        //     { name: 'المحتوى', icon: 'fas fa-newspaper', link: 'content.html', id: 'content' },
        //     { name: 'المنتدى', icon: 'fas fa-comments', link: 'forum.html', id: 'forum' },
        //     { name: 'الإعدادات', icon: 'fas fa-cog', link: 'settings.html', id: 'settings' }
        // ];

        const menuItems = [
            { name: 'الرئيسية', icon: 'fas fa-home', link: 'dashboard.html', id: 'dashboard' },
            { name: 'إدارة المستخدمين', icon: 'fas fa-users-cog', link: 'users.html', id: 'users' },
            { name: 'إدارة الأطباء', icon: 'fas fa-user-md', link: 'doctors.html', id: 'doctors' },
            { name: 'إدارة المرضى', icon: 'fas fa-users', link: 'patients.html', id: 'patients' },
            { name: 'خطط التغذية', icon: 'fas fa-utensils', link: 'diet-plans.html', id: 'diet-plans' },
            { name: 'القياسات', icon: 'fas fa-weight', link: 'measurements.html', id: 'measurements' },
            { name: 'الاستشارات', icon: 'fas fa-comments', link: 'consultations.html', id: 'consultations' },
            { name: 'الاشتراكات', icon: 'fas fa-credit-card', link: 'subscriptions.html', id: 'subscriptions' },
            { name: 'الفواتير', icon: 'fas fa-file-invoice-dollar', link: 'invoices.html', id: 'invoices' },
            { name: 'المحادثات', icon: 'fas fa-comment-dots', link: 'chat.html', id: 'chat' },
            { name: 'إدارة الأذكار', icon: 'fas fa-book-open', link: 'athkar.html', id: 'athkar' },
            { name: 'الإعدادات', icon: 'fas fa-cog', link: 'settings.html', id: 'settings' }
        ];


        let html = `
            <div class="sidebar-header">
                <h3><i class="fas fa-heartbeat me-2"></i> Nutrguide </h3>
            </div>
            <ul class="list-unstyled components">
        `;

        menuItems.forEach(item => {
            const activeClass = activePage === item.id ? 'active' : '';
            html += `
                <li>
                    <a href="${item.link}" class="${activeClass}">
                        <i class="${item.icon}"></i> ${item.name}
                    </a>
                </li>
            `;
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
    },

    renderNavbar: () => {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        const userStr = localStorage.getItem('hnd_user');
        const user = userStr ? JSON.parse(userStr) : null;
        const userName = user ? user.name : 'زائر';
        const userRole = user ? (user.role === 'admin' ? 'مدير' : user.role === 'doctor' ? 'طبيب' : 'مريض') : '';

        navbar.innerHTML = `
            <div class="container-fluid">
                <button type="button" id="sidebarCollapse" class="btn btn-light navbar-btn">
                    <i class="fas fa-bars text-primary"></i>
                </button>
                
                <div class="d-flex align-items-center">
                    <div class="dropdown">
                        <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle text-dark" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="${user?.avatar || 'https://ui-avatars.com/api/?name=' + userName}" alt="" width="32" height="32" class="rounded-circle me-2">
                            <div class="me-2 d-none d-sm-block">
                                <strong>${userName}</strong>
                                <div class="small text-muted">${userRole}</div>
                            </div>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end text-end shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="settings.html">الإعدادات</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="#" onclick="ApiService.auth.logout()">تسجيل الخروج</a></li>
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

    init: (activePage) => {
        // Check auth
        const token = localStorage.getItem('hnd_token');
        if (!token && !window.location.href.includes('index.html')) {
            window.location.href = 'index.html';
            return;
        }

        // Strict Admin Check
        const userStr = localStorage.getItem('hnd_user');
        const user = userStr ? JSON.parse(userStr) : null;

        if (user && user.role !== 'admin' && !window.location.href.includes('index.html')) {
            alert('عذراً، هذا النظام مخصص للمسؤولين فقط');
            ApiService.auth.logout();
            return;
        }

        Layout.renderSidebar(activePage);
        Layout.renderNavbar();
    }
};
