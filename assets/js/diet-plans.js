if (!isAuthenticated()) window.location.href = 'index.html';

let currentUserData = null;

async function loadUserInfo() {
    currentUserData = await updateSidebarForRole();
}

async function loadDietPlans() {
    try {
        const response = await api.get('/diet-plans');
        let plans = response.data.data || response.data;
        const container = document.getElementById('plansContainer');
        container.innerHTML = '';

        // Filter based on role
        if (currentUserData && currentUserData.role === 'doctor') {
            const doctorResponse = await api.get('/doctors');
            const doctors = doctorResponse.data || [];
            const currentDoctor = doctors.find(d => d.user_id === currentUserData.id);
            if (currentDoctor) {
                plans = plans.filter(p => p.doctor_id === currentDoctor.id);
            } else {
                plans = [];
            }
        } else if (currentUserData && currentUserData.role === 'patient') {
            const patientResponse = await api.get('/patients');
            const patients = patientResponse.data || [];
            const currentPatient = patients.find(p => p.user_id === currentUserData.id);
            if (currentPatient) {
                plans = plans.filter(p => p.patient_id === currentPatient.id);
            } else {
                plans = [];
            }
        }

        if (!plans || plans.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <i class="fas fa-utensils fa-5x text-muted mb-3"></i>
                    <h4>لا توجد خطط غذائية</h4>
                    <p class="text-muted">لم يتم إنشاء أي خطط غذائية بعد</p>
                </div>
            `;
            return;
        }

        plans.forEach(plan => {
            const statusClass = plan.status === 'active' ? 'success' :
                plan.status === 'completed' ? 'info' : 'secondary';
            const statusText = plan.status === 'active' ? 'نشط' :
                plan.status === 'completed' ? 'مكتمل' : 'ملغي';

            const card = `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100">
                        <div class="card-header bg-${statusClass} text-white">
                            <h5 class="mb-0">${plan.title || 'خطة غذائية'}</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <i class="fas fa-user text-primary"></i>
                                <strong>المريض:</strong> ${plan.patient?.user?.name || 'غير محدد'}
                            </div>
                            <div class="mb-3">
                                <i class="fas fa-user-md text-success"></i>
                                <strong>الطبيب:</strong> ${plan.doctor?.user?.name || 'غير محدد'}
                            </div>
                            <div class="mb-3">
                                <i class="fas fa-fire text-danger"></i>
                                <strong>السعرات:</strong> ${plan.daily_calories || 0} سعرة/يوم
                            </div>
                            <div class="mb-3">
                                <i class="fas fa-calendar text-info"></i>
                                <strong>المدة:</strong> ${plan.duration_days || 0} يوم
                            </div>
                            <div class="mb-3">
                                <i class="fas fa-calendar-alt text-warning"></i>
                                <strong>من:</strong> ${plan.start_date || '-'} 
                                <strong>إلى:</strong> ${plan.end_date || '-'}
                            </div>
                            <div>
                                <span class="badge bg-${statusClass}">${statusText}</span>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-sm btn-primary w-100" onclick="viewPlan(${plan.id})">
                                <i class="fas fa-eye"></i> عرض التفاصيل
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('plansContainer').innerHTML = `
            <div class="col-12 text-center text-danger">
                <i class="fas fa-exclamation-circle fa-3x mb-3"></i>
                <p>حدث خطأ في تحميل الخطط الغذائية</p>
            </div>
        `;
    }
}

async function viewPlan(planId) {
    try {
        const response = await api.get(`/diet-plans/${planId}`);
        const plan = response.data.data || response.data;

        let mealsHtml = '';
        if (plan.meals && plan.meals.length > 0) {
            mealsHtml = '<h6 class="mt-3">الوجبات:</h6><div class="table-responsive"><table class="table table-sm"><thead><tr><th>اليوم</th><th>نوع الوجبة</th><th>الوجبة</th><th>السعرات</th></tr></thead><tbody>';
            plan.meals.forEach(meal => {
                const mealType = meal.meal_type === 'breakfast' ? 'إفطار' :
                    meal.meal_type === 'lunch' ? 'غداء' :
                        meal.meal_type === 'dinner' ? 'عشاء' : 'وجبة خفيفة';
                mealsHtml += `<tr><td>${meal.day_number}</td><td>${mealType}</td><td>${meal.meal_name}</td><td>${meal.calories || 0}</td></tr>`;
            });
            mealsHtml += '</tbody></table></div>';
        } else {
            mealsHtml = '<p class="text-muted">لا توجد وجبات محددة</p>';
        }

        const detailsHtml = `
            <div class="row">
                <div class="col-md-6">
                    <h6>معلومات الخطة</h6>
                    <p><strong>العنوان:</strong> ${plan.title || 'غير محدد'}</p>
                    <p><strong>الوصف:</strong> ${plan.description || 'لا يوجد'}</p>
                    <p><strong>السعرات اليومية:</strong> ${plan.daily_calories || 0} سعرة</p>
                    <p><strong>المدة:</strong> ${plan.duration_days || 0} يوم</p>
                </div>
                <div class="col-md-6">
                    <h6>التواريخ</h6>
                    <p><strong>تاريخ البدء:</strong> ${plan.start_date || '-'}</p>
                    <p><strong>تاريخ الانتهاء:</strong> ${plan.end_date || '-'}</p>
                    <p><strong>الحالة:</strong> ${plan.status || 'غير محدد'}</p>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-md-6">
                    <h6>المريض</h6>
                    <p><strong>الاسم:</strong> ${plan.patient?.user?.name || 'غير محدد'}</p>
                    <p><strong>البريد:</strong> ${plan.patient?.user?.email || 'غير محدد'}</p>
                </div>
                <div class="col-md-6">
                    <h6>الطبيب</h6>
                    <p><strong>الاسم:</strong> ${plan.doctor?.user?.name || 'غير محدد'}</p>
                    <p><strong>التخصص:</strong> ${plan.doctor?.specialization || 'غير محدد'}</p>
                </div>
            </div>
            <hr>
            ${mealsHtml}
        `;

        document.getElementById('planDetails').innerHTML = detailsHtml;
        new bootstrap.Modal(document.getElementById('planModal')).show();
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ في تحميل تفاصيل الخطة');
    }
}

document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    loadUserInfo();
    loadDietPlans();
});
