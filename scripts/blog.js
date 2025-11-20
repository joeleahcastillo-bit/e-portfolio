/**
 * Blog Page JavaScript
 * Handles loading and filtering blog posts from blogs.json
 */

let allBlogs = [];

// Load and display blog posts
async function loadBlogs() {
    const blogGrid = document.getElementById('blogGrid');
    const loadingState = document.getElementById('loadingState');
    const noPosts = document.getElementById('noPosts');
    
    try {
        const response = await fetch('data/blogs.json');
        if (!response.ok) throw new Error('Failed to load blogs');
        
        allBlogs = await response.json();
        
        // Hide loading state
        if (loadingState) loadingState.classList.add('hidden');
        
        // Display blogs
        if (allBlogs.length === 0) {
            if (noPosts) noPosts.classList.remove('hidden');
        } else {
            displayBlogs(allBlogs);
        }
        
    } catch (error) {
        console.error('Error loading blogs:', error);
        if (loadingState) loadingState.classList.add('hidden');
        if (noPosts) {
            noPosts.classList.remove('hidden');
            noPosts.innerHTML = `
                <i class="fas fa-exclamation-triangle text-6xl text-purple-500/30 mb-4"></i>
                <p class="text-xl text-purple-200">Failed to load blog posts</p>
                <p class="text-gray-400 mt-2">Please check your connection and try again</p>
            `;
        }
    }
}

// Display blogs in grid
function displayBlogs(blogs) {
    const blogGrid = document.getElementById('blogGrid');
    const noPosts = document.getElementById('noPosts');
    
    if (!blogGrid) return;
    
    if (blogs.length === 0) {
        blogGrid.classList.add('hidden');
        if (noPosts) noPosts.classList.remove('hidden');
        return;
    }
    
    blogGrid.classList.remove('hidden');
    if (noPosts) noPosts.classList.add('hidden');
    
    blogGrid.innerHTML = blogs.map(blog => `
        <article class="blog-card" onclick="window.location.href='blog-template.html?id=${blog.id}'">
            <div class="overflow-hidden">
                <img src="${blog.thumbnail}" alt="${blog.title}" class="w-full h-48 object-cover">
            </div>
            <div class="p-6">
                <div class="flex items-center gap-2 text-sm text-purple-200 mb-3">
                    <i class="far fa-calendar"></i>
                    <span>${formatDate(blog.date)}</span>
                    <span class="mx-2">•</span>
                    <i class="far fa-clock"></i>
                    <span>${blog.readTime}</span>
                </div>
                
                <h3 class="text-2xl font-bold mb-3 text-white hover:text-purple-400 transition-colors">
                    ${blog.title}
                </h3>
                
                <p class="text-gray-300 mb-4 line-clamp-3">
                    ${blog.description}
                </p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${blog.tags.map(tag => `
                        <span class="tag-badge">${tag}</span>
                    `).join('')}
                </div>
                
                <div class="flex items-center justify-between">
                    <span class="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                        Read More →
                    </span>
                </div>
            </div>
        </article>
    `).join('');
    
    // Add fade-in animation to cards
    const cards = blogGrid.querySelectorAll('.blog-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Filter blogs by tag
function filterBlogs(tag) {
    if (tag === 'all') {
        displayBlogs(allBlogs);
    } else {
        const filtered = allBlogs.filter(blog => 
            blog.tags.some(t => t.toLowerCase() === tag.toLowerCase())
        );
        displayBlogs(filtered);
    }
}

// Setup filter buttons
function setupFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            tag.classList.add('active');
            
            // Filter blogs
            const filter = tag.getAttribute('data-filter');
            filterBlogs(filter);
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadBlogs();
    setupFilters();
});
