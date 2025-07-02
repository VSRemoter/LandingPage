// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navCta = document.querySelector('.nav-cta');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navCta.classList.toggle('active');
        });
    }

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .step');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const heroStats = document.querySelector('.hero-stats');

    if (heroTitle) {
        setTimeout(() => heroTitle.classList.add('visible'), 300);
    }
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.classList.add('visible'), 600);
    }
    if (heroCta) {
        setTimeout(() => heroCta.classList.add('visible'), 900);
    }
    if (heroStats) {
        setTimeout(() => heroStats.classList.add('visible'), 1200);
    }

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Testimonial card animations
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in');
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPercentage = finalValue.includes('%');
                const isTime = finalValue.includes('/');
                
                if (isPercentage) {
                    animateCounter(target, 0, parseInt(finalValue), '%');
                } else if (isTime) {
                    target.textContent = finalValue; // Don't animate time values
                } else {
                    animateCounter(target, 0, parseInt(finalValue), 'x');
                }
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // Smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });

    // Particle effect for hero section
    createParticles();

    // Form interactions (if any forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    });

    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Counter animation function
function animateCounter(element, start, end, suffix) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutQuart(progress);
        const current = Math.floor(start + (end - start) * easeProgress);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Easing function
function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// Particle effect for hero section
function createParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heroSection.appendChild(particle);
        particles.push(particle);
    }
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Stripe Checkout Integration
async function openStripeCheckout() {
    try {
        // Show loading state
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;

        // Get user email (you can prompt for this or get it from a form)
        const email = prompt('Please enter your email address:');
        if (!email) {
            button.textContent = originalText;
            button.disabled = false;
            return;
        }

        // Create checkout session
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error('Failed to create checkout session');
        }

        const { sessionId } = await response.json();

        // Redirect to Stripe Checkout
        const stripe = Stripe('pk_test_51RgFlEIsm2NP1VPNrYR6KE80I8Ci4OKOWuQaz0NhB1aUSWHLi1KM9stp5vkToRQrPxhPZhNp9aUJPqbmdyzFrCDI00DvZwOpR7');
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
            throw new Error(error.message);
        }

    } catch (error) {
        console.error('Checkout error:', error);
        alert('Error starting checkout: ' + error.message);
        
        // Reset button state
        const button = event.target;
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Add click handlers to Pro plan buttons
document.addEventListener('DOMContentLoaded', function() {
    const proButtons = document.querySelectorAll('.btn-primary[onclick*="openPaymentModal"]');
    proButtons.forEach(button => {
        button.removeAttribute('onclick');
        button.addEventListener('click', openStripeCheckout);
    });
});

// Add CSS for additional animations
const additionalStyles = `
    @keyframes particle-float {
        0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
        }
        50% { 
            transform: translateY(-30px) translateX(15px);
            opacity: 0.6;
        }
    }

    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
    }

    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .navbar.scrolled {
        background: rgba(13, 13, 13, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    .hero-title, .hero-subtitle, .hero-cta, .hero-stats {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }

    .hero-title.visible, .hero-subtitle.visible, .hero-cta.visible, .hero-stats.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .slide-in-left {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s ease-out;
    }

    .slide-in-left.visible {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-in-right {
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.6s ease-out;
    }

    .slide-in-right.visible {
        opacity: 1;
        transform: translateX(0);
    }

    @media (max-width: 768px) {
        .nav-menu.active, .nav-cta.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            border-top: 1px solid var(--gray-200);
            padding: var(--spacing-lg);
            gap: var(--spacing-md);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);



// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = `
    body:not(.loaded) {
        overflow: hidden;
    }

    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--white);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border: 3px solid var(--gray-200);
        border-top: 3px solid var(--primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
    }

    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;

const loadingStyleSheet = document.createElement('style');
loadingStyleSheet.textContent = loadingStyles;
document.head.appendChild(loadingStyleSheet);

// Stripe Checkout Integration
async function openStripeCheckout() {
    try {
        // Show loading state
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;

        // Get user email
        const email = prompt('Please enter your email address:');
        if (!email) {
            button.textContent = originalText;
            button.disabled = false;
            return;
        }

        // Create checkout session
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error('Failed to create checkout session');
        }

        const { sessionId } = await response.json();

        // Redirect to Stripe Checkout
        const stripe = Stripe('pk_test_51RgFlEIsm2NP1VPNrYR6KE80I8Ci4OKOWuQaz0NhB1aUSWHLi1KM9stp5vkToRQrPxhPZhNp9aUJPqbmdyzFrCDI00DvZwOpR7');
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
            throw new Error(error.message);
        }

    } catch (error) {
        console.error('Checkout error:', error);
        alert('Error starting checkout: ' + error.message);
        
        // Reset button state
        const button = event.target;
        button.textContent = originalText;
        button.disabled = false;
    }
} 