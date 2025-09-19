// Enhanced College Complaint Management System with Analytics, Feedback & Accessibility

class ComplaintManagementApp {
    constructor() {
        this.currentUser = null;
        this.currentRoute = 'dashboard';
        this.currentLanguage = 'en';
        this.complaints = [];
        this.categories = [];
        this.priorities = [];
        this.statuses = [];
        this.users = [];
        this.notifications = [];
        this.charts = {};
        this.feedbacks = [];
        this.currentComplaint = null;
        this.currentFeedbackComplaint = null;
        
        // Accessibility settings
        this.accessibilitySettings = {
            highContrast: false,
            fontSize: 'normal'
        };
        
        // Load data from provided JSON
        this.translations = {
            "en": {
                "title": "College Complaint Management System",
                "login": "Login",
                "email": "Email",
                "password": "Password",
                "role": "Role",
                "student": "Student",
                "staff": "Staff",
                "admin": "Admin",
                "dashboard": "Dashboard",
                "complaints": "Complaints",
                "submit_complaint": "Submit Complaint",
                "analytics": "Analytics",
                "notifications": "Notifications",
                "settings": "Settings",
                "logout": "Logout",
                "total_complaints": "Total Complaints",
                "resolution_rate": "Resolution Rate",
                "avg_resolution_time": "Avg Resolution Time",
                "feedback": "Feedback",
                "rate_experience": "Rate your experience",
                "submit_feedback": "Submit Feedback",
                "accessibility": "Accessibility",
                "high_contrast": "High Contrast",
                "large_text": "Large Text",
                "language": "Language",
                "category": "Category",
                "priority": "Priority",
                "status": "Status",
                "search": "Search",
                "submit": "Submit",
                "cancel": "Cancel",
                "close": "Close",
                "save": "Save",
                "delete": "Delete",
                "edit": "Edit",
                "view_all": "View All",
                "new_complaint": "New Complaint",
                "complaint_submitted": "Complaint submitted successfully!",
                "login_successful": "Login successful!",
                "invalid_credentials": "Invalid credentials",
                "loading": "Loading...",
                "no_complaints": "No complaints found",
                "recent_complaints": "Recent Complaints",
                "all_categories": "All Categories",
                "all_priorities": "All Priorities",
                "all_status": "All Status",
                "description": "Description",
                "attachment": "Attachment",
                "optional": "Optional"
            },
            "hi": {
                "title": "कॉलेज शिकायत प्रबंधन प्रणाली",
                "login": "लॉगिन",
                "email": "ईमेल",
                "password": "पासवर्ड",
                "role": "भूमिका",
                "student": "छात्र",
                "staff": "स्टाफ",
                "admin": "प्रशासक",
                "dashboard": "डैशबोर्ड",
                "complaints": "शिकायतें",
                "submit_complaint": "शिकायत दर्ज करें",
                "analytics": "विश्लेषण",
                "notifications": "सूचनाएं",
                "settings": "सेटिंग",
                "logout": "लॉगआउट",
                "total_complaints": "कुल शिकायतें",
                "resolution_rate": "समाधान दर",
                "avg_resolution_time": "औसत समाधान समय",
                "feedback": "प्रतिक्रिया",
                "rate_experience": "अपने अनुभव को रेट करें",
                "submit_feedback": "प्रतिक्रिया भेजें",
                "accessibility": "पहुंच",
                "high_contrast": "उच्च कंट्रास्ट",
                "large_text": "बड़ा टेक्स्ट",
                "language": "भाषा",
                "category": "श्रेणी",
                "priority": "प्राथमिकता",
                "status": "स्थिति",
                "search": "खोजें",
                "submit": "जमा करें",
                "cancel": "रद्द करें",
                "close": "बंद करें",
                "save": "सहेजें",
                "delete": "हटाएं",
                "edit": "संपादित करें",
                "view_all": "सभी देखें",
                "new_complaint": "नई शिकायत",
                "complaint_submitted": "शिकायत सफलतापूर्वक दर्ज की गई!",
                "login_successful": "लॉगिन सफल!",
                "invalid_credentials": "अमान्य क्रेडेंशियल",
                "loading": "लोड हो रहा है...",
                "no_complaints": "कोई शिकायत नहीं मिली",
                "recent_complaints": "हाल की शिकायतें",
                "all_categories": "सभी श्रेणियां",
                "all_priorities": "सभी प्राथमिकताएं",
                "all_status": "सभी स्थितियां",
                "description": "विवरण",
                "attachment": "अटैचमेंट",
                "optional": "वैकल्पिक"
            }
        };
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        console.log('Initializing enhanced app...');
        this.loadMockData();
        this.loadUserSession();
        this.loadAccessibilitySettings();
        this.loadLanguageSettings();
        
        setTimeout(() => {
            this.bindEvents();
            this.setupKeyboardShortcuts();
            this.hideLoading();
            
            if (!this.currentUser) {
                this.showLogin();
            } else {
                this.showMainApp();
                this.navigate('dashboard');
            }
        }, 500);
    }
    
