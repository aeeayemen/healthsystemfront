/* Common Sidebar Component */
function renderSidebar(userRole) {
    const menuItems = {
        admin: [
            { href: 'dashboard.html', icon: 'home', text: 'الرئيسية' },
            { href: 'doctors.html', icon: 'user-md', text: 'الأطباء' },
            { href: 'patients.html', icon: 'users', text: 'المرضى' },
            { href: 'diet-plans.html', icon: 'utensils', text: 'الخطط الغذائية' },
            { href: 'consultations.html', icon: 'calendar-check', text: 'الاستشارات' },
            { href: 'chat.html', icon: 'comments', text: 'المحادثات' }
        ],
        doctor: [
            { href: 'dashboard.html', icon: 'home', text: 'الرئيسية' },
            { href: 'patients.html', icon: 'users', text: 'مرضاي' },
            { href: 'diet-plans.html', icon: 'utensils', text: 'الخطط الغذائية' },
            { href: 'consultations.html', icon: 'calendar-check', text: 'الاستشارات' },
            { href: 'chat.html', icon: 'comments', text: 'المحادثات' }
        ],
        patient: [
            { href: 'dashboard.html', icon: 'home', text: 'الرئيسية' },
            { href: 'diet-plans.html', icon: 'utensils', text: 'خطتي الغذائية' },
            { href: 'consultations.html', icon: 'calendar-check', text: 'استشاراتي' },
            { href: 'chat.html', icon: 'comments', text: 'المحادثات' }
        ]
    };

    const currentPage = window.location.pathname.split('/').pop();
    const items = menuItems[userRole] || menuItems.patient;

    let html = '';
    items.forEach(item => {
        const isActive = currentPage === item.href ? 'active' : '';
        html += `
            <a href="${item.href}" class="nav-link ${isActive}">
                <i class="fas fa-${item.icon}"></i>
                <span>${item.text}</span>
            </a>
        `;
    });

    return html;
}

// Update sidebar based on user role
async function updateSidebarForRole() {
    try {
        const response = await api.get('/me');
        const user = response.data;
        const userRole = user.role || 'patient';

        // Update user info
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userRole').textContent = getRoleText(userRole);

        // Update navigation
        const navContainer = document.querySelector('.sidebar-nav');
        if (navContainer) {
            const logoutLink = navContainer.querySelector('a[onclick="logout()"]');
            const hr = navContainer.querySelector('hr');

            navContainer.innerHTML = renderSidebar(userRole);

            // Re-add logout
            if (hr && logoutLink) {
                navContainer.appendChild(hr);
                navContainer.appendChild(logoutLink);
            }
        }

        return user;
    } catch (error) {
        console.error('Error updating sidebar:', error);
        return null;
    }
}

function getRoleText(role) {
    const roleTexts = {
        'admin': 'مدير النظام',
        'doctor': 'طبيب',
        'patient': 'مريض'
    };
    return roleTexts[role] || 'مستخدم';
}

// Check if user has permission to access page
// function checkPagePermission(requiredRoles) {
//     const user = getCurrentUser();
//     if (!user || !user.role) {
//         window.location.href = 'dashboard.html';
//         return false;
//     }

//     if (!requiredRoles.includes(user.role)) {
//         alert('ليس لديك صلاحية للوصول إلى هذه الصفحة');
//         window.location.href = 'dashboard.html';
//         return false;
//     }

//     return true;
// }
