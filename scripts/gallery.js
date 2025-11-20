/**
 * Gallery Page JavaScript
 * Handles loading and displaying gallery images with lightbox
 */

let allImages = [];
let currentImageIndex = 0;

// Load and display gallery images
async function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const loadingState = document.getElementById('loadingState');
    const noImages = document.getElementById('noImages');
    
    try {
        const response = await fetch('data/gallery.json');
        if (!response.ok) throw new Error('Failed to load gallery');
        
        allImages = await response.json();
        
        // Hide loading state
        if (loadingState) loadingState.classList.add('hidden');
        
        // Display images
        if (allImages.length === 0) {
            if (noImages) noImages.classList.remove('hidden');
        } else {
            displayGallery(allImages);
        }
        
    } catch (error) {
        console.error('Error loading gallery:', error);
        if (loadingState) loadingState.classList.add('hidden');
        if (noImages) {
            noImages.classList.remove('hidden');
            noImages.innerHTML = `
                <i class="fas fa-exclamation-triangle text-6xl text-purple-500/30 mb-4"></i>
                <p class="text-xl text-purple-200">Failed to load gallery</p>
                <p class="text-gray-400 mt-2">Please check your connection and try again</p>
            `;
        }
    }
}

// Display gallery images
function displayGallery(images) {
    const galleryGrid = document.getElementById('galleryGrid');
    const noImages = document.getElementById('noImages');
    
    if (!galleryGrid) return;
    
    if (images.length === 0) {
        galleryGrid.classList.add('hidden');
        if (noImages) noImages.classList.remove('hidden');
        return;
    }
    
    galleryGrid.classList.remove('hidden');
    if (noImages) noImages.classList.add('hidden');
    
    galleryGrid.innerHTML = images.map((image, index) => `
        <div class="gallery-item" onclick="openLightbox(${index})">
            <img src="${image.url}" alt="${image.title}" loading="lazy">
            <div class="gallery-item-overlay">
                <h3 class="text-xl font-bold text-white mb-2">${image.title}</h3>
                <p class="text-purple-200 text-sm">${image.description || ''}</p>
            </div>
        </div>
    `).join('');
    
    // Add staggered fade-in animation
    const items = galleryGrid.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    
    if (!lightbox) return;
    
    displayLightboxImage(currentImageIndex);
    lightbox.classList.remove('hidden');
    lightbox.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (!lightbox) return;
    
    lightbox.classList.add('hidden');
    lightbox.classList.remove('show');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Display image in lightbox
function displayLightboxImage(index) {
    const image = allImages[index];
    
    if (!image) return;
    
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    
    if (lightboxImage) {
        lightboxImage.src = image.url;
        lightboxImage.alt = image.title;
    }
    
    if (lightboxTitle) {
        lightboxTitle.textContent = image.title;
    }
    
    if (lightboxDescription) {
        lightboxDescription.textContent = image.description || '';
    }
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    displayLightboxImage(currentImageIndex);
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    displayLightboxImage(currentImageIndex);
}

// Setup lightbox controls
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeLightboxBtn = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    
    // Close button
    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', closeLightbox);
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevImage();
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextImage();
        });
    }
    
    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || lightbox.classList.contains('hidden')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    setupLightbox();
});