    loadMockData() {
        console.log('Loading enhanced mock data...');
        
        // Users with enhanced data
        this.users = [
            {"email": "student@college.edu", "password": "demo123", "role": "Student", "name": "राहुल शर्मा", "id": "STU001", "phone": "+91-9876543210"},
            {"email": "staff@college.edu", "password": "demo123", "role": "Staff", "name": "प्रिया पटेल", "id": "STF001", "phone": "+91-9876543211"},
            {"email": "admin@college.edu", "password": "demo123", "role": "Admin", "name": "अमित कुमार", "id": "ADM001", "phone": "+91-9876543212"}
        ];
        
        // Enhanced categories with departments
        this.categories = [
            {"id": 1, "name": "WiFi", "nameHi": "वाईफाई", "icon": "📶", "color": "bg-blue-500", "department": "IT Department"},
            {"id": 2, "name": "Hostel", "nameHi": "छात्रावास", "icon": "🏠", "color": "bg-purple-500", "department": "Hostel Administration"},
            {"id": 3, "name": "Food", "nameHi": "भोजन", "icon": "🍽️", "color": "bg-orange-500", "department": "Mess Management"},
            {"id": 4, "name": "Classroom", "nameHi": "कक्षा", "icon": "🏫", "color": "bg-green-500", "department": "Academic Affairs"},
            {"id": 5, "name": "Maintenance", "nameHi": "रखरखाव", "icon": "🔧", "color": "bg-yellow-500", "department": "Maintenance Department"},
            {"id": 6, "name": "Academics", "nameHi": "शिक्षा", "icon": "📚", "color": "bg-indigo-500", "department": "Academic Affairs"},
            {"id": 7, "name": "Harassment", "nameHi": "उत्पीड़न", "icon": "⚠️", "color": "bg-red-500", "department": "Student Affairs"},
            {"id": 8, "name": "Other", "nameHi": "अन्य", "icon": "❓", "color": "bg-gray-500", "department": "General Administration"}
        ];
        
        // Enhanced priorities with target times
        this.priorities = [
            {"id": 1, "name": "Urgent", "nameHi": "तत्काल", "color": "bg-red-500", "textColor": "text-red-500", "targetTime": 4},
            {"id": 2, "name": "Medium", "nameHi": "मध्यम", "color": "bg-orange-500", "textColor": "text-orange-500", "targetTime": 24},
            {"id": 3, "name": "Low", "nameHi": "कम", "color": "bg-green-500", "textColor": "text-green-500", "targetTime": 72}
        ];
        
        // Enhanced statuses
        this.statuses = [
            {"id": 1, "name": "Submitted", "nameHi": "प्रस्तुत", "color": "bg-blue-500", "textColor": "text-blue-500"},
            {"id": 2, "name": "In Progress", "nameHi": "प्रगति में", "color": "bg-yellow-500", "textColor": "text-yellow-500"},
            {"id": 3, "name": "Resolved", "nameHi": "समाधान हो गया", "color": "bg-green-500", "textColor": "text-green-500"}
        ];
        
        // Load complaints and feedbacks
        const savedComplaints = localStorage.getItem('complaints');
        const savedFeedbacks = localStorage.getItem('feedbacks');
        
        if (savedComplaints) {
            try {
                this.complaints = JSON.parse(savedComplaints);
            } catch (e) {
                this.complaints = this.getDefaultComplaints();
            }
        } else {
            this.complaints = this.getDefaultComplaints();
            this.saveComplaints();
        }
        
        if (savedFeedbacks) {
            try {
                this.feedbacks = JSON.parse(savedFeedbacks);
            } catch (e) {
                this.feedbacks = this.getDefaultFeedbacks();
            }
        } else {
            this.feedbacks = this.getDefaultFeedbacks();
            this.saveFeedbacks();
        }
        
        // Load notifications
        this.loadNotifications();
    }
    
    getDefaultComplaints() {
        return [
            {
                "id": "COMP001", "title": "WiFi not working in Block A", "titleHi": "ब्लॉक A में वाईफाई काम नहीं कर रहा",
                "description": "WiFi connectivity issues in hostel rooms", "category": 1, "priority": 1, "status": 3,
                "submittedBy": "STU001", "submittedAt": "2025-09-15T08:30:00Z", "updatedAt": "2025-09-17T14:00:00Z",
                "resolutionTime": 53.5
            },
            {
                "id": "COMP002", "title": "Mess food quality poor", "titleHi": "मेस का खाना खराब है",
                "description": "Food quality deteriorated", "category": 3, "priority": 2, "status": 2,
                "submittedBy": "STU001", "submittedAt": "2025-09-16T14:20:00Z", "updatedAt": "2025-09-18T10:15:00Z",
                "resolutionTime": null
            },
            {
                "id": "COMP003", "title": "AC not working in Room 101", "titleHi": "कमरा 101 में AC काम नहीं कर रहा",
                "description": "Air conditioning malfunction", "category": 4, "priority": 2, "status": 3,
                "submittedBy": "STU001", "submittedAt": "2025-09-12T09:15:00Z", "updatedAt": "2025-09-14T16:30:00Z",
                "resolutionTime": 55.25
            }
        ];
    }
    
    getDefaultFeedbacks() {
        return [
            {"complaintId": "COMP001", "rating": 4, "comment": "Good response time", "submittedAt": "2025-09-17T15:00:00Z"},
            {"complaintId": "COMP003", "rating": 5, "comment": "Excellent service", "submittedAt": "2025-09-14T17:00:00Z"}
        ];
    }
    
