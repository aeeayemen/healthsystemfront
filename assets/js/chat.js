if (!isAuthenticated()) window.location.href = 'index.html';

let currentUserData = null;

async function loadUserInfo() {
    currentUserData = await updateSidebarForRole();
}

async function loadUsers() {
    try {
        // Load doctors and patients based on role
        let doctors = [];
        let patients = [];

        if (currentUserData && currentUserData.role === 'admin') {
            // Admin sees all
            const [doctorsRes, patientsRes] = await Promise.all([
                api.get('/doctors'),
                api.get('/patients')
            ]);
            doctors = doctorsRes.data || [];
            patients = patientsRes.data || [];
        } else if (currentUserData && currentUserData.role === 'doctor') {
            // Doctor sees only their patients
            const patientsRes = await api.get('/patients');
            const allPatients = patientsRes.data || [];
            const doctorsRes = await api.get('/doctors');
            const allDoctors = doctorsRes.data || [];
            const currentDoctor = allDoctors.find(d => d.user_id === currentUserData.id);

            if (currentDoctor) {
                patients = allPatients.filter(p => p.current_doctor_id === currentDoctor.id);
            }
        } else if (currentUserData && currentUserData.role === 'patient') {
            // Patient sees only their doctor
            const patientsRes = await api.get('/patients');
            const allPatients = patientsRes.data || [];
            const currentPatient = allPatients.find(p => p.user_id === currentUserData.id);

            if (currentPatient && currentPatient.current_doctor) {
                doctors = [currentPatient.current_doctor];
            }
        }

        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';

        // Add doctors
        doctors.forEach(doctor => {
            if (doctor.user && doctor.user.id !== currentUserData.id) {
                usersList.innerHTML += createUserItem(doctor.user.id, doctor.user.name, 'طبيب');
            }
        });

        // Add patients
        patients.forEach(patient => {
            if (patient.user && patient.user.id !== currentUserData.id) {
                usersList.innerHTML += createUserItem(patient.user.id, patient.user.name, 'مريض');
            }
        });

        if (usersList.innerHTML === '') {
            usersList.innerHTML = '<div class="text-center p-4 text-muted">لا يوجد مستخدمين</div>';
        }
    } catch (error) {
        console.error('Error loading users:', error);
        document.getElementById('usersList').innerHTML = '<div class="text-center p-4 text-danger">حدث خطأ</div>';
    }
}

function createUserItem(userId, userName, userType) {
    return `
        <div class="user-item" onclick="selectUser(${userId}, '${userName}')">
            <div class="d-flex align-items-center">
                <i class="fas fa-user-circle fa-2x text-primary ms-2"></i>
                <div>
                    <strong>${userName}</strong><br>
                    <small class="text-muted">${userType}</small>
                </div>
            </div>
        </div>
    `;
}

let selectedUserId = null;
let messagesInterval = null;

async function selectUser(userId, userName) {
    selectedUserId = userId;

    // Update active state
    document.querySelectorAll('.user-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Update header
    document.getElementById('chatHeader').innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-user-circle fa-2x text-primary ms-2"></i>
            <h6 class="mb-0">${userName}</h6>
        </div>
    `;

    // Show message input
    document.getElementById('messageInput').style.display = 'block';

    // Load messages
    await loadMessages();

    // Start auto-refresh
    if (messagesInterval) clearInterval(messagesInterval);
    messagesInterval = setInterval(loadMessages, 3000);
}

async function loadMessages() {
    if (!selectedUserId) return;

    try {
        const response = await api.get(`/chat/messages/${selectedUserId}`);
        const messages = response.data || [];

        const container = document.getElementById('messagesContainer');
        container.innerHTML = '';

        if (messages.length === 0) {
            container.innerHTML = '<div class="text-center text-muted"><p>لا توجد رسائل بعد</p></div>';
            return;
        }

        messages.forEach(message => {
            const isSent = message.sender_id === currentUserData.id;
            container.innerHTML += `
                <div class="message ${isSent ? 'sent' : 'received'}">
                    <div class="message-bubble">
                        <p class="mb-1">${message.message}</p>
                        <small class="text-muted" style="font-size: 0.75rem;">
                            ${new Date(message.created_at).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                        </small>
                    </div>
                </div>
            `;
        });

        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

document.getElementById('sendMessageForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!selectedUserId) return;

    const messageText = document.getElementById('messageText').value.trim();
    if (!messageText) return;

    try {
        await api.post('/chat/send', {
            receiver_id: selectedUserId,
            message: messageText
        });

        document.getElementById('messageText').value = '';
        await loadMessages();
    } catch (error) {
        console.error('Error sending message:', error);
        alert('فشل إرسال الرسالة');
    }
});

document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
});

window.addEventListener('beforeunload', () => {
    if (messagesInterval) clearInterval(messagesInterval);
});

document.addEventListener('DOMContentLoaded', async () => {
    await loadUserInfo();
    await loadUsers();
});
