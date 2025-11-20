/**
 * Contact Page JavaScript
 * Handles contact form submission
 */

// Setup contact form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showError('Please fill in all required fields');
            return;
        }
        
        // Validate email
        if (!isValidEmail(formData.email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        setSubmitLoading(true);
        hideMessages();
        
        // Simulate form submission (replace with actual backend call)
        try {
            // Example using Formspree (replace with your endpoint)
            // await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(formData)
            // });
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showSuccess();
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showError('Failed to send message. Please try again later.');
        } finally {
            setSubmitLoading(false);
        }
    });
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Set submit button loading state
function setSubmitLoading(loading) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const submitText = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');
    
    if (!submitBtn) return;
    
    if (loading) {
        submitBtn.disabled = true;
        if (submitText) submitText.textContent = 'Sending...';
        if (submitLoader) submitLoader.classList.remove('hidden');
    } else {
        submitBtn.disabled = false;
        if (submitText) submitText.textContent = 'Send Message';
        if (submitLoader) submitLoader.classList.add('hidden');
    }
}

// Hide all messages
function hideMessages() {
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (successMessage) successMessage.classList.add('hidden');
    if (errorMessage) errorMessage.classList.add('hidden');
}

// Show success message
function showSuccess() {
    const successMessage = document.getElementById('successMessage');
    
    if (successMessage) {
        successMessage.classList.remove('hidden');
        
        // Scroll to message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }
    
    // Also show notification
    showNotification('Message sent successfully! I\'ll get back to you soon.');
}

// Show error message
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    if (errorMessage) {
        if (errorText) errorText.textContent = message;
        errorMessage.classList.remove('hidden');
        
        // Scroll to message
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 5000);
    }
    
    // Also show notification
    showNotification(message, 'error');
}

// Add input animations
function setupInputAnimations() {
    const inputs = document.querySelectorAll('.input-field');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupContactForm();
    setupInputAnimations();
});
