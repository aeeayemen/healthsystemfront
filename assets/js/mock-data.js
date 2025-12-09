const MOCK_DATA = {
    // Users with type field (normal, paying, subscribed, admin)
    users: [
        { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', password: '123456', type: 'normal', created_at: '2024-01-15' },
        { id: 2, name: 'سارة علي', email: 'sara@example.com', password: '123456', type: 'normal', created_at: '2024-02-20' },
        { id: 3, name: 'خالد عمر', email: 'khaled@example.com', password: '123456', type: 'paying', created_at: '2024-03-10' },
        { id: 4, name: 'فاطمة حسن', email: 'fatima@example.com', password: '123456', type: 'paying', created_at: '2024-03-15' },
        { id: 5, name: 'محمد سعيد', email: 'mohamed@example.com', password: '123456', type: 'normal', created_at: '2024-04-01' },
        { id: 6, name: 'نورة أحمد', email: 'noura@example.com', password: '123456', type: 'normal', created_at: '2024-04-10' },
        { id: 7, name: 'عبدالله خالد', email: 'abdullah@example.com', password: '123456', type: 'normal', created_at: '2024-05-01' },
        { id: 8, name: 'ريم محمد', email: 'reem@example.com', password: '123456', type: 'paying', created_at: '2024-05-15' },
        { id: 9, name: 'يوسف علي', email: 'yousef@example.com', password: '123456', type: 'paying', created_at: '2024-06-01' },
        { id: 10, name: 'مريم سالم', email: 'mariam@example.com', password: '123456', type: 'normal', created_at: '2024-06-20' },
        { id: 11, name: 'عبدالرحمن الشهري', email: 'abdulrahman@example.com', password: '123456', type: 'normal', created_at: '2024-07-05' },
        { id: 12, name: 'لمى العتيبي', email: 'lama@example.com', password: '123456', type: 'paying', created_at: '2024-07-15' },
        { id: 13, name: 'سلطان الدوسري', email: 'sultan@example.com', password: '123456', type: 'normal', created_at: '2024-08-01' },
        { id: 14, name: 'هيفاء القحطاني', email: 'haifa@example.com', password: '123456', type: 'paying', created_at: '2024-08-20' },
        { id: 15, name: 'مدير النظام', email: 'admin@gmail.com', password: 'password', type: 'admin', created_at: '2023-01-01', role: 'admin', avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff' }
    ],


    // SubscribedUsers (linked to User)
    subscribedUsers: [
        { id: 1, user_id: 1, fullname: 'أحمد محمد الشمري', gender: 'male', height: 175, weight: 80, phone_number: '0501234567', birthdate: '1990-05-15', physical_activity: 'متوسط', medical: 'لا يوجد' },
        { id: 2, user_id: 2, fullname: 'سارة علي العتيبي', gender: 'female', height: 160, weight: 58, phone_number: '0557654321', birthdate: '1995-08-20', physical_activity: 'عالي', medical: 'حساسية القمح' },
        { id: 3, user_id: 3, fullname: 'خالد عمر الزهراني', gender: 'male', height: 180, weight: 85, phone_number: '0541112233', birthdate: '1988-12-10', physical_activity: 'منخفض', medical: 'ضغط دم' },
        { id: 4, user_id: 4, fullname: 'فاطمة حسن المالكي', gender: 'female', height: 165, weight: 62, phone_number: '0509998877', birthdate: '1992-03-25', physical_activity: 'متوسط', medical: 'لا يوجد' },
        { id: 5, user_id: 5, fullname: 'محمد سعيد القرني', gender: 'male', height: 172, weight: 78, phone_number: '0556667788', birthdate: '1991-07-12', physical_activity: 'عالي', medical: 'سكري نوع 2' },
        { id: 6, user_id: 6, fullname: 'نورة أحمد السلمي', gender: 'female', height: 158, weight: 55, phone_number: '0501234000', birthdate: '1997-01-30', physical_activity: 'متوسط', medical: 'لا يوجد' },
        { id: 7, user_id: 8, fullname: 'ريم محمد العنزي', gender: 'female', height: 163, weight: 60, phone_number: '0554443322', birthdate: '1994-09-18', physical_activity: 'منخفض', medical: 'حساسية الألبان' },
        { id: 8, user_id: 9, fullname: 'يوسف علي الحربي', gender: 'male', height: 178, weight: 82, phone_number: '0507778899', birthdate: '1989-11-05', physical_activity: 'عالي', medical: 'لا يوجد' }
    ],

    // MedicalTest
    medicalTests: [
        { id: 1, user_id: 1, name: 'تحليل دم شامل', image: 'https://via.placeholder.com/300x200?text=Blood+Test', created_at: '2024-11-01' },
        { id: 2, user_id: 2, name: 'فحص الغدة الدرقية', image: 'https://via.placeholder.com/300x200?text=Thyroid+Test', created_at: '2024-11-05' },
        { id: 3, user_id: 3, name: 'تحليل السكر التراكمي', image: 'https://via.placeholder.com/300x200?text=HbA1c+Test', created_at: '2024-11-10' },
        { id: 4, user_id: 4, name: 'فحص الكوليسترول', image: 'https://via.placeholder.com/300x200?text=Cholesterol', created_at: '2024-11-15' },
        { id: 5, user_id: 5, name: 'تحليل فيتامين د', image: 'https://via.placeholder.com/300x200?text=Vitamin+D', created_at: '2024-11-18' },
        { id: 6, user_id: 6, name: 'فحص وظائف الكبد', image: 'https://via.placeholder.com/300x200?text=Liver+Test', created_at: '2024-11-20' },
        { id: 7, user_id: 1, name: 'تحليل الحديد', image: 'https://via.placeholder.com/300x200?text=Iron+Test', created_at: '2024-11-22' },
        { id: 8, user_id: 3, name: 'فحص وظائف الكلى', image: 'https://via.placeholder.com/300x200?text=Kidney+Test', created_at: '2024-11-25' }
    ],

    // MainCalculation
    mainCalculations: [
        { id: 1, user_id: 1, calories: 2200, protin: 110, fat: 70, carbo: 250, BMR: 1800, BMI: 26.1 },
        { id: 2, user_id: 2, calories: 1600, protin: 80, fat: 50, carbo: 180, BMR: 1400, BMI: 22.7 },
        { id: 3, user_id: 3, calories: 2400, protin: 120, fat: 75, carbo: 270, BMR: 1900, BMI: 26.2 },
        { id: 4, user_id: 4, calories: 1700, protin: 85, fat: 55, carbo: 190, BMR: 1450, BMI: 22.8 },
        { id: 5, user_id: 5, calories: 2100, protin: 105, fat: 65, carbo: 240, BMR: 1750, BMI: 26.4 },
        { id: 6, user_id: 6, calories: 1550, protin: 78, fat: 48, carbo: 175, BMR: 1350, BMI: 22.0 },
        { id: 7, user_id: 8, calories: 1650, protin: 83, fat: 52, carbo: 185, BMR: 1420, BMI: 22.6 },
        { id: 8, user_id: 9, calories: 2300, protin: 115, fat: 72, carbo: 260, BMR: 1850, BMI: 25.9 }
    ],

    // WeeklyCalculations
    weeklyCalculations: [
        { id: 1, user_id: 1, weight: 80, waist: 85, date: '2024-11-01' },
        { id: 2, user_id: 1, weight: 79.5, waist: 84, date: '2024-11-08' },
        { id: 3, user_id: 1, weight: 79, waist: 83, date: '2024-11-15' },
        { id: 4, user_id: 2, weight: 58, waist: 68, date: '2024-11-01' },
        { id: 5, user_id: 2, weight: 57.5, waist: 67, date: '2024-11-08' },
        { id: 6, user_id: 3, weight: 85, waist: 90, date: '2024-11-01' },
        { id: 7, user_id: 3, weight: 84, waist: 89, date: '2024-11-08' },
        { id: 8, user_id: 4, weight: 62, waist: 70, date: '2024-11-01' },
        { id: 9, user_id: 5, weight: 78, waist: 82, date: '2024-11-01' },
        { id: 10, user_id: 5, weight: 77.5, waist: 81, date: '2024-11-08' }
    ],

    // Doctor with admin_id (null = pending, not null = approved)
    doctors: [
        { id: 1, name: 'د. أحمد الشريف', gender: 'male', degree: 'دكتوراه تغذية علاجية', bank_account: 'SA1234567890123456789012', phone_number: '0501111111', CV: 'https://example.com/cv1.pdf', admin_id: 1 },
        { id: 2, name: 'د. سمية خالد', gender: 'female', degree: 'ماجستير علوم تغذية', bank_account: 'SA9876543210987654321098', phone_number: '0502222222', CV: 'https://example.com/cv2.pdf', admin_id: 1 },
        { id: 3, name: 'د. عمر الفهد', gender: 'male', degree: 'بكالوريوس تغذية', bank_account: 'SA5555666677778888999900', phone_number: '0503333333', CV: 'https://example.com/cv3.pdf', admin_id: 1 },
        { id: 4, name: 'د. هند العلي', gender: 'female', degree: 'ماجستير تغذية رياضية', phone_number: '0504444444', CV: 'https://example.com/cv4.pdf', admin_id: null },
        { id: 5, name: 'د. فيصل المطيري', gender: 'male', degree: 'دكتوراه طب رياضي', phone_number: '0505555555', CV: 'https://example.com/cv5.pdf', admin_id: null },
        { id: 6, name: 'د. منى السبيعي', gender: 'female', degree: 'ماجستير تغذية علاجية', phone_number: '0506666666', CV: 'https://example.com/cv6.pdf', admin_id: null },
        { id: 7, name: 'د. سعد الغامدي', gender: 'male', degree: 'دكتوراه علوم الغذاء', phone_number: '0507777777', CV: 'https://example.com/cv7.pdf', admin_id: null }
    ],

    // Rate (Doctor Ratings)
    rates: [
        { id: 1, doctor_id: 1, user_id: 1, rate: 5 },
        { id: 2, doctor_id: 1, user_id: 2, rate: 4 },
        { id: 3, doctor_id: 1, user_id: 3, rate: 5 },
        { id: 4, doctor_id: 2, user_id: 4, rate: 5 },
        { id: 5, doctor_id: 2, user_id: 5, rate: 4 },
        { id: 6, doctor_id: 2, user_id: 6, rate: 3 },
        { id: 7, doctor_id: 3, user_id: 1, rate: 4 },
        { id: 8, doctor_id: 3, user_id: 2, rate: 5 },
        { id: 9, doctor_id: 1, user_id: 8, rate: 4 },
        { id: 10, doctor_id: 2, user_id: 9, rate: 5 }
    ],

    // Messages
    messages: [
        { id: 1, user_id: 1, doctor_id: 1, massage: 'السلام عليكم دكتور، لدي سؤال عن النظام الغذائي', time: '10:30', date: '2024-11-20', read: true },
        { id: 2, user_id: 1, doctor_id: 1, massage: 'هل يمكنني تناول الفواكه بعد الوجبات؟', time: '10:32', date: '2024-11-20', read: true },
        { id: 3, user_id: 2, doctor_id: 2, massage: 'شكراً على الخطة الجديدة دكتورة', time: '14:00', date: '2024-11-21', read: false },
        { id: 4, user_id: 3, doctor_id: 1, massage: 'متى موعدي القادم؟', time: '09:15', date: '2024-11-22', read: false },
        { id: 5, user_id: 4, doctor_id: 2, massage: 'أشعر بتحسن كبير بعد اتباع النظام', time: '16:45', date: '2024-11-22', read: true },
        { id: 6, user_id: 5, doctor_id: 1, massage: 'هل يمكنني زيادة كمية البروتين؟', time: '11:20', date: '2024-11-23', read: false },
        { id: 7, user_id: 6, doctor_id: 2, massage: 'ما هي البدائل الصحية للحلويات؟', time: '15:30', date: '2024-11-23', read: false },
        { id: 8, user_id: 1, doctor_id: 3, massage: 'أحتاج تعديل على خطة التمارين', time: '18:00', date: '2024-11-24', read: true },
        { id: 9, user_id: 8, doctor_id: 1, massage: 'هل الصيام المتقطع مناسب لي؟', time: '08:45', date: '2024-11-25', read: false },
        { id: 10, user_id: 9, doctor_id: 2, massage: 'شكراً على المتابعة المستمرة', time: '12:00', date: '2024-11-25', read: true }
    ],

    // DietComponents
    dietComponents: [
        { id: 1, diet_id: 1, doctor_id: 1, periods_time: '08:00', period_name: 'الفطور' },
        { id: 2, diet_id: 1, doctor_id: 1, periods_time: '11:00', period_name: 'وجبة خفيفة صباحية' },
        { id: 3, diet_id: 1, doctor_id: 1, periods_time: '13:00', period_name: 'الغداء' },
        { id: 4, diet_id: 1, doctor_id: 1, periods_time: '16:00', period_name: 'وجبة خفيفة مسائية' },
        { id: 5, diet_id: 1, doctor_id: 1, periods_time: '19:00', period_name: 'العشاء' },
        { id: 6, diet_id: 2, doctor_id: 2, periods_time: '07:30', period_name: 'الفطور' },
        { id: 7, diet_id: 2, doctor_id: 2, periods_time: '10:30', period_name: 'سناك' },
        { id: 8, diet_id: 2, doctor_id: 2, periods_time: '12:30', period_name: 'الغداء' },
        { id: 9, diet_id: 2, doctor_id: 2, periods_time: '15:30', period_name: 'وجبة خفيفة' },
        { id: 10, diet_id: 2, doctor_id: 2, periods_time: '18:30', period_name: 'العشاء' },
        { id: 11, diet_id: 3, doctor_id: 3, periods_time: '09:00', period_name: 'الفطور' },
        { id: 12, diet_id: 3, doctor_id: 3, periods_time: '14:00', period_name: 'الغداء' },
        { id: 13, diet_id: 3, doctor_id: 3, periods_time: '20:00', period_name: 'العشاء' }
    ],

    // Tips
    tips: [
        { id: 1, describtion: 'اشرب 8 أكواب من الماء يومياً للحفاظ على رطوبة الجسم', admin_id: 1, date: '2024-11-01' },
        { id: 2, describtion: 'تناول الخضروات الورقية يومياً لتعزيز المناعة', admin_id: 1, date: '2024-11-05' },
        { id: 3, describtion: 'المشي 30 دقيقة يومياً يحسن الصحة العامة', admin_id: 1, date: '2024-11-10' },
        { id: 4, describtion: 'تجنب تناول الطعام قبل النوم بساعتين', admin_id: 1, date: '2024-11-15' },
        { id: 5, describtion: 'النوم 7-8 ساعات ضروري لتجديد الطاقة', admin_id: 1, date: '2024-11-20' },
        { id: 6, describtion: 'تناول البروتين في كل وجبة لبناء العضلات', admin_id: 1, date: '2024-11-22' },
        { id: 7, describtion: 'قلل من تناول السكريات المكررة', admin_id: 1, date: '2024-11-23' },
        { id: 8, describtion: 'تناول الفواكه الطازجة بدلاً من العصائر', admin_id: 1, date: '2024-11-24' },
        { id: 9, describtion: 'استخدم زيت الزيتون بدلاً من الزيوت المهدرجة', admin_id: 1, date: '2024-11-25' },
        { id: 10, describtion: 'تناول وجبات صغيرة ومتعددة خلال اليوم', admin_id: 1, date: '2024-11-26' }
    ],

    // TipsCategory
    tipsCategories: [
        { id: 1, name: 'تغذية', type: 'nutrition' },
        { id: 2, name: 'رياضة', type: 'exercise' },
        { id: 3, name: 'صحة نفسية', type: 'mental' },
        { id: 4, name: 'نوم', type: 'sleep' },
        { id: 5, name: 'عادات صحية', type: 'habits' },
        { id: 6, name: 'إنقاص الوزن', type: 'weight_loss' },
        { id: 7, name: 'بناء العضلات', type: 'muscle_building' }
    ],

    // Forum
    forums: [
        { id: 1, name: 'منتدى التغذية الصحية', doctor_id: 1 },
        { id: 2, name: 'منتدى الرياضة واللياقة', doctor_id: 2 },
        { id: 3, name: 'منتدى إنقاص الوزن', doctor_id: 1 },
        { id: 4, name: 'منتدى الأمراض المزمنة', doctor_id: 2 },
        { id: 5, name: 'منتدى بناء العضلات', doctor_id: 3 },
        { id: 6, name: 'منتدى الصيام المتقطع', doctor_id: 1 },
        { id: 7, name: 'منتدى الحمية النباتية', doctor_id: 2 }
    ],

    // Advertisment
    advertisments: [
        { id: 1, admin_id: 1, date: '2024-11-01', image: 'https://via.placeholder.com/400x200/4361ee/ffffff?text=خصم+20%25', describtion: 'خصم 20% على الاشتراكات الشهرية', phone_number: '0500000001', type: 'عرض', GPS: '24.7136,46.6753' },
        { id: 2, admin_id: 1, date: '2024-11-10', image: 'https://via.placeholder.com/400x200/28a745/ffffff?text=استشارة+مجانية', describtion: 'استشارة مجانية للمشتركين الجدد', phone_number: '0500000002', type: 'ترويج', GPS: '24.7236,46.6853' },
        { id: 3, admin_id: 1, date: '2024-11-15', image: 'https://via.placeholder.com/400x200/dc3545/ffffff?text=باقة+العائلة', describtion: 'باقة العائلة - اشتراك لشخصين بسعر واحد', phone_number: '0500000003', type: 'عرض', GPS: '24.7336,46.6953' },
        { id: 4, admin_id: 1, date: '2024-11-20', image: 'https://via.placeholder.com/400x200/ffc107/000000?text=عرض+نهاية+العام', describtion: 'عرض نهاية العام - خصم 30%', phone_number: '0500000004', type: 'عرض', GPS: '24.7436,46.7053' },
        { id: 5, admin_id: 1, date: '2024-11-25', image: 'https://via.placeholder.com/400x200/17a2b8/ffffff?text=برنامج+VIP', describtion: 'برنامج VIP مع متابعة يومية', phone_number: '0500000005', type: 'ترويج', GPS: '24.7536,46.7153' }
    ],

    // Meals
    meals: [
        { id: 1, name: 'شوفان بالموز', serving: '1 كوب', describtion: 'شوفان مطبوخ مع حليب قليل الدسم وموز طازج', carbo: 45, protin: 12, fat: 5, energy: 280, category: 'فطور' },
        { id: 2, name: 'سلطة الدجاج المشوي', serving: '300 جم', describtion: 'صدر دجاج مشوي مع خضروات طازجة وزيت زيتون', carbo: 10, protin: 35, fat: 15, energy: 320, category: 'غداء' },
        { id: 3, name: 'سمك السلمون', serving: '200 جم', describtion: 'سلمون مشوي مع الخضار السوتيه', carbo: 5, protin: 40, fat: 20, energy: 360, category: 'غداء' },
        { id: 4, name: 'زبادي يوناني', serving: '150 جم', describtion: 'زبادي يوناني مع العسل والمكسرات', carbo: 15, protin: 15, fat: 8, energy: 190, category: 'وجبة خفيفة' },
        { id: 5, name: 'بيض مسلوق', serving: '2 بيضة', describtion: 'بيضتان مسلوقتان مع خبز أسمر', carbo: 20, protin: 14, fat: 10, energy: 230, category: 'فطور' },
        { id: 6, name: 'حساء العدس', serving: '250 مل', describtion: 'حساء عدس أحمر مع الليمون', carbo: 30, protin: 12, fat: 3, energy: 200, category: 'عشاء' },
        { id: 7, name: 'موز', serving: '1 موزة', describtion: 'موزة متوسطة الحجم', carbo: 27, protin: 1, fat: 0, energy: 105, category: 'وجبة خفيفة' },
        { id: 8, name: 'أرز بني مع الخضار', serving: '200 جم', describtion: 'أرز بني مطبوخ مع خضار مشكلة', carbo: 45, protin: 8, fat: 5, energy: 260, category: 'غداء' },
        { id: 9, name: 'سلطة خضراء', serving: '150 جم', describtion: 'خس، خيار، طماطم مع زيت زيتون', carbo: 8, protin: 2, fat: 10, energy: 120, category: 'مقبلات' },
        { id: 10, name: 'شريحة خبز أسمر', serving: '1 شريحة', describtion: 'خبز أسمر كامل الحبوب', carbo: 15, protin: 4, fat: 1, energy: 80, category: 'خبز' },
        { id: 11, name: 'تفاح أخضر', serving: '1 تفاحة', describtion: 'تفاحة خضراء متوسطة الحجم', carbo: 25, protin: 0, fat: 0, energy: 95, category: 'وجبة خفيفة' },
        { id: 12, name: 'صدر دجاج مشوي', serving: '150 جم', describtion: 'صدر دجاج مشوي بالأعشاب', carbo: 0, protin: 32, fat: 7, energy: 195, category: 'غداء' },
        { id: 13, name: 'عصير برتقال طبيعي', serving: '200 مل', describtion: 'عصير برتقال طازج بدون سكر', carbo: 22, protin: 2, fat: 0, energy: 90, category: 'فطور' },
        { id: 14, name: 'لوز محمص', serving: '30 جم', describtion: 'لوز محمص بدون ملح', carbo: 6, protin: 6, fat: 15, energy: 175, category: 'وجبة خفيفة' },
        { id: 15, name: 'سلطة التونة', serving: '200 جم', describtion: 'تونة مع خضار وزيت زيتون', carbo: 5, protin: 25, fat: 12, energy: 230, category: 'عشاء' }
    ],

    // Settings
    settings: {
        appName: 'مشروع التغذية العلاجية',
        logo: 'fas fa-heartbeat',
        primaryColor: '#4361ee',
        contactEmail: 'support@healthapp.com',
        contactPhone: '+966 50 000 0000'
    }
};
