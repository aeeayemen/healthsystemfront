// Check if already logged in
if (isAuthenticated()) {
    window.location.href = 'dashboard.html';
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');
    const errorAlert = document.getElementById('errorAlert');

    // Hide previous errors
    errorAlert.classList.add('d-none');

    // Disable button and show loading
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin ms-2"></i> جاري تسجيل الدخول...';

    try {
        const response = await api.post('/login', {
            email: email,
            password: password
        });

        // Store token and user data
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to dashboard
        window.location.href = 'dashboard.html';

    } catch (error) {
        // Show error
        errorAlert.textContent = error.response?.data?.message || 'فشل تسجيل الدخول. تحقق من البيانات.';
        errorAlert.classList.remove('d-none');

        // Re-enable button
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt ms-2"></i> تسجيل الدخول';
    }
});
