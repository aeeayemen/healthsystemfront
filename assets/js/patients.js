if (!isAuthenticated()) window.location.href = 'index.html';

let currentUserData = null;

async function loadUserInfo() {
    currentUserData = await updateSidebarForRole();
}

async function loadPatients() {
    try {
        const response = await api.get('/patients');
        let patients = response.data;
        const tableBody = document.getElementById('patientsTable');
        tableBody.innerHTML = '';

        // Filter patients based on role
        if (currentUserData && currentUserData.role === 'doctor') {
            // Get doctor's ID
            const doctorResponse = await api.get('/doctors');
            const doctors = doctorResponse.data || [];
            const currentDoctor = doctors.find(d => d.user_id === currentUserData.id);

            if (currentDoctor) {
                // Filter only patients assigned to this doctor
                patients = patients.filter(p => p.current_doctor_id === currentDoctor.id);
            } else {
                patients = [];
            }
        } else if (currentUserData && currentUserData.role === 'patient') {
            // Patients can only see themselves
            patients = patients.filter(p => p.user_id === currentUserData.id);
        }

        if (patients.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="8" class="text-center text-muted"><i class="fas fa-inbox fa-3x mb-3"></i><p>لا توجد بيانات</p></td></tr>';
            return;
        }

        patients.forEach((patient, index) => {
            const statusBadge = patient.subscription_status === 'active' ?
                '<span class="badge bg-success">نشط</span>' :
                patient.subscription_status === 'expired' ?
                    '<span class="badge bg-danger">منتهي</span>' :
                    '<span class="badge bg-secondary">غير نشط</span>';

            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <i class="fas fa-user-circle fa-2x text-success ms-2"></i>
                            <div>
                                <strong>${patient.user?.name || 'غير محدد'}</strong><br>
                                <small class="text-muted">${patient.user?.email || ''}</small>
                            </div>
                        </div>
                    </td>
                    <td>${patient.current_weight || '-'} كجم</td>
                    <td>${patient.target_weight || '-'} كجم</td>
                    <td>${patient.height || '-'} سم</td>
                    <td>${patient.current_doctor?.user?.name || 'غير محدد'}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="viewPatient(${patient.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('patientsTable').innerHTML = '<tr><td colspan="8" class="text-center text-danger"><i class="fas fa-exclamation-circle fa-2x mb-2"></i><p>حدث خطأ في تحميل البيانات</p></td></tr>';
    }
}

async function viewPatient(patientId) {
    try {
        const response = await api.get(`/patients/${patientId}`);
        const patient = response.data;

        const detailsHtml = `
            <div class="row">
                <div class="col-md-6">
                    <h6>المعلومات الشخصية</h6>
                    <p><strong>الاسم:</strong> ${patient.user?.name || 'غير محدد'}</p>
                    <p><strong>البريد:</strong> ${patient.user?.email || 'غير محدد'}</p>
                    <p><strong>الهاتف:</strong> ${patient.user?.phone || 'غير محدد'}</p>
                    <p><strong>الجنس:</strong> ${patient.gender === 'male' ? 'ذكر' : 'أنثى'}</p>
                    <p><strong>تاريخ الميلاد:</strong> ${patient.date_of_birth || 'غير محدد'}</p>
                </div>
                <div class="col-md-6">
                    <h6>المعلومات الصحية</h6>
                    <p><strong>الوزن الحالي:</strong> ${patient.current_weight || '-'} كجم</p>
                    <p><strong>الوزن المستهدف:</strong> ${patient.target_weight || '-'} كجم</p>
                    <p><strong>الطول:</strong> ${patient.height || '-'} سم</p>
                    <p><strong>الطبيب المعالج:</strong> ${patient.current_doctor?.user?.name || 'غير محدد'}</p>
                </div>
            </div>
            <hr>
            <div>
                <h6>التاريخ المرضي</h6>
                <p>${patient.medical_history || 'لا يوجد'}</p>
            </div>
            <div>
                <h6>الحساسية</h6>
                <p>${patient.allergies || 'لا يوجد'}</p>
            </div>
            <div class="mt-3">
                <p><strong>حالة الاشتراك:</strong> ${patient.subscription_status || 'غير نشط'}</p>
                <p><strong>تاريخ انتهاء الاشتراك:</strong> ${patient.subscription_end_date || 'غير محدد'}</p>
            </div>
        `;

        document.getElementById('patientDetails').innerHTML = detailsHtml;
        new bootstrap.Modal(document.getElementById('patientModal')).show();
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ في تحميل التفاصيل');
    }
}

document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('#patientsTable tr').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
    });
});

document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    loadUserInfo();
    loadPatients();
});
