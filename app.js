// College Complaint Management System - Main Application Logic

class ComplaintManagementApp {
    constructor() {
        this.currentUser = null;
        this.currentRoute = 'dashboard';
        this.complaints = [];
        this.categories = [];
        this.priorities = [];
        this.statuses = [];
        this.users = [];
        
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
            {"email": "student@college.edu", "password": "demo123", "role": "Student", "name": "John Doe", "id": "STU001"},
            {"email": "staff@college.edu", "password": "demo123", "role": "Staff", "name": "Jane Smith", "id": "STF001"},
            {"email": "admin@college.edu", "password": "demo123", "role": "Admin", "name": "Admin User", "id": "ADM001"}
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
        
        // Login form - use more robust event binding
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            console.log('Login form found, binding submit event');
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Login form submitted');
                this.handleLogin(e);
            });
            
            // Also bind to button click directly
            const loginBtn = loginForm.querySelector('button[type="submit"]');
            if (loginBtn) {
                loginBtn.addEventListener('click', (e) => {
                    if (e.target.type === 'submit') {
                        return; // Let form submit handler take care of it
                    }
                    e.preventDefault();
                    this.handleLogin(e);
                });
            }
        } else {
            console.error('Login form not found');
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
        
        // Filters - use more robust selectors
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
            updatedAt: new Date().toISOString()
        };
        
        this.complaints.push(complaint);
        this.saveComplaints();
        
        this.showToast('Complaint submitted successfully!', 'success');
        this.navigate('complaints');
        
        // Simulate real-time status updates for demo
        setTimeout(() => {
            this.simulateStatusUpdates(complaint.id);
        }, 5000);
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
        this.saveComplaints();
        
        // Update UI
        if (this.currentRoute === 'dashboard') {
            this.loadDashboard();
        } else if (this.currentRoute === 'complaints') {
            this.renderComplaints();
        }
        
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