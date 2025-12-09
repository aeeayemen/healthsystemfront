document.addEventListener('DOMContentLoaded', () => {
    Layout.init('doctors');
    renderDoctors();
});

const doctorModal = new bootstrap.Modal(document.getElementById('doctorModal'));

function renderDoctors() {
    const doctors = db.get('doctors') || [];
    const forums = db.get('forums') || [];
    const tbody = document.getElementById('doctorsTableBody');

    tbody.innerHTML = doctors.map(doc => {
        const docForums = forums.filter(f => f.doctorId == doc.id).length;

        return `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <div class="bg-light rounded-circle p-2 me-2 text-primary">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <div>
                        <div class="fw-bold">${doc.name}</div>
                        <small class="text-muted">${doc.specialty}</small>
                    </div>
                </div>
            </td>
            <td>${doc.gender === 'female' ? 'أنثى' : 'ذكر'}</td>
            <td>${doc.degree || '-'}</td>
            <td>${doc.phone || '-'}</td>
            <td>${doc.bankAccount || '-'}</td>
            <td>
                ${doc.cv ? `<a href="#" class="btn btn-sm btn-outline-info"><i class="fas fa-file-download"></i> تحميل</a>` : '-'}
            </td>
            <td>
                <div class="text-warning">
                    <i class="fas fa-star"></i> ${doc.rating || 0}
                </div>
            </td>
            <td>
                <span class="badge bg-info text-dark">${docForums} منتدى</span>
            </td>
            <td>
                <button class="btn btn-sm btn-light text-primary" onclick="editDoctor(${doc.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-light text-danger" onclick="deleteDoctor(${doc.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `}).join('');
}

function resetForm() {
    document.getElementById('doctorForm').reset();
    document.getElementById('doctorId').value = '';
    document.getElementById('modalTitle').innerText = 'إضافة طبيب جديد';
}

function editDoctor(id) {
    const doc = db.getById('doctors', id);
    if (!doc) return;

    document.getElementById('doctorId').value = doc.id;
    document.getElementById('doctorName').value = doc.name;
    document.getElementById('doctorGender').value = doc.gender || 'male';
    document.getElementById('doctorDegree').value = doc.degree || '';
    document.getElementById('doctorPhone').value = doc.phone || '';
    document.getElementById('doctorBank').value = doc.bankAccount || '';
    document.getElementById('doctorSpecialty').value = doc.specialty;

    document.getElementById('modalTitle').innerText = 'تعديل بيانات الطبيب';
    doctorModal.show();
}

function deleteDoctor(id) {
    if (confirm('هل أنت متأكد من حذف هذا الطبيب؟')) {
        db.delete('doctors', id);
        renderDoctors();
    }
}

document.getElementById('doctorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('doctorId').value;

    const data = {
        name: document.getElementById('doctorName').value,
        gender: document.getElementById('doctorGender').value,
        degree: document.getElementById('doctorDegree').value,
        phone: document.getElementById('doctorPhone').value,
        bankAccount: document.getElementById('doctorBank').value,
        specialty: document.getElementById('doctorSpecialty').value,
        // Mocking file upload
        cv: document.getElementById('doctorCV').value ? 'path/to/cv.pdf' : null
    };

    if (id) {
        db.update('doctors', id, data);
    } else {
        db.add('doctors', data);
    }

    doctorModal.hide();
    renderDoctors();
});
