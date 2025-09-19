// College Complaint Management System with Notification System - Main Application Logic

class ComplaintManagementApp {
    constructor() {
        this.currentUser = null;
        this.currentRoute = 'dashboard';
        this.complaints = [];
        this.categories = [];
        this.priorities = [];
        this.statuses = [];
        this.users = [];
        this.notifications = [];
        this.notificationTypes = [];
        this.broadcastTemplates = [];
        this.notificationPreferences = {
            email: true,
            sms: true,
            push: true,
            sound: true
        };
        this.currentComplaint = null;
        this.notificationSound = null;
        
        // Wait for DOM to be fully loaded before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        console.log('Initializing app...');
        this.loadMockData();
        this.loadUserSession();
        this.initNotificationSound();
        this.requestNotificationPermission();
        
        // Wait a bit for DOM to be ready
        setTimeout(() => {
            this.bindEvents();
            this.hideLoading();
            
            // Show login if no user session
            if (!this.currentUser) {
                this.showLogin();
            } else {
                this.showMainApp();
                this.navigate('dashboard');
                this.loadNotifications();
                this.updateNotificationBadge();
            }
        }, 500);
    }
    
    loadMockData() {
        console.log('Loading mock data...');
        // Mock users with notification preferences
        this.users = [
            {"email": "student@college.edu", "password": "demo123", "role": "Student", "name": "John Doe", "id": "STU001", "phone": "+91-9876543210", "notificationPrefs": {"email": true, "sms": true, "push": true}},
            {"email": "staff@college.edu", "password": "demo123", "role": "Staff", "name": "Jane Smith", "id": "STF001", "phone": "+91-9876543211", "notificationPrefs": {"email": true, "sms": false, "push": true}},
            {"email": "admin@college.edu", "password": "demo123", "role": "Admin", "name": "Admin User", "id": "ADM001", "phone": "+91-9876543212", "notificationPrefs": {"email": true, "sms": true, "push": true}}
        ];
        
        // Categories
        this.categories = [
            {"id": 1, "name": "WiFi", "icon": "📶", "color": "bg-blue-500"},
            {"id": 2, "name": "Hostel", "icon": "🏠", "color": "bg-purple-500"},
            {"id": 3, "name": "Food", "icon": "🍽️", "color": "bg-orange-500"},
            {"id": 4, "name": "Classroom", "icon": "🏫", "color": "bg-green-500"},
            {"id": 5, "name": "Maintenance", "icon": "🔧", "color": "bg-yellow-500"},
            {"id": 6, "name": "Academics", "icon": "📚", "color": "bg-indigo-500"},
            {"id": 7, "name": "Harassment", "icon": "⚠️", "color": "bg-red-500"},
            {"id": 8, "name": "Other", "icon": "❓", "color": "bg-gray-500"}
        ];
        
        // Priorities
        this.priorities = [
            {"id": 1, "name": "Urgent", "color": "bg-red-500", "textColor": "text-red-500"},
            {"id": 2, "name": "Medium", "color": "bg-orange-500", "textColor": "text-orange-500"},
            {"id": 3, "name": "Low", "color": "bg-green-500", "textColor": "text-green-500"}
        ];
        
        // Statuses
        this.statuses = [
            {"id": 1, "name": "Submitted", "color": "bg-blue-500", "textColor": "text-blue-500"},
            {"id": 2, "name": "In Progress", "color": "bg-yellow-500", "textColor": "text-yellow-500"},
            {"id": 3, "name": "Resolved", "color": "bg-green-500", "textColor": "text-green-500"}
        ];
        
        // Notification Types
        this.notificationTypes = [
            {"id": 1, "name": "Status Update", "icon": "🔄", "color": "text-blue-400"},
            {"id": 2, "name": "Broadcast", "icon": "📢", "color": "text-purple-400"},
            {"id": 3, "name": "System Alert", "icon": "⚠️", "color": "text-red-400"},
            {"id": 4, "name": "Welcome", "icon": "👋", "color": "text-green-400"}
        ];
        
        // Broadcast Templates
        this.broadcastTemplates = [
            {
                "id": 1,
                "title": "System Maintenance",
                "template": "The complaint portal will be under maintenance on {date} from {startTime} to {endTime}. Please plan accordingly."
            },
            {
                "id": 2,
                "title": "Holiday Notice",
                "template": "The college will be closed on {date} due to {reason}. All complaint processing will resume on {resumeDate}."
            },
            {
                "id": 3,
                "title": "New Feature Announcement",
                "template": "We're excited to announce a new feature: {featureName}. {description}"
            }
        ];
        
        // Load complaints from localStorage or use mock data
        const savedComplaints = localStorage.getItem('complaints');
        if (savedComplaints) {
            try {
                this.complaints = JSON.parse(savedComplaints);
            } catch (e) {
                console.error('Error loading saved complaints:', e);
                this.complaints = this.getDefaultComplaints();
            }
        } else {
            this.complaints = this.getDefaultComplaints();
            this.saveComplaints();
        }
        
        // Load notifications from localStorage or use mock data
        const savedNotifications = localStorage.getItem('notifications');
        if (savedNotifications) {
            try {
                this.notifications = JSON.parse(savedNotifications);
            } catch (e) {
                console.error('Error loading saved notifications:', e);
                this.notifications = this.getDefaultNotifications();
            }
        } else {
            this.notifications = this.getDefaultNotifications();
            this.saveNotifications();
        }
    }
    
