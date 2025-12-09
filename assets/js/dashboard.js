// Check authentication
// if (!isAuthenticated()) {
//     window.location.href = 'dashboard.html';
// }

let currentUserData = null;

// Load user info
async function loadUserInfo() {
    currentUserData = await updateSidebarForRole();
}

// Load dashboard statistics
async function loadStatistics() {
    try {
        // Load doctors count
        const doctorsResponse = await api.get('/doctors');
        document.getElementById('totalDoctors').textContent = doctorsResponse.data.length || 0;

        // Load patients count
        const patientsResponse = await api.get('/patients');
        document.getElementById('totalPatients').textContent = patientsResponse.data.length || 0;

        // Load diet plans count
        const dietPlansResponse = await api.get('/diet-plans');
        document.getElementById('totalDietPlans').textContent = dietPlansResponse.data.data?.length || 0;

        // For consultations, we'll set a placeholder for now
        document.getElementById('totalConsultations').textContent = '0';

    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// Initialize charts
function initializeCharts() {
    // Monthly Chart
    const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
    new Chart(monthlyCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: 'المرضى الجدد',
                data: [12, 19, 15, 25, 22, 30],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Patients Distribution Chart
    const patientsCtx = document.getElementById('patientsChart').getContext('2d');
    new Chart(patientsCtx, {
        type: 'doughnut',
        data: {
            labels: ['نشط', 'غير نشط', 'منتهي'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: [
                    '#10b981',
                    '#f59e0b',
                    '#ef4444'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Sidebar toggle for mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('active');
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    loadUserInfo();
    loadStatistics();
    initializeCharts();
});
