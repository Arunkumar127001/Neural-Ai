// Neural AI - Main JavaScript File

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initAnimations();
    initContactForm();
    initSmoothScroll();
    initFaqAccordion();
    initPricingToggle();
    initCookieConsent();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        mobileMenu.classList.toggle('hidden');
    });
}

// Animation on scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    if (animatedElements.length === 0) return;
    
    // Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create the observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each element
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate form fields
        if (!name || !email || !message) {
            showFormMessage('Please fill out all fields', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loader"></span>';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(function() {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            
            // Show success message
            showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        }, 1500);
    });
    
    function showFormMessage(message, type) {
        const messageElement = document.getElementById('form-message');
        
        if (!messageElement) return;
        
        messageElement.textContent = message;
        messageElement.className = type === 'error' ? 'text-red-600' : 'text-green-600';
        messageElement.classList.remove('hidden');
        
        // Hide message after 5 seconds
        setTimeout(function() {
            messageElement.classList.add('hidden');
        }, 5000);
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Use native smooth scrolling if supported
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}

// FAQ accordion functionality
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = this.classList.contains('active');
            
            // Close all other answers
            faqQuestions.forEach(q => {
                if (q !== this && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = '0';
                    q.nextElementSibling.style.opacity = '0';
                    q.nextElementSibling.style.marginBottom = '0';
                }
            });
            
            // Toggle current answer
            if (isOpen) {
                this.classList.remove('active');
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                answer.style.marginBottom = '0';
            } else {
                this.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                answer.style.marginBottom = '1.5rem';
            }
        });
    });
    
    // Open first FAQ by default if exists
    if (faqQuestions.length > 0) {
        faqQuestions[0].click();
    }
}

// Pricing toggle functionality
function initPricingToggle() {
    const pricingToggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    const toggleLabels = document.querySelectorAll('.toggle-label');
    
    if (!pricingToggle) return;
    
    pricingToggle.addEventListener('change', function() {
        const isAnnual = this.checked;
        
        // Toggle price visibility
        monthlyPrices.forEach(price => {
            price.classList.toggle('hidden', isAnnual);
        });
        
        annualPrices.forEach(price => {
            price.classList.toggle('hidden', !isAnnual);
        });
        
        // Toggle active state on labels
        if (toggleLabels.length === 2) {
            toggleLabels[0].classList.toggle('font-bold', !isAnnual);
            toggleLabels[0].classList.toggle('text-neutral-800', !isAnnual);
            toggleLabels[0].classList.toggle('text-neutral-500', isAnnual);
            
            toggleLabels[1].classList.toggle('font-bold', isAnnual);
            toggleLabels[1].classList.toggle('text-neutral-800', isAnnual);
            toggleLabels[1].classList.toggle('text-neutral-500', !isAnnual);
        }
    });
}

// Cookie consent functionality
function initCookieConsent() {
    const cookieConsent = localStorage.getItem('neural_ai_cookie_consent');
    
    if (cookieConsent) return;
    
    // Create cookie banner element
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    
    const bannerContent = `
        <div>
            <p class="mb-0">We use cookies to enhance your experience on our website. By continuing to browse, you agree to our 
                <a href="/cookies.html" class="text-primary-600 hover:underline">Cookie Policy</a>.
            </p>
        </div>
        <div class="cookie-banner-buttons">
            <button id="cookie-accept" class="btn-primary">Accept</button>
            <button id="cookie-decline" class="btn-outline-primary">Customize</button>
        </div>
    `;
    
    banner.innerHTML = bannerContent;
    document.body.appendChild(banner);
    
    // Add event listeners to buttons
    document.getElementById('cookie-accept').addEventListener('click', function() {
        localStorage.setItem('neural_ai_cookie_consent', 'accepted');
        banner.remove();
    });
    
    document.getElementById('cookie-decline').addEventListener('click', function() {
        window.location.href = '/cookies.html';
    });
}

// Ensure links to other pages work correctly
const ensureLinksWork = function() {
    const allLinks = document.querySelectorAll('a[href]');
    
    allLinks.forEach(link => {
        // Make sure links to files don't have # or javascript:void(0)
        const href = link.getAttribute('href');
        if (href === '#' || href === 'javascript:void(0)') {
            // For links in footer that don't have specific pages yet
            if (link.closest('footer')) {
                const text = link.textContent.trim().toLowerCase();
                if (text === 'about') {
                    link.setAttribute('href', 'about.html');
                } else if (text === 'careers') {
                    link.setAttribute('href', 'careers.html');
                } else if (text === 'cookie policy') {
                    link.setAttribute('href', 'cookies.html');
                }
            }
        }
    });
};

// Ensure all links work
ensureLinksWork();