    getDefaultComplaints() {
        return [
            {
                "id": "COMP001",
                "title": "WiFi not working in Block A",
                "description": "The WiFi connection is very slow and keeps disconnecting in Block A hostel rooms.",
                "category": 1,
                "priority": 1,
                "status": 2,
                "submittedBy": "STU001",
                "submittedAt": "2025-09-19T08:30:00Z",
                "updatedAt": "2025-09-19T10:15:00Z"
            },
            {
                "id": "COMP002",
                "title": "Mess food quality poor",
                "description": "The food quality in the mess has deteriorated significantly over the past week.",
                "category": 3,
                "priority": 2,
                "status": 1,
                "submittedBy": "STU001",
                "submittedAt": "2025-09-18T14:20:00Z",
                "updatedAt": "2025-09-18T14:20:00Z"
            },
            {
                "id": "COMP003",
                "title": "AC not working in Room 101",
                "description": "The air conditioning unit in classroom 101 has been malfunctioning for 3 days.",
                "category": 4,
                "priority": 2,
                "status": 3,
                "submittedBy": "STU001",
                "submittedAt": "2025-09-17T09:15:00Z",
                "updatedAt": "2025-09-19T11:00:00Z"
            },
            {
                "id": "COMP004",
                "title": "Water leakage in hostel bathroom",
                "description": "There is a continuous water leakage from the ceiling in Block B bathroom.",
                "category": 5,
                "priority": 1,
                "status": 2,
                "submittedBy": "STU001",
                "submittedAt": "2025-09-19T07:45:00Z",
                "updatedAt": "2025-09-19T09:30:00Z"
            },
            {
                "id": "COMP005",
                "title": "Missing assignment submission portal",
                "description": "Cannot find the assignment submission link for Advanced Programming course.",
                "category": 6,
                "priority": 2,
                "status": 1,
                "submittedBy": "STU001",
                "submittedAt": "2025-09-19T11:00:00Z",
                "updatedAt": "2025-09-19T11:00:00Z"
            }
        ];
    }
    
    getDefaultNotifications() {
        return [
            {
                "id": "NOT001",
                "type": 1,
                "title": "Complaint Status Updated",
                "message": "Your complaint #COMP001 (WiFi not working in Block A) status has been updated to In Progress",
                "timestamp": "2025-09-19T10:15:00Z",
                "isRead": false,
                "userId": "STU001",
                "relatedComplaint": "COMP001"
            },
            {
                "id": "NOT002",
                "type": 2,
                "title": "System Maintenance Notice",
                "message": "The complaint portal will be under maintenance on Saturday 21st Sept from 2 AM to 4 AM. Please plan accordingly.",
                "timestamp": "2025-09-19T09:00:00Z",
                "isRead": true,
                "userId": "all",
                "priority": "Medium"
            },
            {
                "id": "NOT003",
                "type": 4,
                "title": "Welcome to the Portal",
                "message": "Welcome to the College Complaint Management System! You can now submit and track your complaints easily.",
                "timestamp": "2025-09-19T08:00:00Z",
                "isRead": false,
                "userId": "STU001"
            }
        ];
    }
    
    loadUserSession() {
        try {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
                console.log('Loaded user session:', this.currentUser);
                
                // Load user notification preferences
                const savedPrefs = localStorage.getItem(`notificationPrefs_${this.currentUser.id}`);
                if (savedPrefs) {
                    this.notificationPreferences = JSON.parse(savedPrefs);
                }
            }
        } catch (e) {
            console.error('Error loading user session:', e);
            localStorage.removeItem('currentUser');
        }
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
    
    saveNotifications() {
        try {
            localStorage.setItem('notifications', JSON.stringify(this.notifications));
        } catch (e) {
            console.error('Error saving notifications:', e);
        }
    }
    
    saveNotificationPreferences() {
        try {
            localStorage.setItem(`notificationPrefs_${this.currentUser.id}`, JSON.stringify(this.notificationPreferences));
        } catch (e) {
            console.error('Error saving notification preferences:', e);
        }
    }
    
