class EventGallery {
    constructor() {
        this.events = [];
        this.filteredEvents = [];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.userContributions = this.loadUserContributions();
        
        this.galleryGrid = document.getElementById('galleryGrid');
        this.loading = document.getElementById('loading');
        this.emptyState = document.getElementById('emptyState');
        this.searchInput = document.getElementById('searchInput');
        this.lightbox = document.getElementById('lightbox');
        this.uploadModal = document.getElementById('uploadModal');
        this.successMessage = document.getElementById('successMessage');
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadGalleryData();
        this.combineEvents();
        this.renderGallery();
        this.hideLoading();
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target);
                this.currentFilter = e.target.dataset.category;
                this.filterAndRender();
            });
        });

        // Search input
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase().trim();
            this.filterAndRender();
        });

        // Share button
        const shareBtn = document.getElementById('shareBtn');
        shareBtn.addEventListener('click', () => this.openUploadModal());

        // Upload modal events
        this.setupUploadModalEvents();

        // Lightbox events
        const lightboxBackdrop = document.getElementById('lightboxBackdrop');
        const lightboxClose = document.getElementById('lightboxClose');
        
        lightboxBackdrop.addEventListener('click', () => this.closeLightbox());
        lightboxClose.addEventListener('click', () => this.closeLightbox());
        
        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (!this.lightbox.classList.contains('hidden')) {
                    this.closeLightbox();
                } else if (!this.uploadModal.classList.contains('hidden')) {
                    this.closeUploadModal();
                }
            }
        });
    }

    setupUploadModalEvents() {
        const uploadBackdrop = document.getElementById('uploadBackdrop');
        const uploadClose = document.getElementById('uploadClose');
        const cancelUpload = document.getElementById('cancelUpload');
        const uploadForm = document.getElementById('uploadForm');
        const uploadZone = document.getElementById('uploadZone');
        const imageInput = document.getElementById('imageInput');
        const removeImage = document.getElementById('removeImage');

        // Modal close events
        uploadBackdrop.addEventListener('click', () => this.closeUploadModal());
        uploadClose.addEventListener('click', () => this.closeUploadModal());
        cancelUpload.addEventListener('click', () => this.closeUploadModal());

        // File upload events
        uploadZone.addEventListener('click', () => imageInput.click());
        uploadZone.addEventListener('dragover', this.handleDragOver.bind(this));
        uploadZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        uploadZone.addEventListener('drop', this.handleDrop.bind(this));
        
        imageInput.addEventListener('change', this.handleFileSelect.bind(this));
        removeImage.addEventListener('click', this.removeSelectedImage.bind(this));

        // Form submission
        uploadForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    async loadGalleryData() {
        try {
            const response = await fetch('gallery-data.json');
            if (!response.ok) {
                throw new Error('Failed to load gallery data');
            }
            this.events = await response.json();
        } catch (error) {
            console.error('Error loading gallery data:', error);
            this.showError('Failed to load gallery images. Please try again later.');
        }
    }

    loadUserContributions() {
        const stored = localStorage.getItem('eventMapprUserContributions');
        return stored ? JSON.parse(stored) : [];
    }

    saveUserContributions() {
        localStorage.setItem('eventMapprUserContributions', JSON.stringify(this.userContributions));
    }

    combineEvents() {
        this.filteredEvents = [...this.events, ...this.userContributions];
    }

    setActiveFilter(activeButton) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    filterAndRender() {
        const allEvents = [...this.events, ...this.userContributions];
        
        this.filteredEvents = allEvents.filter(event => {
            const matchesCategory = this.currentFilter === 'all' || event.category === this.currentFilter;
            const matchesSearch = this.searchQuery === '' || 
                event.title.toLowerCase().includes(this.searchQuery) ||
                event.category.toLowerCase().includes(this.searchQuery) ||
                event.caption.toLowerCase().includes(this.searchQuery) ||
                (event.userName && event.userName.toLowerCase().includes(this.searchQuery));
            
            return matchesCategory && matchesSearch;
        });

        this.renderGallery();
    }

    renderGallery() {
        if (this.filteredEvents.length === 0) {
            this.showEmptyState();
            return;
        }

        this.hideEmptyState();
        
        this.galleryGrid.innerHTML = '';
        
        this.filteredEvents.forEach((event, index) => {
            const galleryItem = this.createGalleryItem(event, index);
            this.galleryGrid.appendChild(galleryItem);
        });

        // Add stagger animation
        const items = this.galleryGrid.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    createGalleryItem(event, index) {
        const item = document.createElement('div');
        item.className = `gallery-item ${event.isUserContributed ? 'user-contributed' : ''}`;
        item.setAttribute('data-index', index);
        
        const authorInfo = event.userName ? `<div class="gallery-item-author">Shared by ${event.userName}</div>` : '';
        const userBadge = event.isUserContributed ? '<span class="user-badge">Community</span>' : '';
        
        item.innerHTML = `
            <img class="gallery-item-image" src="${event.imageUrl}" alt="${event.title}" loading="lazy">
            <div class="gallery-item-content">
                <div class="gallery-item-header">
                    <h3 class="gallery-item-title">${event.title}</h3>
                    <div style="display: flex; align-items: center;">
                        <span class="gallery-item-category">${event.category}</span>
                        ${userBadge}
                    </div>
                </div>
                <p class="gallery-item-caption">${event.caption}</p>
                ${authorInfo}
            </div>
        `;

        // Add click event for lightbox
        item.addEventListener('click', () => {
            this.openLightbox(event);
        });

        // Add error handling for images
        const img = item.querySelector('.gallery-item-image');
        img.addEventListener('error', () => {
            img.src = this.getPlaceholderImage();
            img.alt = 'Image not available';
        });

        return item;
    }

    openUploadModal() {
        this.uploadModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeUploadModal() {
        this.uploadModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.resetUploadForm();
    }

    resetUploadForm() {
        const form = document.getElementById('uploadForm');
        const uploadPreview = document.getElementById('uploadPreview');
        const uploadPlaceholder = document.getElementById('uploadPlaceholder');
        
        form.reset();
        uploadPreview.classList.add('hidden');
        uploadPlaceholder.classList.remove('hidden');
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    processFile(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB.');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewImage = document.getElementById('previewImage');
            const uploadPreview = document.getElementById('uploadPreview');
            const uploadPlaceholder = document.getElementById('uploadPlaceholder');

            previewImage.src = e.target.result;
            uploadPreview.classList.remove('hidden');
            uploadPlaceholder.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }

    removeSelectedImage() {
        const uploadPreview = document.getElementById('uploadPreview');
        const uploadPlaceholder = document.getElementById('uploadPlaceholder');
        const imageInput = document.getElementById('imageInput');

        uploadPreview.classList.add('hidden');
        uploadPlaceholder.classList.remove('hidden');
        imageInput.value = '';
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const imageInput = document.getElementById('imageInput');
        
        if (!imageInput.files[0]) {
            alert('Please select an image to share.');
            return;
        }

        // Create new event object
        const newEvent = {
            title: formData.get('title'),
            category: formData.get('category'),
            caption: formData.get('caption'),
            userName: formData.get('userName') || 'Anonymous',
            imageUrl: document.getElementById('previewImage').src,
            isUserContributed: true,
            timestamp: new Date().toISOString()
        };

        // Add to user contributions
        this.userContributions.unshift(newEvent);
        this.saveUserContributions();

        // Update display
        this.combineEvents();
        this.filterAndRender();

        // Close modal and show success
        this.closeUploadModal();
        this.showSuccessMessage();
    }

    showSuccessMessage() {
        this.successMessage.classList.remove('hidden');
        
        setTimeout(() => {
            this.successMessage.classList.add('hidden');
        }, 4000);
    }

    openLightbox(event) {
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxCategory = document.getElementById('lightboxCategory');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const lightboxAuthor = document.getElementById('lightboxAuthor');

        lightboxImage.src = event.imageUrl;
        lightboxImage.alt = event.title;
        lightboxTitle.textContent = event.title;
        lightboxCategory.textContent = event.category;
        lightboxCaption.textContent = event.caption;
        
        if (event.userName) {
            lightboxAuthor.textContent = `Shared by ${event.userName}`;
            lightboxAuthor.style.display = 'block';
        } else {
            lightboxAuthor.style.display = 'none';
        }

        this.lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            this.lightbox.style.opacity = '1';
        }, 10);
    }

    closeLightbox() {
        this.lightbox.style.opacity = '0';
        
        setTimeout(() => {
            this.lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    showEmptyState() {
        this.galleryGrid.innerHTML = '';
        this.emptyState.classList.remove('hidden');
    }

    hideEmptyState() {
        this.emptyState.classList.add('hidden');
    }

    hideLoading() {
        this.loading.style.display = 'none';
    }

    showError(message) {
        this.hideLoading();
        this.galleryGrid.innerHTML = `
            <div class="error-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" class="error-icon">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
                </svg>
                <h3>Oops! Something went wrong</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="retry-btn">Try Again</button>
            </div>
        `;
    }

    getPlaceholderImage() {
        // Return a data URL for a simple placeholder
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNEE1NTY4Ii8+CjxyZWN0IHg9IjE1MCIgeT0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjEwIiBmaWxsPSIjNjI3Mjg2Ii8+CjxjaXJjbGUgY3g9IjE3NSIgY3k9IjEyNSIgcj0iMTUiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTE3MCA1MEwxODAgNTBMMTkwIDYwTDE5MCA3MEwxODAgODBMMTcwIDgwTDE2MCA3MEwxNjAgNjBMMTcwIDUwWiIgZmlsbD0iIzlDQTRBRiIvPgo8L3N2Zz4K';
    }
}

// Additional CSS for error state
const errorStateCSS = `
    .error-state {
        text-align: center;
        padding: 4rem 0;
        color: #A0AEC0;
        grid-column: 1 / -1;
    }

    .error-icon {
        color: #E53E3E;
        margin-bottom: 1rem;
    }

    .error-state h3 {
        font-size: 1.5rem;
        color: #CBD5E0;
        margin-bottom: 0.5rem;
    }

    .retry-btn {
        margin-top: 1rem;
        padding: 0.75rem 1.5rem;
        background: #F6E05E;
        color: #2D3748;
        border: none;
        border-radius: 2rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .retry-btn:hover {
        background: #ECC94B;
        transform: translateY(-2px);
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = errorStateCSS;
document.head.appendChild(style);

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EventGallery();
});

// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});