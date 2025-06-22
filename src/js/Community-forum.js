// DOM Elements
const messageForm = document.getElementById('message-form');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const categorySelect = document.getElementById('category');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const charCount = document.getElementById('char-count');
const nameFeedback = document.getElementById('name-feedback');

// Stats elements
const totalMessages = document.getElementById('total-messages');
const uniqueUsers = document.getElementById('unique-users');
const lastActivity = document.getElementById('last-activity');
const onlineCount = document.getElementById('online-count');

// Messages elements
const messagesTitle = document.getElementById('messages-title');
const emptyState = document.getElementById('empty-state');
const messagesContainer = document.getElementById('messages-container');
const loadMoreContainer = document.getElementById('load-more-container');
const loadMoreBtn = document.getElementById('load-more-btn');

// Control elements
const themeToggle = document.getElementById('theme-toggle');
const searchToggle = document.getElementById('search-toggle');
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const sortSelect = document.getElementById('sort-select');
const filterSelect = document.getElementById('filter-select');
const clearFormBtn = document.getElementById('clear-form');
const clearAllBtn = document.getElementById('clear-all-btn');
const exportBtn = document.getElementById('export-btn');
const backHomeBtn = document.getElementById('back-home-btn');

// Modal elements
const confirmationModal = document.getElementById('confirmation-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalConfirm = document.getElementById('modal-confirm');
const modalCancel = document.getElementById('modal-cancel');
const modalClose = document.getElementById('modal-close');

// State
let messages = [];
let filteredMessages = [];
let displayedMessages = [];
let isSubmitting = false;
let currentSearchTerm = '';
let currentSort = 'newest';
let currentFilter = 'all';
let messagesPerPage = 10;
let currentPage = 1;
let pendingAction = null;

// Categories configuration
const categories = {
    general: { icon: '💬', label: 'General', color: '#6b7280' },
    question: { icon: '❓', label: 'Question', color: '#3b82f6' },
    announcement: { icon: '📢', label: 'Announcement', color: '#f59e0b' },
    feedback: { icon: '💡', label: 'Feedback', color: '#10b981' },
    discussion: { icon: '🗣️', label: 'Discussion', color: '#8b5cf6' }
};

// Initialize the application
function init() {
    loadMessages();
    loadSettings();
    updateUI();
    setupEventListeners();
    simulateOnlineUsers();
}

// Setup event listeners
function setupEventListeners() {
    // Form events
    messageForm.addEventListener('submit', handleSubmit);
    messageInput.addEventListener('input', handleMessageInput);
    nameInput.addEventListener('input', handleNameInput);
    clearFormBtn.addEventListener('click', clearForm);

    // Theme and search
    themeToggle.addEventListener('click', toggleTheme);
    searchToggle.addEventListener('click', toggleSearch);
    searchInput.addEventListener('input', handleSearch);
    searchClear.addEventListener('click', clearSearch);

    // Sorting and filtering
    sortSelect.addEventListener('change', handleSort);
    filterSelect.addEventListener('change', handleFilter);

    // Actions
    exportBtn.addEventListener('click', exportMessages);
    clearAllBtn.addEventListener('click', () => showConfirmation(
        'Clear All Messages',
        'Are you sure you want to delete all messages? This action cannot be undone.',
        clearAllMessages
    ));
    
    // Load more
    loadMoreBtn.addEventListener('click', loadMoreMessages);

    // Modal events
    modalConfirm.addEventListener('click', confirmAction);
    modalCancel.addEventListener('click', hideConfirmation);
    modalClose.addEventListener('click', hideConfirmation);
    confirmationModal.addEventListener('click', (e) => {
        if (e.target === confirmationModal) hideConfirmation();
    });

    // Back to home button
    backHomeBtn.addEventListener('click', () => {
        if (window.location.port === '5173' || window.location.hostname === 'localhost') {
            window.location.href = '/';
        } else {
            const possibleHomePages = ['index.html', '../index.html', '/index.html', 'Home.html'];
            window.location.href = 'Home.html';
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + K to toggle search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
    }
    
    // Escape to close search or modal
    if (e.key === 'Escape') {
        if (!searchBar.classList.contains('hidden')) {
            toggleSearch();
        } else if (!confirmationModal.classList.contains('hidden')) {
            hideConfirmation();
        }
    }
}

// Load messages from localStorage
function loadMessages() {
    try {
        const savedMessages = localStorage.getItem('forumMessages');
        if (savedMessages) {
            messages = JSON.parse(savedMessages);
            // Ensure all messages have required properties
            messages = messages.map(msg => ({
                id: msg.id || Date.now().toString(),
                name: msg.name || 'Anonymous',
                content: msg.content || '',
                category: msg.category || 'general',
                timestamp: msg.timestamp || Date.now(),
                likes: msg.likes || 0
            }));
        }
    } catch (error) {
        console.error('Error loading messages:', error);
        messages = [];
    }
}

// Save messages to localStorage
function saveMessages() {
    try {
        localStorage.setItem('forumMessages', JSON.stringify(messages));
    } catch (error) {
        console.error('Error saving messages:', error);
    }
}

// Load settings from localStorage
function loadSettings() {
    try {
        const savedTheme = localStorage.getItem('forumTheme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
        
        const savedSort = localStorage.getItem('forumSort');
        if (savedSort) {
            currentSort = savedSort;
            sortSelect.value = savedSort;
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Save settings to localStorage
function saveSettings() {
    try {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme) {
            localStorage.setItem('forumTheme', currentTheme);
        }
        localStorage.setItem('forumSort', currentSort);
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const content = messageInput.value.trim();
    const category = categorySelect.value;
    
    if (!name || !content || isSubmitting) {
        return;
    }

    // Set submitting state
    setSubmittingState(true);

    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create new message
    const newMessage = {
        id: Date.now().toString(),
        name: name,
        content: content,
        category: category,
        timestamp: Date.now(),
        likes: 0
    };

    // Add message to the beginning of the array (newest first)
    messages.unshift(newMessage);
    
    // Save to localStorage
    saveMessages();
    
    // Update UI
    updateUI();
    
    // Clear form
    clearForm();
    
    // Reset submitting state
    setSubmittingState(false);
    
    // Show success feedback
    showToast('Message posted successfully!', 'success');
}

// Handle message input
function handleMessageInput() {
    const count = messageInput.value.length;
    charCount.textContent = count;
    
    // Change color based on character limit
    if (count > 450) {
        charCount.style.color = 'var(--accent-danger)';
    } else if (count > 400) {
        charCount.style.color = 'var(--accent-warning)';
    } else {
        charCount.style.color = 'var(--text-muted)';
    }
    
    validateForm();
}

// Handle name input
function handleNameInput() {
    const name = nameInput.value.trim();
    let feedback = '';
    let feedbackClass = '';
    
    if (name.length < 2 && name.length > 0) {
        feedback = 'Name must be at least 2 characters';
        feedbackClass = 'error';
    } else if (name.length >= 2) {
        feedback = 'Looks good!';
        feedbackClass = 'success';
    }
    
    nameFeedback.textContent = feedback;
    nameFeedback.className = `input-feedback ${feedbackClass}`;
    
    validateForm();
}

// Validate form
function validateForm() {
    const name = nameInput.value.trim();
    const content = messageInput.value.trim();
    const isValid = name.length >= 2 && content.length > 0 && !isSubmitting;
    
    submitBtn.disabled = !isValid;
}

// Set submitting state
function setSubmittingState(submitting) {
    isSubmitting = submitting;
    submitBtn.disabled = submitting;
    btnText.textContent = submitting ? 'Posting...' : 'Post Message';
}

// Clear form
function clearForm() {
    messageInput.value = '';
    nameInput.value = '';
    categorySelect.value = 'general';
    charCount.textContent = '0';
    nameFeedback.textContent = '';
    nameFeedback.className = 'input-feedback';
    validateForm();
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    saveSettings();
}

// Toggle search
function toggleSearch() {
    const isHidden = searchBar.classList.contains('hidden');
    if (isHidden) {
        searchBar.classList.remove('hidden');
        searchBar.classList.add('fade-in');
        searchInput.focus();
    } else {
        searchBar.classList.add('hidden');
        searchInput.value = '';
        currentSearchTerm = '';
        updateFilteredMessages();
    }
}

// Handle search
function handleSearch() {
    currentSearchTerm = searchInput.value.toLowerCase();
    updateFilteredMessages();
    
    // Show/hide clear button
    if (currentSearchTerm) {
        searchClear.style.display = 'block';
    } else {
        searchClear.style.display = 'none';
    }
}

// Clear search
function clearSearch() {
    searchInput.value = '';
    currentSearchTerm = '';
    searchClear.style.display = 'none';
    updateFilteredMessages();
    searchInput.focus();
}

// Handle sorting
function handleSort() {
    currentSort = sortSelect.value;
    updateFilteredMessages();
    saveSettings();
}

// Handle filtering
function handleFilter() {
    currentFilter = filterSelect.value;
    updateFilteredMessages();
}

// Update filtered messages
function updateFilteredMessages() {
    filteredMessages = [...messages];
    
    // Apply search filter
    if (currentSearchTerm) {
        filteredMessages = filteredMessages.filter(msg => 
            msg.name.toLowerCase().includes(currentSearchTerm) ||
            msg.content.toLowerCase().includes(currentSearchTerm)
        );
    }
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filteredMessages = filteredMessages.filter(msg => msg.category === currentFilter);
    }
    
    // Apply sorting
    filteredMessages.sort((a, b) => {
        switch (currentSort) {
            case 'oldest':
                return a.timestamp - b.timestamp;
            case 'name':
                return a.name.localeCompare(b.name);
            default: // newest
                return b.timestamp - a.timestamp;
        }
    });
    
    // Reset pagination
    currentPage = 1;
    updateDisplayedMessages();
}

// Update displayed messages
function updateDisplayedMessages() {
    const startIndex = 0;
    const endIndex = currentPage * messagesPerPage;
    displayedMessages = filteredMessages.slice(startIndex, endIndex);
    
    updateMessagesDisplay();
    updateLoadMoreButton();
}

// Load more messages
function loadMoreMessages() {
    currentPage++;
    updateDisplayedMessages();
}

// Update the entire UI
function updateUI() {
    updateStats();
    updateFilteredMessages();
}

// Update stats section
function updateStats() {
    const messageCount = messages.length;
    const userCount = new Set(messages.map(msg => msg.name.toLowerCase())).size;
    const lastMsg = messages.length > 0 ? messages[0] : null;
    
    totalMessages.textContent = messageCount;
    uniqueUsers.textContent = userCount;
    lastActivity.textContent = lastMsg ? formatTime(lastMsg.timestamp) : 'Never';
    
    // Update messages title
    if (messageCount > 0) {
        messagesTitle.textContent = `Recent Messages (${messageCount})`;
    } else {
        messagesTitle.textContent = 'Recent Messages';
    }
}

// Update messages display
function updateMessagesDisplay() {
    if (displayedMessages.length === 0) {
        emptyState.style.display = 'block';
        messagesContainer.style.display = 'none';
        
        // Update empty state message based on filters
        const emptyTitle = emptyState.querySelector('h3');
        const emptyText = emptyState.querySelector('p');
        
        if (currentSearchTerm) {
            emptyTitle.textContent = 'No Search Results';
            emptyText.textContent = `No messages found for "${currentSearchTerm}". Try different keywords.`;
        } else if (currentFilter !== 'all') {
            const categoryName = categories[currentFilter]?.label || currentFilter;
            emptyTitle.textContent = 'No Messages in Category';
            emptyText.textContent = `No messages found in the ${categoryName} category yet.`;
        } else {
            emptyTitle.textContent = 'No Messages Yet';
            emptyText.textContent = 'Be the first to start a conversation in our community!';
        }
    } else {
        emptyState.style.display = 'none';
        messagesContainer.style.display = 'flex';
        renderMessages();
    }
}

// Update load more button
function updateLoadMoreButton() {
    const hasMore = displayedMessages.length < filteredMessages.length;
    if (hasMore) {
        loadMoreContainer.classList.remove('hidden');
        const remaining = filteredMessages.length - displayedMessages.length;
        loadMoreBtn.innerHTML = `
            Load More Messages (${remaining} remaining)
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 12,15 18,9"/>
            </svg>
        `;
    } else {
        loadMoreContainer.classList.add('hidden');
    }
}

// Render all messages
function renderMessages() {
    messagesContainer.innerHTML = '';
    
    displayedMessages.forEach((message, index) => {
        const messageElement = createMessageElement(message, index);
        messagesContainer.appendChild(messageElement);
    });
}

// Create a message element
function createMessageElement(message, index) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-card slide-in';
    messageDiv.style.animationDelay = `${index * 0.1}s`;
    
    // Highlight search matches
    const highlightedContent = highlightSearchTerm(message.content, currentSearchTerm);
    const highlightedName = highlightSearchTerm(message.name, currentSearchTerm);
    
    const category = categories[message.category] || categories.general;
    
    messageDiv.innerHTML = `
        <div class="message-header">
            <div class="message-avatar" style="background: linear-gradient(135deg, ${category.color}, ${category.color}dd)">
                ${message.name.charAt(0).toUpperCase()}
            </div>
            <div class="message-info">
                <h3>
                    ${highlightedName}
                    <span class="message-category">${category.icon} ${category.label}</span>
                </h3>
                <p>${formatTime(message.timestamp)}</p>
            </div>
            <div class="message-actions">
                <button class="message-action-btn" onclick="likeMessage('${message.id}')" title="Like message">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </button>
                <button class="message-action-btn danger" onclick="deleteMessage('${message.id}')" title="Delete message">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="message-content">
            ${highlightedContent}
        </div>
        ${message.likes > 0 ? `
            <div class="message-likes">
                <span>❤️ ${message.likes} ${message.likes === 1 ? 'like' : 'likes'}</span>
            </div>
        ` : ''}
    `;
    
    return messageDiv;
}

// Highlight search terms
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return escapeHtml(text);
    
    const escapedText = escapeHtml(text);
    const regex = new RegExp(`(${escapeHtml(searchTerm)})`, 'gi');
    return escapedText.replace(regex, '<mark>$1</mark>');
}

// Like message
function likeMessage(messageId) {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
        message.likes = (message.likes || 0) + 1;
        saveMessages();
        updateUI();
        showToast('Message liked!', 'success');
    }
}

// Delete message
function deleteMessage(messageId) {
    showConfirmation(
        'Delete Message',
        'Are you sure you want to delete this message? This action cannot be undone.',
        () => {
            messages = messages.filter(msg => msg.id !== messageId);
            saveMessages();
            updateUI();
            showToast('Message deleted successfully!', 'success');
        }
    );
}

// Clear all messages
function clearAllMessages() {
    messages = [];
    saveMessages();
    updateUI();
    showToast('All messages cleared!', 'success');
}

// Export messages
function exportMessages() {
    if (messages.length === 0) {
        showToast('No messages to export!', 'warning');
        return;
    }
    
    const exportData = {
        exportDate: new Date().toISOString(),
        totalMessages: messages.length,
        messages: messages.map(msg => ({
            name: msg.name,
            content: msg.content,
            category: msg.category,
            timestamp: new Date(msg.timestamp).toISOString(),
            likes: msg.likes || 0
        }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forum-messages-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Messages exported successfully!', 'success');
}

// Show confirmation modal
function showConfirmation(title, message, action) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    pendingAction = action;
    confirmationModal.classList.remove('hidden');
    confirmationModal.classList.add('fade-in');
}

// Hide confirmation modal
function hideConfirmation() {
    confirmationModal.classList.add('hidden');
    pendingAction = null;
}

// Confirm action
function confirmAction() {
    if (pendingAction) {
        pendingAction();
        pendingAction = null;
    }
    hideConfirmation();
}

// Show toast notification
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-${type === 'success' ? 'success' : type === 'warning' ? 'warning' : type === 'error' ? 'danger' : 'primary'});
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Simulate online users
function simulateOnlineUsers() {
    const updateOnlineCount = () => {
        const count = Math.floor(Math.random() * 10) + 1;
        onlineCount.textContent = count;
    };
    
    updateOnlineCount();
    setInterval(updateOnlineCount, 30000); // Update every 30 seconds
}

// Format timestamp
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    
    return date.toLocaleDateString();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add CSS for fadeOut animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes fadeOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100%); }
        }
        
        mark {
            background-color: var(--accent-warning);
            color: var(--text-primary);
            padding: 0.125rem 0.25rem;
            border-radius: var(--radius-sm);
        }
        
        .message-likes {
            margin-top: 0.75rem;
            padding-top: 0.75rem;
            border-top: 1px solid var(--border-color);
            font-size: 0.875rem;
            color: var(--text-muted);
        }
    </style>
`);