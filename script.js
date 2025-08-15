// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initEmailForms();
    initSmoothScrolling();
    initAnimations();
    initTerminalAnimation();
    initMobileMenu();
    updateWaitlistCounter();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Formspree form handling
function initEmailForms() {
    // Dashboard tab functionality
    initDashboardTabs();

    // Initialize Formspree forms
    initFormspreeForms();
}

// Formspree form handling
function initFormspreeForms() {
    const heroForm = document.getElementById('hero-formspree-form');
    const footerForm = document.getElementById('footer-formspree-form');

    // Handle hero form submission
    if (heroForm) {
        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormspreeSubmission(this, 'hero');
        });
    }

    // Handle footer form submission
    if (footerForm) {
        footerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormspreeSubmission(this, 'footer');
        });
    }

    // Add real-time email validation
    const emailInputs = document.querySelectorAll('#hero-email, #footer-email');
    emailInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateEmailInput(this);
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--accent-primary)';
        });

        input.addEventListener('blur', function() {
            validateEmailInput(this);
        });
    });
}

// Handle Formspree form submission
function handleFormspreeSubmission(form, source) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const email = emailInput.value.trim();

    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitButton.disabled = true;

    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            source: source
        })
    })
    .then(response => {
        if (response.ok) {
            // Success
            showNotification('🎉 Welcome to SIRAS! You\'re now on our exclusive waitlist. We\'ll notify you when we launch!', 'success');
            emailInput.value = '';
            updateWaitlistCounter();
            trackEvent('formspree_signup_success', { source, email });
            
            // Show additional info after success
            setTimeout(() => {
                showNotification('💡 Pro tip: Follow us on GitHub for the latest updates and early access to new features!', 'info');
            }, 3000);
        } else {
            // Error
            showNotification('Sorry, there was an error. Please try again.', 'error');
        }
    })
    .catch(error => {
        console.error('Formspree submission error:', error);
        showNotification('Sorry, there was an error. Please try again.', 'error');
    })
    .finally(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced email validation with better feedback
function validateEmailInput(input) {
    const email = input.value.trim();
    const isValid = isValidEmail(email);
    
    // Visual feedback
    if (email === '') {
        input.style.borderColor = 'var(--border-color)';
        return false;
    } else if (isValid) {
        input.style.borderColor = 'var(--accent-success)';
        return true;
    } else {
        input.style.borderColor = 'var(--accent-error)';
        return false;
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4757' : '#00d4ff'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        max-width: 400px;
        font-weight: 500;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.benefit-card, .feature-card, .step, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Terminal animation
function initTerminalAnimation() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    let delay = 0;

    terminalLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, delay);
        
        delay += 300;
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    navToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--bg-primary)';
            navLinks.style.borderTop = '1px solid var(--border-color)';
            navLinks.style.padding = '1rem';
            navLinks.style.gap = '1rem';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            isMenuOpen = false;
            navLinks.style.display = 'none';
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroContent && heroVisual) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate * 0.5}px)`;
        heroVisual.style.transform = `translateY(${rate * 0.3}px)`;
    }
});

// Typing effect for terminal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect for terminal command
setTimeout(() => {
    const commandElement = document.querySelector('.command');
    if (commandElement) {
        const originalText = commandElement.textContent;
        typeWriter(commandElement, originalText, 50);
    }
}, 2000);

// Dashboard tab functionality
function initDashboardTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Dashboard button functionality
function initDashboardButtons() {
    const startTrialBtn = document.querySelector('.btn-primary');
    const newSimulationBtn = document.querySelector('.btn-secondary');
    
    if (startTrialBtn) {
        startTrialBtn.addEventListener('click', function() {
            const email = prompt('Enter your email to start your free trial:');
            if (email && isValidEmail(email)) {
                handleEmailSubmission(email, 'trial');
                showNotification('Free trial activated! Check your email for login details.', 'success');
            }
        });
    }
    
    if (newSimulationBtn) {
        newSimulationBtn.addEventListener('click', function() {
            showNotification('New simulation feature coming soon!', 'info');
        });
    }
}

// Initialize dashboard buttons
initDashboardButtons();

// Update waitlist counter display
function updateWaitlistCounter() {
    const subscribers = JSON.parse(localStorage.getItem('siras_subscribers') || '[]');
    const count = subscribers.length;
    
    // Add some demo subscribers for better UX
    const demoCount = Math.max(count, 247);
    
    const heroCounter = document.getElementById('waitlist-count');
    const footerCounter = document.getElementById('footer-waitlist-count');
    
    if (heroCounter) {
        heroCounter.textContent = `${demoCount}+`;
    }
    
    if (footerCounter) {
        footerCounter.textContent = `${demoCount}+`;
    }
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
    });
});

// Performance optimization: Lazy loading for sections
const lazySections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, { threshold: 0.1 });

lazySections.forEach(section => {
    sectionObserver.observe(section);
});

// Add CSS for loaded sections
const style = document.createElement('style');
style.textContent = `
    section.loaded {
        animation: fadeInUp 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// Analytics tracking (replace with actual analytics)
function trackEvent(eventName, properties = {}) {
    // Replace with your analytics service (Google Analytics, Mixpanel, etc.)
    console.log('Event tracked:', eventName, properties);
}

// Track important user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('#hero-submit, #footer-submit')) {
        trackEvent('formspree_subscription_attempted', {
            source: e.target.closest('.hero') ? 'hero' : 'footer'
        });
    }
    
    if (e.target.matches('.btn-primary')) {
        trackEvent('free_trial_requested');
    }
    
    if (e.target.matches('.btn-secondary')) {
        trackEvent('new_simulation_clicked');
    }
    
    if (e.target.matches('.github-link')) {
        trackEvent('github_clicked');
    }
    
    if (e.target.matches('.nav-tab')) {
        trackEvent('dashboard_tab_clicked', {
            tab: e.target.getAttribute('data-tab')
        });
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus on email input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const emailInput = document.getElementById('hero-email');
        if (emailInput) {
            emailInput.focus();
        }
    }
    
    // Escape to close notifications
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add meta theme color for mobile browsers
const metaThemeColor = document.createElement('meta');
metaThemeColor.name = 'theme-color';
metaThemeColor.content = '#0a0a0a';
document.head.appendChild(metaThemeColor);
