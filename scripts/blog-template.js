/**
 * Blog Template JavaScript
 * Handles loading and displaying individual blog posts
 */

// Load blog post based on URL parameter
async function loadBlogPost() {
    const postId = getUrlParameter('id');
    
    if (!postId) {
        showPostNotFound();
        return;
    }
    
    const loadingPost = document.getElementById('loadingPost');
    const postContent = document.getElementById('postContent');
    const postNotFound = document.getElementById('postNotFound');
    
    try {
        const response = await fetch('data/blogs.json');
        if (!response.ok) throw new Error('Failed to load blog data');
        
        const blogs = await response.json();
        const post = blogs.find(b => b.id === postId);
        
        if (loadingPost) loadingPost.classList.add('hidden');
        
        if (!post) {
            showPostNotFound();
            return;
        }
        
        displayBlogPost(post);
        
    } catch (error) {
        console.error('Error loading blog post:', error);
        if (loadingPost) loadingPost.classList.add('hidden');
        showPostNotFound();
    }
}

// Display blog post
function displayBlogPost(post) {
    const postContent = document.getElementById('postContent');
    const postNotFound = document.getElementById('postNotFound');
    
    if (!postContent) return;
    
    postContent.classList.remove('hidden');
    if (postNotFound) postNotFound.classList.add('hidden');
    
    // Update page title
    document.title = `${post.title} - Jo's Portfolio`;
    document.getElementById('blogTitle').textContent = `${post.title} - Jo's Portfolio`;
    
    // Update thumbnail
    const thumbnail = document.getElementById('postThumbnail');
    if (thumbnail) {
        thumbnail.src = post.thumbnail;
        thumbnail.alt = post.title;
    }
    
    // Update title
    const title = document.getElementById('postTitle');
    if (title) title.textContent = post.title;
    
    // Update date
    const date = document.getElementById('postDate');
    if (date) date.textContent = formatDate(post.date);
    
    // Update read time
    const readTime = document.getElementById('postReadTime');
    if (readTime) readTime.textContent = post.readTime;
    
    // Update tags
    const tagsContainer = document.getElementById('postTags');
    if (tagsContainer) {
        tagsContainer.innerHTML = post.tags.map(tag => `
            <span class="tag-badge">${tag}</span>
        `).join('');
    }
    
    // Update body content
    const body = document.getElementById('postBody');
    if (body) {
        body.innerHTML = post.content;
        
        // Highlight code blocks if they exist
        if (typeof hljs !== 'undefined') {
            body.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }
    }
    
    // Setup share buttons
    setupShareButtons(post);
    
    // Add smooth fade-in animation
    postContent.style.opacity = '0';
    postContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
        postContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        postContent.style.opacity = '1';
        postContent.style.transform = 'translateY(0)';
    }, 10);
}

// Show post not found
function showPostNotFound() {
    const loadingPost = document.getElementById('loadingPost');
    const postContent = document.getElementById('postContent');
    const postNotFound = document.getElementById('postNotFound');
    
    if (loadingPost) loadingPost.classList.add('hidden');
    if (postContent) postContent.classList.add('hidden');
    if (postNotFound) postNotFound.classList.remove('hidden');
}

// Setup share buttons
function setupShareButtons(post) {
    const currentUrl = window.location.href;
    const title = post.title;
    const description = post.description;
    
    // Twitter share
    const shareTwitter = document.getElementById('shareTwitter');
    if (shareTwitter) {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
        shareTwitter.href = twitterUrl;
    }
    
    // Facebook share
    const shareFacebook = document.getElementById('shareFacebook');
    if (shareFacebook) {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        shareFacebook.href = facebookUrl;
    }
    
    // LinkedIn share
    const shareLinkedIn = document.getElementById('shareLinkedIn');
    if (shareLinkedIn) {
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        shareLinkedIn.href = linkedInUrl;
    }
    
    // Copy link button
    const copyLink = document.getElementById('copyLink');
    if (copyLink) {
        copyLink.addEventListener('click', async () => {
            const success = await copyToClipboard(currentUrl);
            if (success) {
                showNotification('Link copied to clipboard!');
                copyLink.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyLink.innerHTML = '<i class="fas fa-link"></i>';
                }, 2000);
            } else {
                showNotification('Failed to copy link', 'error');
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPost();
});
