document.addEventListener('DOMContentLoaded', () => {
    Layout.init('doctors');
    // If we are on a page that uses this script, we might need to initialize things.
    // However, doctors.html currently uses inline script.
    // This script is refactored to be reusable or as a backup.
    if (document.getElementById('doctorsTableBody')) {
        renderDoctors();
    }
});

const doctorModalElement = document.getElementById('doctorModal');
let doctorModal;
if (doctorModalElement) {
    doctorModal = new bootstrap.Modal(doctorModalElement);
}

async function renderDoctors() {
    const tbody = document.getElementById('doctorsTableBody');
    if (!tbody) return;

    try {
        const response = await ApiService.doctors.getAll();
        const doctors = response.data || response || [];

        if (doctors.length === 0) {
            tbody.innerHTML = '<tr><td colspan="10" class="text-center">لا يوجد أطباء لعرضهم</td></tr>';
            return;
        }

        tbody.innerHTML = doctors.map(doctor => {
            // Determine status badge
            let statusBadge = '';
            if (doctor.status === 'pending') {
                statusBadge = '<span class="badge bg-warning text-dark p-2">بانتظار الموافقة</span>';
            } else if (doctor.status === 'approved') {
                statusBadge = '<span class="badge bg-success p-2">معتمد</span>';
            } else {
                statusBadge = '<span class="badge bg-danger p-2">مرفوض</span>';
            }

            // Generate star rating HTML
            let starsHtml = '';
            const rating = doctor.rating || 0;
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;

            for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fas fa-star text-warning"></i>';
            if (hasHalfStar) starsHtml += '<i class="fas fa-star-half-alt text-warning"></i>';
            const emptyStars = 5 - Math.ceil(rating);
            for (let i = 0; i < emptyStars; i++) starsHtml += '<i class="far fa-star text-warning"></i>';

            return `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="bg-light rounded-circle p-2 me-2 text-primary">
                                <i class="fas fa-user-md"></i>
                            </div>
                            <div>
                                <h6 class="mb-0">${doctor.name}</h6>
                                <small class="text-muted">${doctor.specialization || '-'}</small>
                            </div>
                        </div>
                    </td>
                    <td>${doctor.gender === 'male' ? 'ذكر' : (doctor.gender === 'female' ? 'أنثى' : '-')}</td>
                    <td>${doctor.degree || '-'}</td>
                    <td>${doctor.phone || '-'}</td>
                    <td>${doctor.bank_account || '-'}</td>
                    <td>
                        ${doctor.cv ? `<a href="#" class="btn btn-sm btn-outline-info"><i class="fas fa-file-download"></i> تحميل</a>` : '-'}
                    </td>
                    <td>
                        <div class="rating-stars">
                            ${starsHtml} <span class="text-muted small">(${rating})</span>
                        </div>
                    </td>
                    <td>
                        <span class="badge bg-info text-dark">${doctor.forums_count || 0} منتدى</span>
                    </td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-sm btn-light text-primary" onclick="editDoctor(${doctor.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-light text-danger" onclick="deleteDoctor(${doctor.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

    } catch (error) {
        console.error('Failed to load doctors:', error);
        tbody.innerHTML = '<tr><td colspan="10" class="text-center text-danger">فشل تحميل البيانات</td></tr>';
    }
}

function resetForm() {
    const form = document.getElementById('doctorForm');
    if (form) form.reset();
    if (document.getElementById('doctorId')) document.getElementById('doctorId').value = '';
    if (document.getElementById('modalTitle')) document.getElementById('modalTitle').innerText = 'إضافة طبيب جديد';
}

async function editDoctor(id) {
    try {
        const response = await ApiService.doctors.get(id);
        const doc = response.data || response;
        if (!doc) return;

        document.getElementById('doctorId').value = doc.id;
        document.getElementById('doctorName').value = doc.name;
        document.getElementById('doctorGender').value = doc.gender || 'male';
        document.getElementById('doctorDegree').value = doc.degree || '';
        document.getElementById('doctorPhone').value = doc.phone || '';
        document.getElementById('doctorBank').value = doc.bank_account || '';
        document.getElementById('doctorSpecialty').value = doc.specialization || '';
        if (document.getElementById('doctorRating')) document.getElementById('doctorRating').value = Math.floor(doc.rating || 5);
        if (document.getElementById('doctorForums')) document.getElementById('doctorForums').value = doc.forums_count || 0;
        if (document.getElementById('doctorStatus')) document.getElementById('doctorStatus').value = doc.status || 'pending';

        document.getElementById('modalTitle').innerText = 'تعديل بيانات الطبيب';
        if (doctorModal) doctorModal.show();
    } catch (error) {
        console.error('Failed to load doctor:', error);
        alert('فشل تحميل بيانات الطبيب');
    }
}

async function deleteDoctor(id) {
    if (confirm('هل أنت متأكد من حذف هذا الطبيب؟')) {
        try {
            await ApiService.doctors.delete(id);
            renderDoctors();
        } catch (error) {
            console.error('Failed to delete doctor:', error);
            alert('فشل حذف الطبيب');
        }
    }
}

const doctorForm = document.getElementById('doctorForm');
if (doctorForm) {
    doctorForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('doctorId').value;

        const data = {
            name: document.getElementById('doctorName').value,
            gender: document.getElementById('doctorGender').value,
            degree: document.getElementById('doctorDegree').value,
            phone: document.getElementById('doctorPhone').value,
            bank_account: document.getElementById('doctorBank').value,
            specialization: document.getElementById('doctorSpecialty').value,
            rating: document.getElementById('doctorRating') ? parseFloat(document.getElementById('doctorRating').value) : 0,
            forums_count: document.getElementById('doctorForums') ? parseInt(document.getElementById('doctorForums').value) : 0,
            status: document.getElementById('doctorStatus') ? document.getElementById('doctorStatus').value : 'pending'
        };

        try {
            if (id) {
                await ApiService.doctors.update(id, data);
            } else {
                await ApiService.doctors.create(data);
            }
            if (doctorModal) doctorModal.hide();
            renderDoctors();
        } catch (error) {
            console.error('Failed to save doctor:', error);
            alert('فشل حفظ البيانات');
        }
    });
}