    initNotificationSound() {
        // Create a simple notification sound using Web Audio API
        this.notificationSound = {
            play: () => {
                if (!this.notificationPreferences.sound) return;
                
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
                    
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.3);
                } catch (e) {
                    console.warn('Could not play notification sound:', e);
                }
            }
        };
    }
    
    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
    
    bindEvents() {
        console.log('Binding events...');
        
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e);
            });
        }
        
        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-route')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                this.navigate(route);
            }
        });
        
        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            console.log('Logout button found, binding click event');
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Logout button clicked');
                this.handleLogout();
            });
        } else {
            console.warn('Logout button not found');
        }
        
        // Notification Bell
        const notificationBell = document.getElementById('notification-bell');
        if (notificationBell) {
            notificationBell.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleNotificationDropdown();
            });
        }
        
        // Mark all notifications as read
        const markAllReadBtn = document.getElementById('mark-all-read');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', () => {
                this.markAllNotificationsAsRead();
            });
        }
        
        // Close notification dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('notification-dropdown');
            if (dropdown && !dropdown.contains(e.target) && !e.target.closest('#notification-bell')) {
                dropdown.classList.remove('show');
            }
        });
        
        // Complaint form
        const complaintForm = document.getElementById('complaint-form');
        if (complaintForm) {
            complaintForm.addEventListener('submit', (e) => this.handleComplaintSubmit(e));
        }
        
        // Broadcast form
        const broadcastForm = document.getElementById('broadcast-form');
        if (broadcastForm) {
            broadcastForm.addEventListener('submit', (e) => this.handleBroadcastSubmit(e));
        }
        
        // Preview broadcast
        const previewBroadcastBtn = document.getElementById('preview-broadcast');
        if (previewBroadcastBtn) {
            previewBroadcastBtn.addEventListener('click', () => this.previewBroadcast());
        }
        
        // Confirm broadcast
        const confirmBroadcastBtn = document.getElementById('confirm-broadcast');
        if (confirmBroadcastBtn) {
            confirmBroadcastBtn.addEventListener('click', () => this.sendBroadcast());
        }
        
        // Broadcast templates
        const broadcastTemplateSelect = document.getElementById('broadcast-template');
        if (broadcastTemplateSelect) {
            broadcastTemplateSelect.addEventListener('change', (e) => {
                this.populateBroadcastTemplate(e.target.value);
            });
        }
        
        // Notification settings
        const saveSettingsBtn = document.getElementById('save-settings');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        }
        
        const testNotificationsBtn = document.getElementById('test-notifications');
        if (testNotificationsBtn) {
            testNotificationsBtn.addEventListener('click', () => this.testNotifications());
        }
        
        // Notification tabs
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                this.switchNotificationTab(e.target.getAttribute('data-tab'));
            }
        });
        
        // Filters - bind immediately after a delay to ensure elements exist
        setTimeout(() => {
            this.bindFilterEvents();
        }, 100);
        
        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-close-modal')) {
                e.preventDefault();
                this.closeModal();
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
        
        // Complaint card clicks
        document.addEventListener('click', (e) => {
            const complaintCard = e.target.closest('.complaint-card');
            if (complaintCard && !e.target.closest('button')) {
                e.preventDefault();
                const complaintId = complaintCard.getAttribute('data-complaint-id');
                this.showComplaintModal(complaintId);
            }
        });
        
        // Notification item clicks
        document.addEventListener('click', (e) => {
            const notificationItem = e.target.closest('.notification-item');
            if (notificationItem) {
                const notificationId = notificationItem.getAttribute('data-notification-id');
                this.handleNotificationClick(notificationId);
            }
        });
        
        // Toast close buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('toast-close')) {
                const toast = e.target.closest('.toast');
                if (toast) {
                    this.removeToast(toast);
                }
            }
        });
        
        console.log('Events bound successfully');
    }
    
    bindFilterEvents() {
        const categoryFilter = document.getElementById('category-filter');
        const priorityFilter = document.getElementById('priority-filter');
        const statusFilter = document.getElementById('status-filter');
        const searchFilter = document.getElementById('search-filter');
        
        if (categoryFilter) {
            console.log('Binding category filter');
            categoryFilter.addEventListener('change', () => this.applyFilters());
        }
        if (priorityFilter) {
            console.log('Binding priority filter');
            priorityFilter.addEventListener('change', () => this.applyFilters());
        }
        if (statusFilter) {
            console.log('Binding status filter');
            statusFilter.addEventListener('change', () => this.applyFilters());
        }
        if (searchFilter) {
            console.log('Binding search filter');
            searchFilter.addEventListener('input', () => this.applyFilters());
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
    }
    
    showMainApp() {
        console.log('Showing main app');
        const loginPage = document.getElementById('login-page');
        const mainApp = document.getElementById('main-app');
        
        if (loginPage) loginPage.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        
        this.updateUserInfo();
        this.updateRoleVisibility();
        
        // Populate form options immediately
        setTimeout(() => {
            this.populateFormOptions();
            this.populateBroadcastTemplates();
            this.loadNotificationSettings();
        }, 100);
        
        // Send welcome notification for new users
        if (!this.hasWelcomeNotification()) {
            this.sendWelcomeNotification();
        }
    }
    
    handleLogin(e) {
        console.log('Handling login...');
        e.preventDefault();
        
        const emailEl = document.getElementById('email');
        const passwordEl = document.getElementById('password');
        const roleEl = document.getElementById('role');
        
        if (!emailEl || !passwordEl || !roleEl) {
            this.showToast('Login form error. Please refresh and try again.', 'error');
            return;
        }
        
        const email = emailEl.value.trim();
        const password = passwordEl.value.trim();
        const role = roleEl.value;
        
        if (!email || !password || !role) {
            this.showToast('Please fill in all fields.', 'error');
            return;
        }
        
        // Find user
        const user = this.users.find(u => 
            u.email === email && 
            u.password === password && 
            u.role === role
        );
        
        if (user) {
            console.log('Login successful for user:', user.name);
            this.currentUser = user;
            this.saveUserSession();
            this.showMainApp();
            this.navigate('dashboard');
            this.loadNotifications();
            this.updateNotificationBadge();
            this.showToast('Login successful! Welcome ' + user.name, 'success');
        } else {
            this.showToast('Invalid credentials. Please check email, password, and role.', 'error');
        }
    }
    
    handleLogout() {
        console.log('Logging out user:', this.currentUser?.name);
        this.currentUser = null;
        this.notifications = [];
        this.currentUserNotifications = [];
        localStorage.removeItem('currentUser');
        
        // Clear any existing intervals or timeouts
        
        this.showLogin();
        this.showToast('Logged out successfully!', 'success');
        
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.reset();
        }
        
        // Reset body data-role attribute
        document.body.removeAttribute('data-role');
    }
    
    updateUserInfo() {
        if (this.currentUser) {
            const userNameEl = document.getElementById('user-name');
            const userRoleEl = document.getElementById('user-role');
            const profileNameEl = document.getElementById('profile-name');
            const profileEmailEl = document.getElementById('profile-email');
            const profileRoleEl = document.getElementById('profile-role');
            const avatarInitialsEl = document.getElementById('avatar-initials');
            
            if (userNameEl) userNameEl.textContent = this.currentUser.name;
            if (userRoleEl) userRoleEl.textContent = this.currentUser.role;
            if (profileNameEl) profileNameEl.textContent = this.currentUser.name;
            if (profileEmailEl) profileEmailEl.textContent = this.currentUser.email;
            if (profileRoleEl) profileRoleEl.textContent = this.currentUser.role;
            
            if (avatarInitialsEl) {
                const initials = this.currentUser.name.split(' ').map(n => n[0]).join('');
                avatarInitialsEl.textContent = initials;
            }
        }
    }
    
    updateRoleVisibility() {
        if (this.currentUser) {
            document.body.setAttribute('data-role', this.currentUser.role);
        }
    }
    
    populateFormOptions() {
        console.log('Populating form options...');
        
        // Categories
        const categorySelects = document.querySelectorAll('#complaint-category, #category-filter');
        console.log('Found category selects:', categorySelects.length);
        
        categorySelects.forEach(select => {
            if (!select) return;
            
            console.log('Populating select:', select.id);
            
            // Clear existing options
            select.innerHTML = '';
            
            if (select.id === 'category-filter') {
                select.innerHTML = '<option value="">All Categories</option>';
            } else {
                select.innerHTML = '<option value="">Select Category</option>';
            }
            
            this.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = `${category.icon} ${category.name}`;
                select.appendChild(option);
                console.log('Added category option:', option.textContent);
            });
        });
        
        // Priorities
        const prioritySelects = document.querySelectorAll('#complaint-priority, #priority-filter');
        console.log('Found priority selects:', prioritySelects.length);
        
        prioritySelects.forEach(select => {
            if (!select) return;
            
            console.log('Populating select:', select.id);
            
            // Clear existing options
            select.innerHTML = '';
            
            if (select.id === 'priority-filter') {
                select.innerHTML = '<option value="">All Priorities</option>';
            } else {
                select.innerHTML = '<option value="">Select Priority</option>';
            }
            
            this.priorities.forEach(priority => {
                const option = document.createElement('option');
                option.value = priority.id;
                option.textContent = priority.name;
                select.appendChild(option);
                console.log('Added priority option:', option.textContent);
            });
        });
        
        // Status filter
        const statusFilter = document.getElementById('status-filter');
        if (statusFilter) {
            console.log('Populating status filter');
            statusFilter.innerHTML = '<option value="">All Status</option>';
            this.statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status.id;
                option.textContent = status.name;
                statusFilter.appendChild(option);
                console.log('Added status option:', option.textContent);
            });
        }
        
        console.log('Form options populated successfully');
    }
    
    populateBroadcastTemplates() {
        const templateSelect = document.getElementById('broadcast-template');
        if (templateSelect) {
            templateSelect.innerHTML = '<option value="">Select Template</option>';
            this.broadcastTemplates.forEach(template => {
                const option = document.createElement('option');
                option.value = template.id;
                option.textContent = template.title;
                templateSelect.appendChild(option);
            });
        }
    }
    
    navigate(route) {
        console.log('Navigating to:', route);
        
        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-route="${route}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
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
        
        // Load page content and populate options for each page
        switch (route) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'complaints':
                this.loadComplaints();
                // Re-populate filter options
                setTimeout(() => this.populateFormOptions(), 50);
                break;
            case 'submit':
                this.resetComplaintForm();
                // Re-populate form options
                setTimeout(() => this.populateFormOptions(), 50);
                break;
            case 'broadcast':
                this.resetBroadcastForm();
                setTimeout(() => this.populateBroadcastTemplates(), 50);
                break;
            case 'notifications':
                this.loadNotificationsPage();
                break;
            case 'notification-settings':
                this.loadNotificationSettings();
                break;
        }
        
        // Re-bind filter events
        setTimeout(() => this.bindFilterEvents(), 100);
    }
    
    loadDashboard() {
        this.updateStatistics();
        this.loadRecentComplaints();
    }
    
    updateStatistics() {
        const userComplaints = this.getUserComplaints();
        
        const totalComplaints = userComplaints.length;
        const pendingComplaints = userComplaints.filter(c => c.status === 1).length;
        const progressComplaints = userComplaints.filter(c => c.status === 2).length;
        const resolvedComplaints = userComplaints.filter(c => c.status === 3).length;
        
        const totalEl = document.getElementById('total-complaints');
        const pendingEl = document.getElementById('pending-complaints');
        const progressEl = document.getElementById('progress-complaints');
        const resolvedEl = document.getElementById('resolved-complaints');
        
        if (totalEl) totalEl.textContent = totalComplaints;
        if (pendingEl) pendingEl.textContent = pendingComplaints;
        if (progressEl) progressEl.textContent = progressComplaints;
        if (resolvedEl) resolvedEl.textContent = resolvedComplaints;
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
            container.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center; padding: 2rem;">No complaints found.</p>';
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
            container.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center; padding: 2rem;">No complaints match your filters.</p>';
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
                    ${category ? category.icon : '❓'} ${category ? category.name : 'Unknown'}
                </span>
                <span class="badge priority-badge ${priority ? priority.name.toLowerCase() : 'low'}">${priority ? priority.name : 'Unknown'}</span>
                <span class="badge status-badge ${status ? status.name.toLowerCase().replace(' ', '-') : 'submitted'}">${status ? status.name : 'Unknown'}</span>
            </div>
        `;
        
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
        
        if (!title || !category || !priority || !description) {
            this.showToast('Please fill in all required fields.', 'error');
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
            updatedAt: new Date().toISOString()
        };
        
        this.complaints.push(complaint);
        this.saveComplaints();
        
        // Send notification to admin about new complaint
        this.sendNewComplaintNotification(complaint);
        
        this.showToast('Complaint submitted successfully!', 'success');
        this.navigate('complaints');
        
        // Simulate status updates
        setTimeout(() => {
            this.simulateStatusUpdates(complaint.id);
        }, 5000);
    }
    
    simulateStatusUpdates(complaintId) {
        setTimeout(() => {
            if (this.complaints.find(c => c.id === complaintId)) {
                this.updateComplaintStatus(complaintId, 2);
            }
        }, 15000);
        
        setTimeout(() => {
            if (this.complaints.find(c => c.id === complaintId)) {
                this.updateComplaintStatus(complaintId, 3);
            }
        }, 60000);
    }
    
    resetComplaintForm() {
        const form = document.getElementById('complaint-form');
        if (form) {
            form.reset();
        }
    }
    
    resetBroadcastForm() {
        const form = document.getElementById('broadcast-form');
        if (form) {
            form.reset();
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
        const modalTitle = document.getElementById('modal-title');
        const modalId = document.getElementById('modal-id');
        const modalDate = document.getElementById('modal-date');
        const modalDescription = document.getElementById('modal-description');
        
        if (modalTitle) modalTitle.textContent = complaint.title;
        if (modalId) modalId.textContent = complaint.id;
        if (modalDate) modalDate.textContent = this.formatDate(complaint.submittedAt);
        if (modalDescription) modalDescription.textContent = complaint.description;
        
        // Update badges
        const modalCategory = document.getElementById('modal-category');
        const modalPriority = document.getElementById('modal-priority');
        const modalStatus = document.getElementById('modal-status');
        
        if (modalCategory && category) {
            modalCategory.innerHTML = `${category.icon} ${category.name}`;
        }
        
        if (modalPriority && priority) {
            modalPriority.className = `badge priority-badge ${priority.name.toLowerCase()}`;
            modalPriority.textContent = priority.name;
        }
        
        if (modalStatus && status) {
            modalStatus.className = `badge status-badge ${status.name.toLowerCase().replace(' ', '-')}`;
            modalStatus.textContent = status.name;
        }
        
        this.updateProgressTracker(complaint.status);
        
        const modal = document.getElementById('complaint-modal');
        if (modal) {
            modal.classList.remove('hidden');
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
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
        this.currentComplaint = null;
    }
    
    updateComplaintStatus(complaintId, newStatus) {
        const complaintIndex = this.complaints.findIndex(c => c.id === complaintId);
        if (complaintIndex === -1) return;
        
        const oldStatus = this.complaints[complaintIndex].status;
        this.complaints[complaintIndex].status = newStatus;
        this.complaints[complaintIndex].updatedAt = new Date().toISOString();
        this.saveComplaints();
        
        // Send status update notification
        this.sendStatusUpdateNotification(this.complaints[complaintIndex], oldStatus, newStatus);
        
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
                modalStatus.className = `badge status-badge ${status.name.toLowerCase().replace(' ', '-')}`;
                modalStatus.textContent = status.name;
            }
            this.updateProgressTracker(newStatus);
        }
        
        const statusName = this.statuses.find(s => s.id === newStatus)?.name || 'Unknown';
        this.showToast(`Complaint ${complaintId} updated to: ${statusName}`, 'success');
    }
    
    // Notification System Methods
    loadNotifications() {
        if (!this.currentUser) return;
        
        // Load user-specific notifications
        const userNotifications = this.notifications.filter(n => 
            n.userId === this.currentUser.id || 
            n.userId === 'all' || 
            (n.userId === this.currentUser.role)
        );
        
        this.currentUserNotifications = userNotifications.sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
    }
    
    updateNotificationBadge() {
        if (!this.currentUserNotifications) return;
        
        const unreadCount = this.currentUserNotifications.filter(n => !n.isRead).length;
        const badge = document.getElementById('notification-count');
        
        if (badge) {
            badge.textContent = unreadCount;
            if (unreadCount > 0) {
                badge.classList.remove('hidden');
                badge.classList.add('pulse');
            } else {
                badge.classList.add('hidden');
                badge.classList.remove('pulse');
            }
        }
    }
    
    toggleNotificationDropdown() {
        const dropdown = document.getElementById('notification-dropdown');
        if (!dropdown) return;
        
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        } else {
            this.renderNotificationDropdown();
            dropdown.classList.add('show');
        }
    }
    
    renderNotificationDropdown() {
        const container = document.getElementById('notification-list');
        if (!container || !this.currentUserNotifications) return;
        
        container.innerHTML = '';
        
        const recentNotifications = this.currentUserNotifications.slice(0, 5);
        
        if (recentNotifications.length === 0) {
            container.innerHTML = '<p style="padding: 1rem; text-align: center; color: var(--color-text-secondary);">No notifications</p>';
            return;
        }
        
        recentNotifications.forEach(notification => {
            const item = this.createNotificationItem(notification, true);
            container.appendChild(item);
        });
    }
    
    createNotificationItem(notification, isDropdown = false) {
        const notificationType = this.notificationTypes.find(t => t.id === notification.type);
        const item = document.createElement('div');
        item.className = `notification-item ${!notification.isRead ? 'unread' : ''}`;
        item.setAttribute('data-notification-id', notification.id);
        
        item.innerHTML = `
            <div class="notification-content">
                <div class="notification-type">
                    <span class="notification-type-icon">${notificationType ? notificationType.icon : '📬'}</span>
                    <span class="notification-type-text ${notificationType ? notificationType.color : 'text-gray-400'}">${notificationType ? notificationType.name : 'Notification'}</span>
                </div>
                <div class="notification-title">${this.escapeHtml(notification.title)}</div>
                <div class="notification-message">${this.escapeHtml(notification.message)}</div>
                <div class="notification-time">${this.formatRelativeTime(notification.timestamp)}</div>
            </div>
        `;
        
        return item;
    }
    
    handleNotificationClick(notificationId) {
        const notification = this.currentUserNotifications.find(n => n.id === notificationId);
        if (!notification) return;
        
        // Mark as read
        this.markNotificationAsRead(notificationId);
        
        // Handle different notification types
        if (notification.relatedComplaint) {
            // Close dropdown and show complaint
            const dropdown = document.getElementById('notification-dropdown');
            if (dropdown) dropdown.classList.remove('show');
            
            this.navigate('complaints');
            setTimeout(() => {
                this.showComplaintModal(notification.relatedComplaint);
            }, 100);
        }
    }
    
    markNotificationAsRead(notificationId) {
        const notificationIndex = this.notifications.findIndex(n => n.id === notificationId);
        if (notificationIndex !== -1) {
            this.notifications[notificationIndex].isRead = true;
            this.saveNotifications();
            
            // Update current user notifications
            const userNotificationIndex = this.currentUserNotifications.findIndex(n => n.id === notificationId);
            if (userNotificationIndex !== -1) {
                this.currentUserNotifications[userNotificationIndex].isRead = true;
            }
            
            this.updateNotificationBadge();
            this.renderNotificationDropdown();
        }
    }
    
    markAllNotificationsAsRead() {
        this.currentUserNotifications.forEach(notification => {
            if (!notification.isRead) {
                this.markNotificationAsRead(notification.id);
            }
        });
        
        this.showToast('All notifications marked as read', 'success');
    }
    
    sendNotification(notification) {
        notification.id = 'NOT' + Date.now();
        notification.timestamp = new Date().toISOString();
        
        this.notifications.push(notification);
        this.saveNotifications();
        
        // If notification is for current user, update UI
        if (notification.userId === this.currentUser.id || 
            notification.userId === 'all' || 
            notification.userId === this.currentUser.role) {
            
            this.loadNotifications();
            this.updateNotificationBadge();
            
            // Show toast
            this.showToast(notification.title, 'info');
            
            // Play sound and shake bell
            this.notificationSound.play();
            this.animateNotificationBell();
            
            // Send push notification
            this.sendPushNotification(notification);
            
            // Simulate email/SMS notifications
            this.simulateEmailNotification(notification);
            this.simulateSMSNotification(notification);
        }
    }
    
    sendStatusUpdateNotification(complaint, oldStatus, newStatus) {
        const oldStatusName = this.statuses.find(s => s.id === oldStatus)?.name || 'Unknown';
        const newStatusName = this.statuses.find(s => s.id === newStatus)?.name || 'Unknown';
        
        const notification = {
            type: 1, // Status Update
            title: 'Complaint Status Updated',
            message: `Your complaint #${complaint.id} (${complaint.title}) status has been updated from ${oldStatusName} to ${newStatusName}`,
            userId: complaint.submittedBy,
            isRead: false,
            relatedComplaint: complaint.id
        };
        
        this.sendNotification(notification);
    }
    
    sendNewComplaintNotification(complaint) {
        const notification = {
            type: 3, // System Alert
            title: 'New Complaint Submitted',
            message: `A new complaint #${complaint.id} (${complaint.title}) has been submitted and requires attention`,
            userId: 'Admin', // Send to all admins
            isRead: false,
            relatedComplaint: complaint.id
        };
        
        this.sendNotification(notification);
    }
    
    sendWelcomeNotification() {
        const notification = {
            type: 4, // Welcome
            title: 'Welcome to the Portal',
            message: `Welcome ${this.currentUser.name}! You can now submit and track your complaints easily through this portal.`,
            userId: this.currentUser.id,
            isRead: false
        };
        
        this.sendNotification(notification);
    }
    
    hasWelcomeNotification() {
        return this.notifications.some(n => 
            n.type === 4 && 
            n.userId === this.currentUser.id
        );
    }
    
    animateNotificationBell() {
        const bell = document.getElementById('notification-bell');
        if (bell) {
            bell.classList.add('shake');
            setTimeout(() => {
                bell.classList.remove('shake');
            }, 500);
        }
    }
    
    sendPushNotification(notification) {
        if (!this.notificationPreferences.push) return;
        
        if ('Notification' in window && Notification.permission === 'granted') {
            try {
                new Notification(notification.title, {
                    body: notification.message,
                    icon: '/favicon.ico',
                    tag: notification.id
                });
            } catch (e) {
                console.warn('Could not send push notification:', e);
            }
        }
    }
    
    simulateEmailNotification(notification) {
        if (!this.notificationPreferences.email) return;
        
        setTimeout(() => {
            this.showEmailPreview(notification);
        }, 1000);
    }
    
    simulateSMSNotification(notification) {
        if (!this.notificationPreferences.sms) return;
        
        setTimeout(() => {
            this.showSMSPreview(notification);
        }, 2000);
    }
    
    showEmailPreview(notification) {
        const modal = document.getElementById('email-modal');
        if (!modal) return;
        
        document.getElementById('email-to').textContent = this.currentUser.email;
        document.getElementById('email-subject').textContent = `[College Portal] ${notification.title}`;
        document.getElementById('email-content').innerHTML = `
            <h3>${notification.title}</h3>
            <p>Dear ${this.currentUser.name},</p>
            <p>${notification.message}</p>
            <p>You can view more details by logging into the College Portal.</p>
            <p>Best regards,<br>College Administration</p>
        `;
        
        modal.classList.remove('hidden');
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 5000);
    }
    
    showSMSPreview(notification) {
        const modal = document.getElementById('sms-modal');
        if (!modal) return;
        
        document.getElementById('sms-content').textContent = `College Portal: ${notification.message.substring(0, 160)}`;
        
        modal.classList.remove('hidden');
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 4000);
    }
    
    // Broadcast System
    handleBroadcastSubmit(e) {
        e.preventDefault();
        
        const titleEl = document.getElementById('broadcast-title');
        const audienceEl = document.getElementById('broadcast-audience');
        const priorityEl = document.getElementById('broadcast-priority');
        const messageEl = document.getElementById('broadcast-message');
        
        if (!titleEl || !audienceEl || !priorityEl || !messageEl) {
            this.showToast('Form error. Please refresh and try again.', 'error');
            return;
        }
        
        const title = titleEl.value.trim();
        const audience = audienceEl.value;
        const priority = priorityEl.value;
        const message = messageEl.value.trim();
        
        if (!title || !audience || !priority || !message) {
            this.showToast('Please fill in all required fields.', 'error');
            return;
        }
        
        this.sendBroadcastNotification({ title, audience, priority, message });
    }
    
    previewBroadcast() {
        const titleEl = document.getElementById('broadcast-title');
        const audienceEl = document.getElementById('broadcast-audience');
        const priorityEl = document.getElementById('broadcast-priority');
        const messageEl = document.getElementById('broadcast-message');
        
        if (!titleEl.value || !audienceEl.value || !priorityEl.value || !messageEl.value) {
            this.showToast('Please fill in all fields before preview.', 'error');
            return;
        }
        
        document.getElementById('preview-title').textContent = titleEl.value;
        document.getElementById('preview-audience').textContent = audienceEl.value === 'all' ? 'All Users' : audienceEl.value + ' Only';
        document.getElementById('preview-priority').textContent = priorityEl.value;
        document.getElementById('preview-message').textContent = messageEl.value;
        
        const modal = document.getElementById('broadcast-preview-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }
    
    sendBroadcast() {
        const titleEl = document.getElementById('broadcast-title');
        const audienceEl = document.getElementById('broadcast-audience');
        const priorityEl = document.getElementById('broadcast-priority');
        const messageEl = document.getElementById('broadcast-message');
        
        const broadcastData = {
            title: titleEl.value,
            audience: audienceEl.value,
            priority: priorityEl.value,
            message: messageEl.value
        };
        
        this.sendBroadcastNotification(broadcastData);
        
        // Close preview modal
        const modal = document.getElementById('broadcast-preview-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    sendBroadcastNotification(broadcastData) {
        const notification = {
            type: 2, // Broadcast
            title: broadcastData.title,
            message: broadcastData.message,
            userId: broadcastData.audience,
            isRead: false,
            priority: broadcastData.priority
        };
        
        this.sendNotification(notification);
        
        this.showToast(`Broadcast sent to ${broadcastData.audience === 'all' ? 'all users' : broadcastData.audience}!`, 'success');
        this.resetBroadcastForm();
    }
    
    populateBroadcastTemplate(templateId) {
        if (!templateId) return;
        
        const template = this.broadcastTemplates.find(t => t.id === parseInt(templateId));
        if (!template) return;
        
        const titleEl = document.getElementById('broadcast-title');
        const messageEl = document.getElementById('broadcast-message');
        
        if (titleEl) titleEl.value = template.title;
        if (messageEl) messageEl.value = template.template;
    }
    
    // Notification Pages
    loadNotificationsPage() {
        this.renderNotificationsList('all');
    }
    
    switchNotificationTab(tab) {
        // Update tab active state
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        this.renderNotificationsList(tab);
    }
    
    renderNotificationsList(filter) {
        const container = document.getElementById('notifications-container');
        if (!container || !this.currentUserNotifications) return;
        
        let filteredNotifications = [...this.currentUserNotifications];
        
        switch (filter) {
            case 'unread':
                filteredNotifications = filteredNotifications.filter(n => !n.isRead);
                break;
            case 'status':
                filteredNotifications = filteredNotifications.filter(n => n.type === 1);
                break;
            case 'broadcast':
                filteredNotifications = filteredNotifications.filter(n => n.type === 2);
                break;
        }
        
        container.innerHTML = '';
        
        if (filteredNotifications.length === 0) {
            container.innerHTML = '<p style="padding: 2rem; text-align: center; color: var(--color-text-secondary);">No notifications found.</p>';
            return;
        }
        
        filteredNotifications.forEach(notification => {
            const item = this.createNotificationItem(notification);
            container.appendChild(item);
        });
    }
    
    loadNotificationSettings() {
        const emailCheckbox = document.getElementById('email-notifications');
        const smsCheckbox = document.getElementById('sms-notifications');
        const pushCheckbox = document.getElementById('push-notifications');
        const soundCheckbox = document.getElementById('sound-notifications');
        
        if (emailCheckbox) emailCheckbox.checked = this.notificationPreferences.email;
        if (smsCheckbox) smsCheckbox.checked = this.notificationPreferences.sms;
        if (pushCheckbox) pushCheckbox.checked = this.notificationPreferences.push;
        if (soundCheckbox) soundCheckbox.checked = this.notificationPreferences.sound;
    }
    
    saveSettings() {
        const emailCheckbox = document.getElementById('email-notifications');
        const smsCheckbox = document.getElementById('sms-notifications');
        const pushCheckbox = document.getElementById('push-notifications');
        const soundCheckbox = document.getElementById('sound-notifications');
        
        this.notificationPreferences = {
            email: emailCheckbox ? emailCheckbox.checked : true,
            sms: smsCheckbox ? smsCheckbox.checked : true,
            push: pushCheckbox ? pushCheckbox.checked : true,
            sound: soundCheckbox ? soundCheckbox.checked : true
        };
        
        this.saveNotificationPreferences();
        this.showToast('Settings saved successfully!', 'success');
    }
    
    testNotifications() {
        const testNotification = {
            type: 3,
            title: 'Test Notification',
            message: 'This is a test notification to verify your settings are working correctly.',
            userId: this.currentUser.id,
            isRead: false
        };
        
        this.sendNotification(testNotification);
        this.showToast('Test notification sent!', 'info');
    }
    
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        } catch (e) {
            return 'Invalid date';
        }
    }
    
    formatRelativeTime(dateString) {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);
            
            if (diffMins < 1) return 'just now';
            if (diffMins < 60) return `${diffMins}m ago`;
            if (diffHours < 24) return `${diffHours}h ago`;
            if (diffDays < 7) return `${diffDays}d ago`;
            return date.toLocaleDateString();
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
    
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast-close';
        closeBtn.innerHTML = '×';
        closeBtn.onclick = () => this.removeToast(toast);
        
        toast.innerHTML = `${message}`;
        toast.appendChild(closeBtn);
        
        const container = document.getElementById('toast-container');
        if (container) {
            container.appendChild(toast);
            
            // Auto remove toast after 4 seconds
            setTimeout(() => {
                this.removeToast(toast);
            }, 4000);
        }
    }
    
    removeToast(toast) {
        if (toast && toast.parentNode) {
            toast.classList.add('removing');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }
}

// Initialize the application
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new ComplaintManagementApp();
    });
} else {
    app = new ComplaintManagementApp();
}

// Additional utility functions
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal:not(.hidden)');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
        
        const dropdown = document.getElementById('notification-dropdown');
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
        
        if (app) {
            app.currentComplaint = null;
        }
    }
});

// Form validation
document.addEventListener('blur', (e) => {
    if (e.target.classList.contains('form-control') && e.target.hasAttribute('required')) {
        if (!e.target.value.trim()) {
            e.target.style.borderColor = 'var(--color-red-400)';
        } else {
            e.target.style.borderColor = 'var(--color-teal-300)';
        }
    }
}, true);

document.addEventListener('focus', (e) => {
    if (e.target.classList.contains('form-control')) {
        e.target.style.borderColor = '';
    }
}, true);

// Error boundary
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
            console.log(`App loaded in ${loadTime}ms`);
        }, 0);
    });
}