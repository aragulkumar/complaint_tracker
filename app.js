// College Complaint Management System - Main Application Logic with Analytics

class ComplaintManagementApp {
    constructor() {
        this.currentUser = null;
        this.currentRoute = 'dashboard';
        this.complaints = [];
        this.categories = [];
        this.priorities = [];
        this.statuses = [];
        this.users = [];
        this.analyticsData = {};
        this.charts = {};
        
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
            }
        }, 500);
    }
    
    loadMockData() {
        console.log('Loading mock data...');
        // Mock users
        this.users = [
            {"email": "student@college.edu", "password": "demo123", "role": "Student", "name": "John Doe", "id": "STU001", "phone": "+91-9876543210"},
            {"email": "staff@college.edu", "password": "demo123", "role": "Staff", "name": "Jane Smith", "id": "STF001", "phone": "+91-9876543211"},
            {"email": "admin@college.edu", "password": "demo123", "role": "Admin", "name": "Admin User", "id": "ADM001", "phone": "+91-9876543212"}
        ];
        
        // Categories with department info
        this.categories = [
            {"id": 1, "name": "WiFi", "icon": "📶", "color": "bg-blue-500", "department": "IT Department"},
            {"id": 2, "name": "Hostel", "icon": "🏠", "color": "bg-purple-500", "department": "Hostel Administration"},
            {"id": 3, "name": "Food", "icon": "🍽️", "color": "bg-orange-500", "department": "Mess Management"},
            {"id": 4, "name": "Classroom", "icon": "🏫", "color": "bg-green-500", "department": "Academic Affairs"},
            {"id": 5, "name": "Maintenance", "icon": "🔧", "color": "bg-yellow-500", "department": "Maintenance Department"},
            {"id": 6, "name": "Academics", "icon": "📚", "color": "bg-indigo-500", "department": "Academic Affairs"},
            {"id": 7, "name": "Harassment", "icon": "⚠️", "color": "bg-red-500", "department": "Student Affairs"},
            {"id": 8, "name": "Other", "icon": "❓", "color": "bg-gray-500", "department": "General Administration"}
        ];
        
        // Priorities
        this.priorities = [
            {"id": 1, "name": "Urgent", "color": "bg-red-500", "textColor": "text-red-500", "targetTime": 4},
            {"id": 2, "name": "Medium", "color": "bg-orange-500", "textColor": "text-orange-500", "targetTime": 24},
            {"id": 3, "name": "Low", "color": "bg-green-500", "textColor": "text-green-500", "targetTime": 72}
        ];
        
        // Statuses
        this.statuses = [
            {"id": 1, "name": "Submitted", "color": "bg-blue-500", "textColor": "text-blue-500"},
            {"id": 2, "name": "In Progress", "color": "bg-yellow-500", "textColor": "text-yellow-500"},
            {"id": 3, "name": "Resolved", "color": "bg-green-500", "textColor": "text-green-500"}
        ];

        // Departments
        this.departments = [
            {"id": 1, "name": "IT Department", "head": "Dr. Kumar", "efficiency": 85},
            {"id": 2, "name": "Hostel Administration", "head": "Ms. Sharma", "efficiency": 78},
            {"id": 3, "name": "Mess Management", "head": "Mr. Patel", "efficiency": 72},
            {"id": 4, "name": "Academic Affairs", "head": "Prof. Singh", "efficiency": 90},
            {"id": 5, "name": "Maintenance Department", "head": "Mr. Gupta", "efficiency": 65},
            {"id": 6, "name": "Student Affairs", "head": "Dr. Verma", "efficiency": 88}
        ];

        // Load analytics data
        this.loadAnalyticsData();
        
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
    }

    loadAnalyticsData() {
        this.analyticsData = {
            monthlyTrends: [
                {"month": "Apr", "submitted": 15, "resolved": 12, "inProgress": 3},
                {"month": "May", "submitted": 22, "resolved": 20, "inProgress": 2},
                {"month": "Jun", "submitted": 18, "resolved": 16, "inProgress": 2},
                {"month": "Jul", "submitted": 25, "resolved": 21, "inProgress": 4},
                {"month": "Aug", "submitted": 32, "resolved": 28, "inProgress": 4},
                {"month": "Sep", "submitted": 28, "resolved": 22, "inProgress": 6}
            ],
            categoryStats: [
                {"category": "WiFi", "count": 35, "avgResolutionTime": 48.2},
                {"category": "Hostel", "count": 28, "avgResolutionTime": 36.5},
                {"category": "Food", "count": 22, "avgResolutionTime": 42.8},
                {"category": "Classroom", "count": 18, "avgResolutionTime": 52.3},
                {"category": "Maintenance", "count": 15, "avgResolutionTime": 58.7},
                {"category": "Academics", "count": 12, "avgResolutionTime": 24.6},
                {"category": "Harassment", "count": 3, "avgResolutionTime": 12.4},
                {"category": "Other", "count": 7, "avgResolutionTime": 38.9}
            ],
            priorityDistribution: [
                {"priority": "Urgent", "count": 25, "percentage": 17.9},
                {"priority": "Medium", "count": 78, "percentage": 55.7},
                {"priority": "Low", "count": 37, "percentage": 26.4}
            ],
            resolutionTimes: {
                "average": 42.3,
                "urgent": 18.5,
                "medium": 45.2,
                "low": 68.7
            },
            departmentPerformance: [
                {"department": "IT Department", "efficiency": 85, "avgTime": 38.2, "complaints": 42},
                {"department": "Hostel Administration", "efficiency": 78, "avgTime": 36.5, "complaints": 28},
                {"department": "Mess Management", "efficiency": 72, "avgTime": 42.8, "complaints": 22},
                {"department": "Academic Affairs", "efficiency": 90, "avgTime": 38.4, "complaints": 30},
                {"department": "Maintenance Department", "efficiency": 65, "avgTime": 58.7, "complaints": 15},
                {"department": "Student Affairs", "efficiency": 88, "avgTime": 12.4, "complaints": 3}
            ]
        };
    }
    
    getDefaultComplaints() {
        return [
            {
                "id": "COMP001",
                "title": "WiFi not working in Block A",
                "description": "The WiFi connection is very slow and keeps disconnecting in Block A hostel rooms.",
                "category": 1,
                "priority": 1,
                "status": 3,
                "submittedBy": "STU001",
                "submittedAt": "2025-09-15T08:30:00Z",
                "updatedAt": "2025-09-17T14:00:00Z",
                "assignedDept": 1,
                "resolutionTime": 53.5,
                "staffRating": 4
            },
            {
                "id": "COMP002",
                "title": "Mess food quality poor",
                "description": "The food quality in the mess has deteriorated significantly over the past week.",
                "category": 3,
                "priority": 2,
                "status": 2,
                "submittedBy": "STU001",
                "submittedAt": "2025-09-16T14:20:00Z",
                "updatedAt": "2025-09-18T10:15:00Z",
                "assignedDept": 3,
                "resolutionTime": null,
                "staffRating": null
            },
            {
                "id": "COMP003",
                "title": "AC not working in Room 101",
                "description": "The air conditioning unit in classroom 101 has been malfunctioning for 3 days.",
                "category": 4,
                "priority": 2,
                "status": 3,
                "submittedBy": "STU001",
                "submittedAt": "2025-09-12T09:15:00Z",
                "updatedAt": "2025-09-14T16:30:00Z",
                "assignedDept": 5,
                "resolutionTime": 55.25,
                "staffRating": 5
            },
            {
                "id": "COMP004",
                "title": "Water leakage in hostel bathroom",
                "description": "There is a continuous water leakage from the ceiling in Block B bathroom.",
                "category": 2,
                "priority": 1,
                "status": 3,
                "submittedBy": "STU001",
                "submittedAt": "2025-09-10T07:45:00Z",
                "updatedAt": "2025-09-11T12:00:00Z",
                "assignedDept": 2,
                "resolutionTime": 28.25,
                "staffRating": 4
            },
            {
                "id": "COMP005",
                "title": "Assignment portal down",
                "description": "Cannot find the assignment submission link for Advanced Programming course.",
                "category": 6,
                "priority": 2,
                "status": 1,
                "submittedBy": "STU001",
                "submittedAt": "2025-09-19T11:00:00Z",
                "updatedAt": "2025-09-19T11:00:00Z",
                "assignedDept": 1,
                "resolutionTime": null,
                "staffRating": null
            }
        ];
    }
    
    loadUserSession() {
        try {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
                console.log('Loaded user session:', this.currentUser);
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
    
    bindEvents() {
        console.log('Binding events...');
        
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            console.log('Login form found, binding submit event');
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Login form submitted');
                this.handleLogin(e);
            });
        }
        
        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-route')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                console.log('Navigating to:', route);
                this.navigate(route);
            }
        });
        
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
        
        // Analytics export
        const exportBtn = document.getElementById('export-analytics');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportAnalyticsReport());
        }

        // Analytics period filter
        const periodFilter = document.getElementById('analytics-period');
        if (periodFilter) {
            periodFilter.addEventListener('change', () => this.updateAnalyticsPeriod());
        }
        
        // Filters
        setTimeout(() => {
            const categoryFilter = document.getElementById('category-filter');
            const priorityFilter = document.getElementById('priority-filter');
            const statusFilter = document.getElementById('status-filter');
            const searchFilter = document.getElementById('search-filter');
            
            if (categoryFilter) categoryFilter.addEventListener('change', () => this.applyFilters());
            if (priorityFilter) priorityFilter.addEventListener('change', () => this.applyFilters());
            if (statusFilter) statusFilter.addEventListener('change', () => this.applyFilters());
            if (searchFilter) searchFilter.addEventListener('input', () => this.applyFilters());
        }, 1000);
        
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
        
        console.log('Events bound successfully');
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
        this.populateFormOptions();
    }
    
    handleLogin(e) {
        console.log('Handling login...');
        e.preventDefault();
        
        const emailEl = document.getElementById('email');
        const passwordEl = document.getElementById('password');
        const roleEl = document.getElementById('role');
        
        if (!emailEl || !passwordEl || !roleEl) {
            console.error('Login form elements not found');
            this.showToast('Login form error. Please refresh and try again.', 'error');
            return;
        }
        
        const email = emailEl.value.trim();
        const password = passwordEl.value.trim();
        const role = roleEl.value;
        
        console.log('Login attempt:', { email, role, hasPassword: !!password });
        
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
            this.showToast('Login successful! Welcome ' + user.name, 'success');
        } else {
            console.log('Login failed - invalid credentials');
            this.showToast('Invalid credentials. Please check email, password, and role.', 'error');
        }
    }
    
    handleLogout() {
        console.log('Logging out...');
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        
        // Destroy all charts
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};
        
        this.showLogin();
        this.showToast('Logged out successfully!', 'success');
        
        // Clear form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.reset();
        }
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
            
            // Update avatar initials
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
        // Categories
        const categorySelects = document.querySelectorAll('#complaint-category, #category-filter');
        categorySelects.forEach(select => {
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
            });
        });
        
        // Priorities
        const prioritySelects = document.querySelectorAll('#complaint-priority, #priority-filter');
        prioritySelects.forEach(select => {
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
            });
        });
        
        // Status filter
        const statusFilter = document.getElementById('status-filter');
        if (statusFilter) {
            statusFilter.innerHTML = '<option value="">All Status</option>';
            this.statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status.id;
                option.textContent = status.name;
                statusFilter.appendChild(option);
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
        } else {
            console.error('Page not found:', `${route}-page`);
        }
        
        this.currentRoute = route;
        
        // Load page content
        switch (route) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
            case 'complaints':
                this.loadComplaints();
                break;
            case 'submit':
                this.resetComplaintForm();
                break;
            case 'profile':
                // Profile is already populated
                break;
        }
    }
    
    loadDashboard() {
        this.updateStatistics();
        this.loadRecentComplaints();
        
        // Load quick analytics chart for non-admin users
        if (this.currentUser && this.currentUser.role !== 'Admin') {
            setTimeout(() => {
                this.createQuickChart();
            }, 100);
        }
    }

    createQuickChart() {
        const canvas = document.getElementById('quick-chart');
        if (!canvas) return;

        // Destroy existing chart
        if (this.charts.quickChart) {
            this.charts.quickChart.destroy();
        }

        const ctx = canvas.getContext('2d');
        
        // Status distribution data
        const userComplaints = this.getUserComplaints();
        const statusCounts = {
            'Submitted': userComplaints.filter(c => c.status === 1).length,
            'In Progress': userComplaints.filter(c => c.status === 2).length,
            'Resolved': userComplaints.filter(c => c.status === 3).length
        };

        this.charts.quickChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    data: Object.values(statusCounts),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 2,
                    borderColor: '#1f2121'
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
                            font: { size: 12 }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Your Complaint Status',
                        color: '#f5f5f5',
                        font: { size: 16 }
                    }
                }
            }
        });
    }

    loadAnalytics() {
        if (this.currentUser && this.currentUser.role === 'Admin') {
            this.updateAnalyticsMetrics();
            setTimeout(() => {
                this.createAnalyticsCharts();
            }, 100);
        }
    }

    updateAnalyticsMetrics() {
        // Update key metrics
        const totalEl = document.getElementById('total-submissions');
        const avgTimeEl = document.getElementById('avg-resolution-time');
        const resolutionRateEl = document.getElementById('resolution-rate');
        const satisfactionEl = document.getElementById('satisfaction-score');

        if (totalEl) totalEl.textContent = '140';
        if (avgTimeEl) avgTimeEl.textContent = '42.3h';
        if (resolutionRateEl) resolutionRateEl.textContent = '84%';
        if (satisfactionEl) satisfactionEl.textContent = '4.2';
    }

    createAnalyticsCharts() {
        this.createMonthlyTrendsChart();
        this.createStatusChart();
        this.createCategoryChart();
        this.createPriorityChart();
        this.createDepartmentChart();
        this.createResolutionTimeChart();
    }

    createMonthlyTrendsChart() {
        const canvas = document.getElementById('monthly-trends-chart');
        if (!canvas) return;

        if (this.charts.monthlyTrends) {
            this.charts.monthlyTrends.destroy();
        }

        const ctx = canvas.getContext('2d');
        const data = this.analyticsData.monthlyTrends;

        this.charts.monthlyTrends = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.month),
                datasets: [
                    {
                        label: 'Submitted',
                        data: data.map(d => d.submitted),
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Resolved',
                        data: data.map(d => d.resolved),
                        borderColor: '#B4413C',
                        backgroundColor: 'rgba(180, 65, 60, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        labels: { color: '#f5f5f5' }
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

    createStatusChart() {
        const canvas = document.getElementById('status-chart');
        if (!canvas) return;

        if (this.charts.status) {
            this.charts.status.destroy();
        }

        const ctx = canvas.getContext('2d');

        this.charts.status = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Submitted', 'In Progress', 'Resolved'],
                datasets: [{
                    data: [28, 25, 87],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 2,
                    borderColor: '#1f2121'
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

    createCategoryChart() {
        const canvas = document.getElementById('category-chart');
        if (!canvas) return;

        if (this.charts.category) {
            this.charts.category.destroy();
        }

        const ctx = canvas.getContext('2d');
        const data = this.analyticsData.categoryStats;

        this.charts.category = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.category),
                datasets: [{
                    label: 'Complaint Count',
                    data: data.map(d => d.count),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325'],
                    borderWidth: 1,
                    borderColor: '#1f2121'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
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

    createPriorityChart() {
        const canvas = document.getElementById('priority-chart');
        if (!canvas) return;

        if (this.charts.priority) {
            this.charts.priority.destroy();
        }

        const ctx = canvas.getContext('2d');
        const data = this.analyticsData.priorityDistribution;

        this.charts.priority = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(d => d.priority),
                datasets: [{
                    data: data.map(d => d.count),
                    backgroundColor: ['#DB4545', '#FFC185', '#1FB8CD'],
                    borderWidth: 2,
                    borderColor: '#1f2121'
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

    createDepartmentChart() {
        const canvas = document.getElementById('department-chart');
        if (!canvas) return;

        if (this.charts.department) {
            this.charts.department.destroy();
        }

        const ctx = canvas.getContext('2d');
        const data = this.analyticsData.departmentPerformance;

        this.charts.department = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.department.split(' ')[0]),
                datasets: [
                    {
                        label: 'Efficiency (%)',
                        data: data.map(d => d.efficiency),
                        backgroundColor: '#1FB8CD',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Avg Time (hours)',
                        data: data.map(d => d.avgTime),
                        backgroundColor: '#FFC185',
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#f5f5f5' }
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

    createResolutionTimeChart() {
        const canvas = document.getElementById('resolution-time-chart');
        if (!canvas) return;

        if (this.charts.resolutionTime) {
            this.charts.resolutionTime.destroy();
        }

        const ctx = canvas.getContext('2d');

        this.charts.resolutionTime = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['WiFi', 'Hostel', 'Food', 'Classroom', 'Maintenance', 'Academics'],
                datasets: [{
                    label: 'Avg Resolution Time (hours)',
                    data: [48.2, 36.5, 42.8, 52.3, 58.7, 24.6],
                    backgroundColor: 'rgba(31, 184, 205, 0.2)',
                    borderColor: '#1FB8CD',
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#1FB8CD'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#f5f5f5' }
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(167, 169, 169, 0.2)' },
                        grid: { color: 'rgba(167, 169, 169, 0.2)' },
                        pointLabels: { color: '#a7a9a9' },
                        ticks: { color: '#a7a9a9', backdropColor: 'transparent' }
                    }
                }
            }
        });
    }

    exportAnalyticsReport() {
        // Create a simple text report
        const report = `
COLLEGE COMPLAINT MANAGEMENT SYSTEM
Analytics Report
Generated on: ${new Date().toLocaleDateString()}

=== KEY METRICS ===
Total Submissions: 140
Average Resolution Time: 42.3 hours
Resolution Rate: 84%
Satisfaction Score: 4.2/5

=== CATEGORY BREAKDOWN ===
${this.analyticsData.categoryStats.map(cat => 
    `${cat.category}: ${cat.count} complaints (Avg: ${cat.avgResolutionTime}h)`
).join('\n')}

=== DEPARTMENT PERFORMANCE ===
${this.analyticsData.departmentPerformance.map(dept => 
    `${dept.department}: ${dept.efficiency}% efficiency, ${dept.avgTime}h avg time`
).join('\n')}

=== PRIORITY DISTRIBUTION ===
${this.analyticsData.priorityDistribution.map(priority => 
    `${priority.priority}: ${priority.count} complaints (${priority.percentage}%)`
).join('\n')}

Report generated by College Complaint Management System
        `;

        // Create and download the file
        const blob = new Blob([report], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics_report_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        this.showToast('Analytics report exported successfully!', 'success');
    }

    updateAnalyticsPeriod() {
        const period = document.getElementById('analytics-period').value;
        console.log('Updated analytics period to:', period);
        
        // In a real app, this would filter the data based on the selected period
        // For demo purposes, we'll just show a toast
        this.showToast(`Analytics updated for last ${period} months`, 'success');
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
            return this.complaints; // Staff and Admin see all complaints
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
        console.log('Handling complaint submission...');
        
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
            status: 1, // Submitted
            submittedBy: this.currentUser.id,
            submittedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            assignedDept: this.categories.find(c => c.id === category)?.department || 1,
            resolutionTime: null,
            staffRating: null
        };
        
        this.complaints.push(complaint);
        this.saveComplaints();
        
        this.showToast('Complaint submitted successfully!', 'success');
        this.navigate('complaints');
        
        // Update analytics charts if they exist
        this.updateChartsWithNewData();
        
        // Simulate real-time status updates for demo
        setTimeout(() => {
            this.simulateStatusUpdates(complaint.id);
        }, 5000);
    }

    updateChartsWithNewData() {
        // Update quick chart if it exists
        if (this.charts.quickChart && this.currentUser.role !== 'Admin') {
            setTimeout(() => {
                this.createQuickChart();
            }, 100);
        }

        // Update analytics charts if admin is viewing analytics
        if (this.currentRoute === 'analytics' && this.currentUser.role === 'Admin') {
            setTimeout(() => {
                this.createAnalyticsCharts();
            }, 100);
        }
    }
    
    simulateStatusUpdates(complaintId) {
        // After 30 seconds, update to "In Progress"
        setTimeout(() => {
            if (this.complaints.find(c => c.id === complaintId)) {
                this.updateComplaintStatus(complaintId, 2);
                this.showToast('Your complaint is now being processed.', 'success');
            }
        }, 30000);
        
        // After 2 minutes, update to "Resolved" (for demo purposes)
        setTimeout(() => {
            if (this.complaints.find(c => c.id === complaintId)) {
                this.updateComplaintStatus(complaintId, 3);
                this.showToast('Your complaint has been resolved!', 'success');
            }
        }, 120000);
    }
    
    resetComplaintForm() {
        const form = document.getElementById('complaint-form');
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
        
        // Update progress tracker
        this.updateProgressTracker(complaint.status);
        
        // Show modal
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
        const modal = document.getElementById('complaint-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentComplaint = null;
    }
    
    updateComplaintStatus(complaintId, newStatus) {
        const complaintIndex = this.complaints.findIndex(c => c.id === complaintId);
        if (complaintIndex === -1) return;
        
        this.complaints[complaintIndex].status = newStatus;
        this.complaints[complaintIndex].updatedAt = new Date().toISOString();
        
        // Add resolution time for resolved complaints
        if (newStatus === 3 && !this.complaints[complaintIndex].resolutionTime) {
            const submitTime = new Date(this.complaints[complaintIndex].submittedAt);
            const resolveTime = new Date();
            this.complaints[complaintIndex].resolutionTime = (resolveTime - submitTime) / (1000 * 60 * 60); // hours
        }
        
        this.saveComplaints();
        
        // Update UI
        if (this.currentRoute === 'dashboard') {
            this.loadDashboard();
        } else if (this.currentRoute === 'complaints') {
            this.renderComplaints();
        }
        
        // Update charts
        this.updateChartsWithNewData();
        
        // Update modal if it's open
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
    
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
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
        toast.textContent = message;
        
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
            // Fallback to alert if toast container not found
            alert(message);
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

// Additional utility functions and enhancements
document.addEventListener('keydown', (e) => {
    // Close modal on Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('complaint-modal');
        if (modal && !modal.classList.contains('hidden')) {
            if (app) {
                app.closeModal();
            }
        }
    }
});

// Handle form validation with real-time feedback
document.addEventListener('blur', (e) => {
    if (e.target.classList.contains('form-control') && e.target.hasAttribute('required')) {
        if (!e.target.value.trim()) {
            e.target.style.borderColor = 'var(--color-red-400)';
        } else {
            e.target.style.borderColor = 'var(--color-teal-300)';
        }
    }
}, true);

// Reset border color on focus
document.addEventListener('focus', (e) => {
    if (e.target.classList.contains('form-control')) {
        e.target.style.borderColor = '';
    }
}, true);

// Add error boundary for better error handling
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