    loadUserSession() {
        try {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
            }
        } catch (e) {
            console.error('Error loading user session:', e);
            localStorage.removeItem('currentUser');
        }
    }
    
    loadAccessibilitySettings() {
        try {
            const saved = localStorage.getItem('accessibilitySettings');
            if (saved) {
                this.accessibilitySettings = { ...this.accessibilitySettings, ...JSON.parse(saved) };
                this.applyAccessibilitySettings();
            }
        } catch (e) {
            console.error('Error loading accessibility settings:', e);
        }
    }
    
    loadLanguageSettings() {
        try {
            const saved = localStorage.getItem('currentLanguage');
            if (saved) {
                this.currentLanguage = saved;
            }
        } catch (e) {
            console.error('Error loading language settings:', e);
        }
    }
    
    loadNotifications() {
        // Generate sample notifications
        this.notifications = [
            {
                id: 'not1',
                type: 'info',
                title: this.t('complaint_submitted'),
                message: 'Your complaint COMP001 has been submitted',
                timestamp: new Date().toISOString(),
                read: false
            },
            {
                id: 'not2',
                type: 'success',
                title: 'Status Updated',
                message: 'Complaint COMP003 has been resolved',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                read: false
            }
        ];
    }
    
    // Translation helper
    t(key) {
        return this.translations[this.currentLanguage]?.[key] || key;
    }
    
    saveUserSession() {
        try {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        } catch (e) {
            console.error('Error saving user session:', e);
        }
    }
    
    saveComplaints() {
        try {
            localStorage.setItem('complaints', JSON.stringify(this.complaints));
        } catch (e) {
            console.error('Error saving complaints:', e);
        }
    }
    
    saveFeedbacks() {
        try {
            localStorage.setItem('feedbacks', JSON.stringify(this.feedbacks));
        } catch (e) {
            console.error('Error saving feedbacks:', e);
        }
    }
    
    saveAccessibilitySettings() {
        try {
            localStorage.setItem('accessibilitySettings', JSON.stringify(this.accessibilitySettings));
        } catch (e) {
            console.error('Error saving accessibility settings:', e);
        }
    }
    
    saveLanguageSettings() {
        try {
            localStorage.setItem('currentLanguage', this.currentLanguage);
        } catch (e) {
            console.error('Error saving language settings:', e);
        }
    }
    
    bindEvents() {
        console.log('Binding enhanced events...');
        
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-route') || e.target.closest('[data-route]')) {
                e.preventDefault();
                const element = e.target.hasAttribute('data-route') ? e.target : e.target.closest('[data-route]');
                const route = element.getAttribute('data-route');
                this.navigate(route);
            }
        });
        
        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-mobile-toggle');
        const navLinks = document.getElementById('nav-links');
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }
        
        // Language switcher
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = this.currentLanguage;
            languageSelect.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
        }
        
        // Accessibility controls
        this.bindAccessibilityEvents();
        
        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
        
        // Complaint form
        const complaintForm = document.getElementById('complaint-form');
        if (complaintForm) {
            complaintForm.addEventListener('submit', (e) => this.handleComplaintSubmit(e));
        }
        
        // Feedback form
        this.bindFeedbackEvents();
        
        // Filters
        setTimeout(() => {
            this.bindFilterEvents();
        }, 1000);
        
        // Modal events
        this.bindModalEvents();
        
        // Notifications
        const notificationsBtn = document.getElementById('notifications-btn');
        if (notificationsBtn) {
            notificationsBtn.addEventListener('click', () => this.showNotifications());
        }
        
        // Export analytics
        const exportBtn = document.getElementById('export-analytics-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportAnalytics());
        }
        
        // Complaint card clicks
        document.addEventListener('click', (e) => {
            const complaintCard = e.target.closest('.complaint-card');
            if (complaintCard && !e.target.closest('button')) {
                e.preventDefault();
                const complaintId = complaintCard.getAttribute('data-complaint-id');
                this.showComplaintModal(complaintId);
            }
        });
        
        // Status update buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('status-btn')) {
                e.preventDefault();
                const status = parseInt(e.target.getAttribute('data-status'));
                if (this.currentComplaint) {
                    this.updateComplaintStatus(this.currentComplaint.id, status);
                }
            }
        });
    }
    
    bindAccessibilityEvents() {
        // Accessibility toggle
        const accessibilityToggle = document.getElementById('accessibility-toggle');
        const accessibilityDropdown = document.getElementById('accessibility-dropdown');
        
        if (accessibilityToggle && accessibilityDropdown) {
            accessibilityToggle.addEventListener('click', () => {
                const isExpanded = accessibilityToggle.getAttribute('aria-expanded') === 'true';
                accessibilityToggle.setAttribute('aria-expanded', !isExpanded);
                accessibilityDropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!accessibilityToggle.contains(e.target) && !accessibilityDropdown.contains(e.target)) {
                    accessibilityToggle.setAttribute('aria-expanded', 'false');
                    accessibilityDropdown.classList.remove('active');
                }
            });
        }
        
        // High contrast toggle
        const highContrastToggle = document.getElementById('high-contrast-toggle');
        if (highContrastToggle) {
            highContrastToggle.checked = this.accessibilitySettings.highContrast;
            highContrastToggle.addEventListener('change', (e) => {
                this.accessibilitySettings.highContrast = e.target.checked;
                this.applyAccessibilitySettings();
                this.saveAccessibilitySettings();
            });
        }
        
        // Font size control
        const fontSizeControl = document.getElementById('font-size-control');
        if (fontSizeControl) {
            fontSizeControl.value = this.accessibilitySettings.fontSize;
            fontSizeControl.addEventListener('change', (e) => {
                this.accessibilitySettings.fontSize = e.target.value;
                this.applyAccessibilitySettings();
                this.saveAccessibilitySettings();
            });
        }
    }
    
    bindFeedbackEvents() {
        // Star rating
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('star') && e.target.hasAttribute('data-rating')) {
                const rating = parseInt(e.target.getAttribute('data-rating'));
                this.selectRating(rating);
            }
        });
        
        // Submit feedback
        const submitFeedbackBtn = document.getElementById('submit-feedback-btn');
        if (submitFeedbackBtn) {
            submitFeedbackBtn.addEventListener('click', () => this.submitFeedback());
        }
        
        // Skip feedback
        const skipFeedbackBtn = document.getElementById('skip-feedback-btn');
        if (skipFeedbackBtn) {
            skipFeedbackBtn.addEventListener('click', () => this.closeFeedbackModal());
        }
        
        // Close feedback modal
        const feedbackModalClose = document.getElementById('feedback-modal-close');
        if (feedbackModalClose) {
            feedbackModalClose.addEventListener('click', () => this.closeFeedbackModal());
        }
    }
    
    bindFilterEvents() {
        const categoryFilter = document.getElementById('category-filter');
        const priorityFilter = document.getElementById('priority-filter');
        const statusFilter = document.getElementById('status-filter');
        const searchFilter = document.getElementById('search-filter');
        
        if (categoryFilter) categoryFilter.addEventListener('change', () => this.applyFilters());
        if (priorityFilter) priorityFilter.addEventListener('change', () => this.applyFilters());
        if (statusFilter) statusFilter.addEventListener('change', () => this.applyFilters());
        if (searchFilter) searchFilter.addEventListener('input', () => this.applyFilters());
    }
    
    bindModalEvents() {
        // Close modals
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-close-modal')) {
                e.preventDefault();
                this.closeModal();
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeFeedbackModal();
                this.closeNotificationsModal();
            }
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch (e.key.toLowerCase()) {
                    case 'd':
                        e.preventDefault();
                        this.navigate('dashboard');
                        break;
                    case 'c':
                        e.preventDefault();
                        this.navigate('complaints');
                        break;
                    case 'n':
                        e.preventDefault();
                        this.showNotifications();
                        break;
                    case 's':
                        e.preventDefault();
                        if (this.currentUser && this.currentUser.role === 'Student') {
                            this.navigate('submit');
                        }
                        break;
                    case 'a':
                        e.preventDefault();
                        if (this.currentUser && this.currentUser.role === 'Admin') {
                            this.navigate('analytics');
                        }
                        break;
                }
            }
        });
    }
    
    applyAccessibilitySettings() {
        const body = document.body;
        
        // High contrast
        if (this.accessibilitySettings.highContrast) {
            body.classList.add('high-contrast');
        } else {
            body.classList.remove('high-contrast');
        }
        
        // Font size
        body.classList.remove('large-text', 'larger-text');
        if (this.accessibilitySettings.fontSize === 'large') {
            body.classList.add('large-text');
        } else if (this.accessibilitySettings.fontSize === 'larger') {
            body.classList.add('larger-text');
        }
    }
    
    switchLanguage(language) {
        this.currentLanguage = language;
        this.saveLanguageSettings();
        this.updateLanguageTexts();
        
        // Update page direction for RTL languages
        if (language === 'hi') {
            document.dir = 'ltr'; // Hindi uses LTR, but keeping this for extensibility
        } else {
            document.dir = 'ltr';
        }
        
        this.showToast(this.t('language') + ' ' + (language === 'hi' ? 'हिंदी' : 'English'), 'success');
    }
    
    updateLanguageTexts() {
        // Update all text elements with translation keys
        const elements = document.querySelectorAll('[id]');
        elements.forEach(element => {
            const id = element.id;
            
            // Map element IDs to translation keys
            const translations = {
                'loading-text': 'loading',
                'login-title': 'title',
                'email-label': 'email',
                'password-label': 'password',
                'role-label': 'role',
                'student-option': 'student',
                'staff-option': 'staff',
                'admin-option': 'admin',
                'login-btn': 'login',
                'nav-dashboard-text': 'dashboard',
                'nav-complaints-text': 'complaints',
                'nav-submit-text': 'submit_complaint',
                'nav-analytics-text': 'analytics',
                'nav-profile-text': 'profile',
                'logout-text': 'logout',
                'dashboard-title': 'dashboard',
                'total-complaints-label': 'total_complaints',
                'pending-complaints-label': 'pending',
                'progress-complaints-label': 'in_progress',
                'resolved-complaints-label': 'resolved',
                'recent-complaints-title': 'recent_complaints',
                'view-all-btn': 'view_all',
                'complaints-title': 'complaints',
                'new-complaint-btn': 'new_complaint',
                'category-filter-label': 'category',
                'priority-filter-label': 'priority',
                'status-filter-label': 'status',
                'search-filter-label': 'search',
                'submit-title': 'submit_complaint',
                'complaint-title-label': 'title',
                'complaint-category-label': 'category',
                'complaint-priority-label': 'priority',
                'complaint-description-label': 'description',
                'cancel-btn': 'cancel',
                'submit-complaint-btn': 'submit',
                'analytics-title': 'analytics',
                'export-text': 'export',
                'feedback-modal-title': 'rate_experience',
                'submit-feedback-btn': 'submit_feedback'
            };
            
            if (translations[id]) {
                const key = translations[id];
                const translation = this.t(key);
                
                if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                    if (element.type === 'submit' || element.tagName === 'BUTTON') {
                        element.textContent = translation;
                    } else {
                        element.placeholder = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update option texts
        const options = document.querySelectorAll('option');
        options.forEach(option => {
            const id = option.id;
            const translations = {
                'select-role-option': 'select_role',
                'all-categories-option': 'all_categories',
                'all-priorities-option': 'all_priorities',
                'all-status-option': 'all_status',
                'select-category-option': 'select_category',
                'select-priority-option': 'select_priority'
            };
            
            if (translations[id]) {
                option.textContent = this.t(translations[id]);
            }
        });
        
        // Update placeholders
        const searchInput = document.getElementById('search-filter');
        if (searchInput) {
            searchInput.placeholder = this.t('search') + ' ' + this.t('complaints').toLowerCase() + '...';
        }
    }
    
    hideLoading() {
        const loadingEl = document.getElementById('loading');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
    }
    
    showLogin() {
        console.log('Showing login page');
        const loginPage = document.getElementById('login-page');
        const mainApp = document.getElementById('main-app');
        
        if (loginPage) loginPage.classList.remove('hidden');
        if (mainApp) mainApp.classList.add('hidden');
        
        this.updateLanguageTexts();
    }
    
    showMainApp() {
        console.log('Showing main app');
        const loginPage = document.getElementById('login-page');
        const mainApp = document.getElementById('main-app');
        
        if (loginPage) loginPage.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        
        this.updateUserInfo();
        this.updateRoleVisibility();
        this.populateFormOptions();
        this.updateLanguageTexts();
        this.updateNotificationCount();
    }
    
    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value.trim();
        const role = document.getElementById('role')?.value;
        
        if (!email || !password || !role) {
            this.showToast(this.t('please_fill_all_fields'), 'error');
            return;
        }
        
        const user = this.users.find(u => 
            u.email === email && 
            u.password === password && 
            u.role === role
        );
        
        if (user) {
            this.currentUser = user;
            this.saveUserSession();
            this.showMainApp();
            this.navigate('dashboard');
            this.showToast(this.t('login_successful') + ' ' + user.name, 'success');
        } else {
            this.showToast(this.t('invalid_credentials'), 'error');
        }
    }
    
    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showLogin();
        this.showToast(this.t('logout') + ' ' + this.t('successful'), 'success');
        
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.reset();
        }
    }
    
    updateUserInfo() {
        if (this.currentUser) {
            const elements = {
                'user-name': this.currentUser.name,
                'user-role': this.currentUser.role,
                'profile-name': this.currentUser.name,
                'profile-email': this.currentUser.email,
                'profile-role': this.currentUser.role
            };
            
            Object.entries(elements).forEach(([id, value]) => {
                const element = document.getElementById(id);
                if (element) element.textContent = value;
            });
            
            // Update avatar initials
            const avatarInitials = document.getElementById('avatar-initials');
            if (avatarInitials) {
                const initials = this.currentUser.name.split(' ').map(n => n[0]).join('');
                avatarInitials.textContent = initials;
            }
        }
    }
    
    updateRoleVisibility() {
        if (this.currentUser) {
            document.body.setAttribute('data-role', this.currentUser.role);
        }
    }
    
    populateFormOptions() {
        // Categories
        const categorySelects = document.querySelectorAll('#complaint-category, #category-filter');
        categorySelects.forEach(select => {
            const isFilter = select.id === 'category-filter';
            select.innerHTML = isFilter ? 
                `<option value="">${this.t('all_categories')}</option>` : 
                `<option value="">${this.t('select_category')}</option>`;
            
            this.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                const name = this.currentLanguage === 'hi' ? category.nameHi : category.name;
                option.textContent = `${category.icon} ${name}`;
                select.appendChild(option);
            });
        });
        
        // Priorities
        const prioritySelects = document.querySelectorAll('#complaint-priority, #priority-filter');
        prioritySelects.forEach(select => {
            const isFilter = select.id === 'priority-filter';
            select.innerHTML = isFilter ? 
                `<option value="">${this.t('all_priorities')}</option>` : 
                `<option value="">${this.t('select_priority')}</option>`;
            
            this.priorities.forEach(priority => {
                const option = document.createElement('option');
                option.value = priority.id;
                const name = this.currentLanguage === 'hi' ? priority.nameHi : priority.name;
                option.textContent = name;
                select.appendChild(option);
            });
        });
        
        // Status filter
        const statusFilter = document.getElementById('status-filter');
        if (statusFilter) {
            statusFilter.innerHTML = `<option value="">${this.t('all_status')}</option>`;
            this.statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status.id;
                const name = this.currentLanguage === 'hi' ? status.nameHi : status.name;
                option.textContent = name;
                statusFilter.appendChild(option);
            });
        }
    }
    
    navigate(route) {
        console.log('Navigating to:', route);
        
        // Update navigation active state
        document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(link => {
            link.classList.remove('active');
        });
        
        document.querySelectorAll(`[data-route="${route}"]`).forEach(link => {
            link.classList.add('active');
        });
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
        });
        
        // Show target page
        const targetPage = document.getElementById(`${route}-page`);
        if (targetPage) {
            targetPage.classList.remove('hidden');
        }
        
        this.currentRoute = route;
        
        // Load page content
        switch (route) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'complaints':
                this.loadComplaints();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
            case 'submit':
                this.resetComplaintForm();
                break;
        }
        
        // Close mobile nav
        const navToggle = document.getElementById('nav-mobile-toggle');
        const navLinks = document.getElementById('nav-links');
        if (navToggle && navLinks) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
    
    loadDashboard() {
        this.updateStatistics();
        this.loadRecentComplaints();
        
        // Load quick analytics charts for admin
        if (this.currentUser && this.currentUser.role === 'Admin') {
            setTimeout(() => {
                this.loadQuickCharts();
            }, 100);
        }
    }
    
    loadQuickCharts() {
        this.createMonthlyTrendsChart('monthly-trends-chart');
        this.createSatisfactionChart('satisfaction-chart');
    }
    
    loadAnalytics() {
        if (this.currentUser && this.currentUser.role === 'Admin') {
            this.updateAnalyticsStats();
            setTimeout(() => {
                this.loadAnalyticsCharts();
                this.loadPerformanceTable();
            }, 100);
        }
    }
    
    loadAnalyticsCharts() {
        this.createDetailedTrendsChart();
        this.createCategoryChart();
        this.createSatisfactionBreakdownChart();
    }
    
    createMonthlyTrendsChart(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }
        
        const data = [
            {"month": "Apr", "submitted": 15, "resolved": 12, "avgRating": 4.2},
            {"month": "May", "submitted": 22, "resolved": 20, "avgRating": 4.3},
            {"month": "Jun", "submitted": 18, "resolved": 16, "avgRating": 4.1},
            {"month": "Jul", "submitted": 25, "resolved": 21, "avgRating": 4.4},
            {"month": "Aug", "submitted": 32, "resolved": 28, "avgRating": 4.2},
            {"month": "Sep", "submitted": 28, "resolved": 22, "avgRating": 4.5}
        ];
        
        this.charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.month),
                datasets: [{
                    label: 'Submitted',
                    data: data.map(d => d.submitted),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Resolved',
                    data: data.map(d => d.resolved),
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#f5f5f5'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#a7a9a9' },
                        grid: { color: 'rgba(167, 169, 169, 0.1)' }
                    },
                    y: {
                        ticks: { color: '#a7a9a9' },
                        grid: { color: 'rgba(167, 169, 169, 0.1)' }
                    }
                }
            }
        });
    }
    
    createSatisfactionChart(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }
        
        this.charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
                datasets: [{
                    data: [102, 89, 35, 12, 7],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#f5f5f5',
                            padding: 15
                        }
                    }
                }
            }
        });
    }
    
    createDetailedTrendsChart() {
        const canvas = document.getElementById('detailed-trends-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.charts['detailed-trends']) {
            this.charts['detailed-trends'].destroy();
        }
        
        const data = [
            {"month": "Apr", "submitted": 15, "resolved": 12, "avgRating": 4.2},
            {"month": "May", "submitted": 22, "resolved": 20, "avgRating": 4.3},
            {"month": "Jun", "submitted": 18, "resolved": 16, "avgRating": 4.1},
            {"month": "Jul", "submitted": 25, "resolved": 21, "avgRating": 4.4},
            {"month": "Aug", "submitted": 32, "resolved": 28, "avgRating": 4.2},
            {"month": "Sep", "submitted": 28, "resolved": 22, "avgRating": 4.5}
        ];
        
        this.charts['detailed-trends'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.month),
                datasets: [{
                    label: 'Submitted',
                    data: data.map(d => d.submitted),
                    backgroundColor: '#1FB8CD',
                    yAxisID: 'y'
                }, {
                    label: 'Resolved',
                    data: data.map(d => d.resolved),
                    backgroundColor: '#FFC185',
                    yAxisID: 'y'
                }, {
                    label: 'Avg Rating',
                    data: data.map(d => d.avgRating),
                    type: 'line',
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    yAxisID: 'y1',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#f5f5f5'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#a7a9a9' },
                        grid: { color: 'rgba(167, 169, 169, 0.1)' }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: { color: '#a7a9a9' },
                        grid: { color: 'rgba(167, 169, 169, 0.1)' }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        ticks: { color: '#a7a9a9' },
                        grid: { drawOnChartArea: false }
                    }
                }
            }
        });
    }
    
    createCategoryChart() {
        const canvas = document.getElementById('category-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.charts['category']) {
            this.charts['category'].destroy();
        }
        
        this.charts['category'] = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: this.categories.map(c => this.currentLanguage === 'hi' ? c.nameHi : c.name),
                datasets: [{
                    data: [25, 18, 15, 12, 10, 8, 7, 5],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#f5f5f5',
                            padding: 10
                        }
                    }
                }
            }
        });
    }
    
    createSatisfactionBreakdownChart() {
        const canvas = document.getElementById('satisfaction-breakdown-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.charts['satisfaction-breakdown']) {
            this.charts['satisfaction-breakdown'].destroy();
        }
        
        this.charts['satisfaction-breakdown'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
                datasets: [{
                    label: 'Count',
                    data: [7, 12, 35, 89, 102],
                    backgroundColor: ['#DB4545', '#D2BA4C', '#964325', '#FFC185', '#1FB8CD']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#a7a9a9' },
                        grid: { color: 'rgba(167, 169, 169, 0.1)' }
                    },
                    y: {
                        ticks: { color: '#a7a9a9' },
                        grid: { color: 'rgba(167, 169, 169, 0.1)' }
                    }
                }
            }
        });
    }
    
    updateStatistics() {
        const userComplaints = this.getUserComplaints();
        
        const stats = {
            total: userComplaints.length,
            pending: userComplaints.filter(c => c.status === 1).length,
            progress: userComplaints.filter(c => c.status === 2).length,
            resolved: userComplaints.filter(c => c.status === 3).length
        };
        
        const elements = {
            'total-complaints': stats.total,
            'pending-complaints': stats.pending,
            'progress-complaints': stats.progress,
            'resolved-complaints': stats.resolved
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }
    
    updateAnalyticsStats() {
        const elements = {
            'overall-rating': '4.3',
            'resolution-rate': '84%',
            'avg-resolution-time': '2.3'
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
        
        // Update star display
        this.updateStarDisplay('overall-stars', 4.3);
    }
    
    updateStarDisplay(elementId, rating) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.textContent = '★';
            if (i <= Math.floor(rating)) {
                star.classList.add('filled');
            } else if (i - 0.5 <= rating) {
                star.classList.add('half');
            } else {
                star.classList.add('empty');
            }
            element.appendChild(star);
        }
    }
    
    loadPerformanceTable() {
        const tbody = document.getElementById('performance-table-body');
        if (!tbody) return;
        
        const departments = [
            { name: 'IT Department', complaints: 45, resolved: 38, avgTime: '1.8 days', rating: 4.2 },
            { name: 'Hostel Administration', complaints: 32, resolved: 28, avgTime: '2.1 days', rating: 4.0 },
            { name: 'Mess Management', complaints: 28, resolved: 25, avgTime: '1.5 days', rating: 4.4 },
            { name: 'Academic Affairs', complaints: 22, resolved: 20, avgTime: '3.2 days', rating: 3.8 },
            { name: 'Maintenance', complaints: 35, resolved: 30, avgTime: '2.8 days', rating: 4.1 }
        ];
        
        tbody.innerHTML = '';
        departments.forEach(dept => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${dept.name}</td>
                <td>${dept.complaints}</td>
                <td>${dept.resolved}</td>
                <td>${dept.avgTime}</td>
                <td>
                    <div class="rating-display">
                        <span>${dept.rating}</span>
                        <div class="star-display">
                            ${this.generateStarHTML(dept.rating)}
                        </div>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    generateStarHTML(rating) {
        let html = '';
        for (let i = 1; i <= 5; i++) {
            const filled = i <= Math.floor(rating);
            html += `<span class="star ${filled ? 'filled' : 'empty'}">★</span>`;
        }
        return html;
    }
    
    loadRecentComplaints() {
        const userComplaints = this.getUserComplaints();
        const recentComplaints = userComplaints
            .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
            .slice(0, 5);
        
        const container = document.getElementById('recent-complaints');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (recentComplaints.length === 0) {
            container.innerHTML = `<p style="color: var(--color-text-secondary); text-align: center; padding: 2rem;">${this.t('no_complaints')}</p>`;
            return;
        }
        
        recentComplaints.forEach(complaint => {
            const complaintCard = this.createComplaintCard(complaint);
            container.appendChild(complaintCard);
        });
    }
    
    getUserComplaints() {
        if (this.currentUser && this.currentUser.role === 'Student') {
            return this.complaints.filter(c => c.submittedBy === this.currentUser.id);
        } else {
            return this.complaints;
        }
    }
    
    loadComplaints() {
        this.renderComplaints();
    }
    
    renderComplaints() {
        const userComplaints = this.getUserComplaints();
        const filteredComplaints = this.applyFiltersToComplaints(userComplaints);
        
        const container = document.getElementById('complaints-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (filteredComplaints.length === 0) {
            container.innerHTML = `<p style="color: var(--color-text-secondary); text-align: center; padding: 2rem;">${this.t('no_complaints')}</p>`;
            return;
        }
        
        filteredComplaints.forEach(complaint => {
            const complaintCard = this.createComplaintCard(complaint);
            container.appendChild(complaintCard);
        });
    }
    
    applyFilters() {
        if (this.currentRoute === 'complaints') {
            this.renderComplaints();
        }
    }
    
    applyFiltersToComplaints(complaints) {
        const categoryFilter = document.getElementById('category-filter');
        const priorityFilter = document.getElementById('priority-filter');
        const statusFilter = document.getElementById('status-filter');
        const searchFilter = document.getElementById('search-filter');
        
        let filtered = [...complaints];
        
        if (categoryFilter && categoryFilter.value) {
            filtered = filtered.filter(c => c.category === parseInt(categoryFilter.value));
        }
        
        if (priorityFilter && priorityFilter.value) {
            filtered = filtered.filter(c => c.priority === parseInt(priorityFilter.value));
        }
        
        if (statusFilter && statusFilter.value) {
            filtered = filtered.filter(c => c.status === parseInt(statusFilter.value));
        }
        
        if (searchFilter && searchFilter.value.trim()) {
            const searchTerm = searchFilter.value.toLowerCase();
            filtered = filtered.filter(c => 
                c.title.toLowerCase().includes(searchTerm) ||
                c.description.toLowerCase().includes(searchTerm) ||
                c.id.toLowerCase().includes(searchTerm)
            );
        }
        
        return filtered.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    }
    
    createComplaintCard(complaint) {
        const category = this.categories.find(c => c.id === complaint.category);
        const priority = this.priorities.find(p => p.id === complaint.priority);
        const status = this.statuses.find(s => s.id === complaint.status);
        
        const card = document.createElement('div');
        card.className = 'complaint-card';
        card.setAttribute('data-complaint-id', complaint.id);
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Complaint ${complaint.id}: ${complaint.title}`);
        
        const categoryName = category ? (this.currentLanguage === 'hi' ? category.nameHi : category.name) : 'Unknown';
        const priorityName = priority ? (this.currentLanguage === 'hi' ? priority.nameHi : priority.name) : 'Unknown';
        const statusName = status ? (this.currentLanguage === 'hi' ? status.nameHi : status.name) : 'Unknown';
        
        card.innerHTML = `
            <div class="complaint-header">
                <h3 class="complaint-title">${this.escapeHtml(complaint.title)}</h3>
                <span class="complaint-id">${complaint.id}</span>
            </div>
            <div class="complaint-meta">
                <span class="complaint-date">${this.formatDate(complaint.submittedAt)}</span>
            </div>
            <p class="complaint-description">${this.escapeHtml(complaint.description)}</p>
            <div class="complaint-badges">
                <span class="badge category-badge">
                    ${category ? category.icon : '❓'} ${categoryName}
                </span>
                <span class="badge priority-badge ${priority ? priority.name.toLowerCase() : 'low'}">${priorityName}</span>
                <span class="badge status-badge ${status ? status.name.toLowerCase().replace(' ', '-') : 'submitted'}">${statusName}</span>
            </div>
        `;
        
        // Add keyboard support
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.showComplaintModal(complaint.id);
            }
        });
        
        return card;
    }
    
    handleComplaintSubmit(e) {
        e.preventDefault();
        
        const titleEl = document.getElementById('complaint-title');
        const categoryEl = document.getElementById('complaint-category');
        const priorityEl = document.getElementById('complaint-priority');
        const descriptionEl = document.getElementById('complaint-description');
        
        if (!titleEl || !categoryEl || !priorityEl || !descriptionEl) {
            this.showToast('Form error. Please refresh and try again.', 'error');
            return;
        }
        
        const title = titleEl.value.trim();
        const category = parseInt(categoryEl.value);
        const priority = parseInt(priorityEl.value);
        const description = descriptionEl.value.trim();
        
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => error.textContent = '');
        
        let hasErrors = false;
        
        if (!title) {
            document.getElementById('title-error').textContent = 'Title is required';
            hasErrors = true;
        }
        
        if (!category) {
            document.getElementById('category-error').textContent = 'Category is required';
            hasErrors = true;
        }
        
        if (!priority) {
            document.getElementById('priority-error').textContent = 'Priority is required';
            hasErrors = true;
        }
        
        if (!description) {
            document.getElementById('description-error').textContent = 'Description is required';
            hasErrors = true;
        }
        
        if (hasErrors) {
            this.showToast('Please fix the errors below', 'error');
            return;
        }
        
        const complaint = {
            id: 'COMP' + String(Date.now()).slice(-6),
            title,
            description,
            category,
            priority,
            status: 1,
            submittedBy: this.currentUser.id,
            submittedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            resolutionTime: null
        };
        
        this.complaints.push(complaint);
        this.saveComplaints();
        
        this.showToast(this.t('complaint_submitted'), 'success');
        this.navigate('complaints');
        
        // Add notification
        this.addNotification('info', 'Complaint Submitted', `Your complaint ${complaint.id} has been submitted successfully`);
        
        // Simulate status updates for demo
        setTimeout(() => {
            this.simulateStatusUpdates(complaint.id);
        }, 5000);
    }
    
    simulateStatusUpdates(complaintId) {
        setTimeout(() => {
            if (this.complaints.find(c => c.id === complaintId)) {
                this.updateComplaintStatus(complaintId, 2);
                this.addNotification('info', 'Status Update', `Complaint ${complaintId} is now in progress`);
            }
        }, 30000);
        
        setTimeout(() => {
            if (this.complaints.find(c => c.id === complaintId)) {
                this.updateComplaintStatus(complaintId, 3);
                this.addNotification('success', 'Complaint Resolved', `Complaint ${complaintId} has been resolved`);
                
                // Show feedback modal after resolution
                setTimeout(() => {
                    this.showFeedbackModal(complaintId);
                }, 2000);
            }
        }, 120000);
    }
    
    resetComplaintForm() {
        const form = document.getElementById('complaint-form');
        if (form) {
            form.reset();
            document.querySelectorAll('.form-error').forEach(error => error.textContent = '');
        }
    }
    
    showComplaintModal(complaintId) {
        const complaint = this.complaints.find(c => c.id === complaintId);
        if (!complaint) return;
        
        this.currentComplaint = complaint;
        
        const category = this.categories.find(c => c.id === complaint.category);
        const priority = this.priorities.find(p => p.id === complaint.priority);
        const status = this.statuses.find(s => s.id === complaint.status);
        
        // Update modal content
        const elements = {
            'modal-title': complaint.title,
            'modal-id': complaint.id,
            'modal-date': this.formatDate(complaint.submittedAt),
            'modal-description': complaint.description
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
        
        // Update badges
        const modalCategory = document.getElementById('modal-category');
        const modalPriority = document.getElementById('modal-priority');
        const modalStatus = document.getElementById('modal-status');
        
        if (modalCategory && category) {
            const categoryName = this.currentLanguage === 'hi' ? category.nameHi : category.name;
            modalCategory.innerHTML = `${category.icon} ${categoryName}`;
        }
        
        if (modalPriority && priority) {
            const priorityName = this.currentLanguage === 'hi' ? priority.nameHi : priority.name;
            modalPriority.className = `badge priority-badge ${priority.name.toLowerCase()}`;
            modalPriority.textContent = priorityName;
        }
        
        if (modalStatus && status) {
            const statusName = this.currentLanguage === 'hi' ? status.nameHi : status.name;
            modalStatus.className = `badge status-badge ${status.name.toLowerCase().replace(' ', '-')}`;
            modalStatus.textContent = statusName;
        }
        
        // Show feedback if exists
        this.displayFeedback(complaint.id);
        
        // Update progress tracker
        this.updateProgressTracker(complaint.status);
        
        // Show modal
        const modal = document.getElementById('complaint-modal');
        if (modal) {
            modal.classList.remove('hidden');
            
            // Focus management
            const closeButton = modal.querySelector('.modal-close');
            if (closeButton) {
                closeButton.focus();
            }
        }
    }
    
    displayFeedback(complaintId) {
        const feedback = this.feedbacks.find(f => f.complaintId === complaintId);
        const feedbackDisplay = document.getElementById('feedback-display');
        
        if (!feedbackDisplay) return;
        
        if (feedback) {
            feedbackDisplay.classList.remove('hidden');
            
            const feedbackStars = document.getElementById('feedback-stars');
            const feedbackRatingText = document.getElementById('feedback-rating-text');
            const feedbackComment = document.getElementById('feedback-comment');
            
            if (feedbackStars) {
                this.updateStarDisplay('feedback-stars', feedback.rating);
            }
            
            if (feedbackRatingText) {
                feedbackRatingText.textContent = `${feedback.rating}/5`;
            }
            
            if (feedbackComment) {
                feedbackComment.textContent = feedback.comment || 'No additional comments';
            }
        } else {
            feedbackDisplay.classList.add('hidden');
        }
    }
    
    updateProgressTracker(currentStatus) {
        const steps = document.querySelectorAll('.progress-step');
        steps.forEach(step => {
            const stepNumber = parseInt(step.getAttribute('data-step'));
            if (stepNumber <= currentStatus) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    closeModal() {
        const modals = document.querySelectorAll('.modal:not(.hidden)');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
        this.currentComplaint = null;
    }
    
    updateComplaintStatus(complaintId, newStatus) {
        const complaintIndex = this.complaints.findIndex(c => c.id === complaintId);
        if (complaintIndex === -1) return;
        
        this.complaints[complaintIndex].status = newStatus;
        this.complaints[complaintIndex].updatedAt = new Date().toISOString();
        
        // Calculate resolution time if resolved
        if (newStatus === 3 && !this.complaints[complaintIndex].resolutionTime) {
            const submitted = new Date(this.complaints[complaintIndex].submittedAt);
            const resolved = new Date();
            const timeDiff = (resolved - submitted) / (1000 * 60 * 60); // hours
            this.complaints[complaintIndex].resolutionTime = timeDiff;
        }
        
        this.saveComplaints();
        
        // Update UI
        if (this.currentRoute === 'dashboard') {
            this.loadDashboard();
        } else if (this.currentRoute === 'complaints') {
            this.renderComplaints();
        }
        
        // Update modal if open
        if (this.currentComplaint && this.currentComplaint.id === complaintId) {
            this.currentComplaint.status = newStatus;
            const status = this.statuses.find(s => s.id === newStatus);
            const modalStatus = document.getElementById('modal-status');
            if (modalStatus && status) {
                const statusName = this.currentLanguage === 'hi' ? status.nameHi : status.name;
                modalStatus.className = `badge status-badge ${status.name.toLowerCase().replace(' ', '-')}`;
                modalStatus.textContent = statusName;
            }
            this.updateProgressTracker(newStatus);
        }
        
        const statusName = this.statuses.find(s => s.id === newStatus)?.name || 'Unknown';
        this.showToast(`Complaint ${complaintId} updated to: ${statusName}`, 'success');
        
        // Show feedback modal if resolved
        if (newStatus === 3) {
            setTimeout(() => {
                this.showFeedbackModal(complaintId);
            }, 1500);
        }
    }
    
    // Feedback System
    showFeedbackModal(complaintId) {
        // Check if feedback already exists
        if (this.feedbacks.find(f => f.complaintId === complaintId)) {
            return;
        }
        
        this.currentFeedbackComplaint = complaintId;
        
        const modal = document.getElementById('feedback-modal');
        if (modal) {
            modal.classList.remove('hidden');
            
            // Reset form
            this.resetFeedbackForm();
            
            // Focus management
            const firstStar = modal.querySelector('.star[data-rating="1"]');
            if (firstStar) {
                firstStar.focus();
            }
        }
    }
    
    resetFeedbackForm() {
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('active');
        });
        
        const commentInput = document.getElementById('feedback-comment-input');
        if (commentInput) {
            commentInput.value = '';
        }
        
        const ratingDisplay = document.getElementById('rating-display');
        if (ratingDisplay) {
            ratingDisplay.textContent = '';
        }
        
        const submitBtn = document.getElementById('submit-feedback-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
        
        this.selectedRating = 0;
    }
    
    selectRating(rating) {
        this.selectedRating = rating;
        
        // Update visual feedback
        document.querySelectorAll('.star').forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
        
        // Update rating text
        const ratingDisplay = document.getElementById('rating-display');
        if (ratingDisplay) {
            const ratingTexts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
            ratingDisplay.textContent = `${rating}/5 - ${ratingTexts[rating]}`;
        }
        
        // Enable submit button
        const submitBtn = document.getElementById('submit-feedback-btn');
        if (submitBtn) {
            submitBtn.disabled = false;
        }
        
        // Announce to screen readers
        const announcement = `${rating} out of 5 stars selected`;
        this.announceToScreenReader(announcement);
    }
    
    submitFeedback() {
        if (!this.selectedRating || !this.currentFeedbackComplaint) {
            this.showToast('Please select a rating', 'error');
            return;
        }
        
        const commentInput = document.getElementById('feedback-comment-input');
        const comment = commentInput ? commentInput.value.trim() : '';
        
        const feedback = {
            complaintId: this.currentFeedbackComplaint,
            rating: this.selectedRating,
            comment: comment,
            submittedAt: new Date().toISOString(),
            submittedBy: this.currentUser.id
        };
        
        this.feedbacks.push(feedback);
        this.saveFeedbacks();
        
        this.showToast('Thank you for your feedback!', 'success');
        this.closeFeedbackModal();
        
        // Add notification
        this.addNotification('success', 'Feedback Submitted', 'Your feedback has been recorded successfully');
    }
    
    closeFeedbackModal() {
        const modal = document.getElementById('feedback-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentFeedbackComplaint = null;
        this.selectedRating = 0;
    }
    
    // Notifications System
    addNotification(type, title, message) {
        const notification = {
            id: 'not' + Date.now(),
            type,
            title,
            message,
            timestamp: new Date().toISOString(),
            read: false
        };
        
        this.notifications.unshift(notification);
        this.updateNotificationCount();
        
        // Keep only last 20 notifications
        if (this.notifications.length > 20) {
            this.notifications = this.notifications.slice(0, 20);
        }
    }
    
    updateNotificationCount() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const badge = document.getElementById('notification-count');
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'inline' : 'none';
        }
    }
    
    showNotifications() {
        const modal = document.getElementById('notifications-modal');
        const list = document.getElementById('notifications-list');
        
        if (!modal || !list) return;
        
        list.innerHTML = '';
        
        if (this.notifications.length === 0) {
            list.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">No notifications</p>';
        } else {
            this.notifications.forEach(notification => {
                const item = document.createElement('div');
                item.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
                item.innerHTML = `
                    <div class="notification-header">
                        <h4>${this.escapeHtml(notification.title)}</h4>
                        <span class="notification-time">${this.formatDate(notification.timestamp)}</span>
                    </div>
                    <p>${this.escapeHtml(notification.message)}</p>
                `;
                
                item.addEventListener('click', () => {
                    notification.read = true;
                    this.updateNotificationCount();
                    item.classList.add('read');
                    item.classList.remove('unread');
                });
                
                list.appendChild(item);
            });
        }
        
        modal.classList.remove('hidden');
        
        // Mark all as read after viewing
        setTimeout(() => {
            this.notifications.forEach(n => n.read = true);
            this.updateNotificationCount();
        }, 2000);
    }
    
    closeNotificationsModal() {
        const modal = document.getElementById('notifications-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    // Export functionality
    exportAnalytics() {
        const data = {
            complaints: this.complaints,
            feedbacks: this.feedbacks,
            statistics: {
                totalComplaints: this.complaints.length,
                resolvedComplaints: this.complaints.filter(c => c.status === 3).length,
                averageRating: this.calculateAverageRating(),
                averageResolutionTime: this.calculateAverageResolutionTime()
            },
            exportedAt: new Date().toISOString(),
            exportedBy: this.currentUser.name
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showToast('Analytics report exported successfully!', 'success');
    }
    
    calculateAverageRating() {
        if (this.feedbacks.length === 0) return 0;
        const total = this.feedbacks.reduce((sum, f) => sum + f.rating, 0);
        return (total / this.feedbacks.length).toFixed(1);
    }
    
    calculateAverageResolutionTime() {
        const resolvedComplaints = this.complaints.filter(c => c.status === 3 && c.resolutionTime);
        if (resolvedComplaints.length === 0) return 0;
        const total = resolvedComplaints.reduce((sum, c) => sum + c.resolutionTime, 0);
        return (total / resolvedComplaints.length / 24).toFixed(1); // Convert to days
    }
    
    // Utility functions
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString(this.currentLanguage === 'hi' ? 'hi-IN' : 'en-US') + 
                   ' ' + date.toLocaleTimeString(this.currentLanguage === 'hi' ? 'hi-IN' : 'en-US', 
                   {hour: '2-digit', minute:'2-digit'});
        } catch (e) {
            return 'Invalid date';
        }
    }
    
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
    
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        
        const container = document.getElementById('toast-container');
        if (container) {
            container.appendChild(toast);
            
            // Remove toast after 4 seconds
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 4000);
        } else {
            // Fallback to alert
            alert(message);
        }
    }
}

// Initialize the enhanced application
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new ComplaintManagementApp();
    });
} else {
    app = new ComplaintManagementApp();
}

// Additional accessibility and error handling
document.addEventListener('keydown', (e) => {
    // Global keyboard shortcuts
    if (e.key === 'Escape') {
        // Close any open modals
        document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
            modal.classList.add('hidden');
        });
        
        // Close accessibility dropdown
        const dropdown = document.getElementById('accessibility-dropdown');
        const toggle = document.getElementById('accessibility-toggle');
        if (dropdown && toggle) {
            dropdown.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// Form validation enhancement
document.addEventListener('blur', (e) => {
    if (e.target.classList.contains('form-control') && e.target.hasAttribute('required')) {
        const errorId = e.target.getAttribute('aria-describedby');
        const errorEl = errorId ? document.getElementById(errorId) : null;
        
        if (!e.target.value.trim()) {
            e.target.style.borderColor = 'var(--color-red-400)';
            if (errorEl) {
                errorEl.textContent = 'This field is required';
            }
        } else {
            e.target.style.borderColor = 'var(--color-teal-300)';
            if (errorEl) {
                errorEl.textContent = '';
            }
        }
    }
}, true);

// Reset border colors on focus
document.addEventListener('focus', (e) => {
    if (e.target.classList.contains('form-control')) {
        e.target.style.borderColor = '';
    }
}, true);

// Enhanced error boundary
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    if (app) {
        app.showToast('An error occurred. Please try again.', 'error');
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Enhanced app loaded in ${loadTime}ms`);
        }, 0);
    });
}

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('Service Worker support detected');
        // Service worker would be registered here in a full implementation
    });
}