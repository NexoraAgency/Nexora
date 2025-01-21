// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced intersection observer with stagger effect
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections and their children
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
    section.querySelectorAll('.expertise-item, .footer-col').forEach(item => {
        observer.observe(item);
    });
});

// Service Type and Pricing Toggles
document.addEventListener('DOMContentLoaded', function() {
    // Service Type Toggle
    const serviceButtons = document.querySelectorAll('.service-type-toggle button');
    const pricingSections = document.querySelectorAll('.pricing-section');

    if (serviceButtons.length > 0) {
        serviceButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update button states
                serviceButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Show corresponding section
                const serviceType = button.dataset.service;
                pricingSections.forEach(section => {
                    if (section.id === `${serviceType}-packages`) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }

    // Pricing Toggle (Monthly/One-time)
    const toggleSwitch = document.querySelector('.toggle-switch');
    const monthlySpan = document.querySelector('.pricing-toggle span:first-child');
    const yearlySpan = document.querySelector('.pricing-toggle span:last-child');
    const priceWrappers = document.querySelectorAll('.price-wrapper');

    if (toggleSwitch) {
        toggleSwitch.addEventListener('click', function() {
            // Toggle active states for the switch and text
            this.classList.toggle('yearly');
            monthlySpan.classList.toggle('active');
            yearlySpan.classList.toggle('active');
            
            // Toggle price display
            priceWrappers.forEach(wrapper => {
                const monthlyPrice = wrapper.querySelector('.monthly-price');
                const yearlyPrice = wrapper.querySelector('.yearly-price');
                
                if (monthlyPrice && yearlyPrice) {
                    if (this.classList.contains('yearly')) {
                        monthlyPrice.style.transform = 'translateY(-50px)';
                        monthlyPrice.style.opacity = '0';
                        yearlyPrice.style.transform = 'translateY(0)';
                        yearlyPrice.style.opacity = '1';
                    } else {
                        monthlyPrice.style.transform = 'translateY(0)';
                        monthlyPrice.style.opacity = '1';
                        yearlyPrice.style.transform = 'translateY(50px)';
                        yearlyPrice.style.opacity = '0';
                    }
                }
            });
        });
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// Mobile menu animation
const menuToggle = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (menuToggle && navbarCollapse) {
    menuToggle.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show');
    });
}

// Form interaction animations
const formInputs = document.querySelectorAll('.form-control');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    input.addEventListener('blur', () => {
        gsap.to(input, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Form Validation
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
});

// Enhanced mobile menu
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Add scroll to top button and handle package slider
document.addEventListener('DOMContentLoaded', function() {
    // Create and append scroll to top button
    const scrollButton = document.createElement('a');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.href = '#';
    document.body.appendChild(scrollButton);

    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    scrollButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Package Slider Enhancement
    if (window.innerWidth <= 768) {
        const pricingRow = document.querySelector('.pricing-section .row');
        if (pricingRow) {
            // Force row to be a slider
            pricingRow.style.display = 'flex';
            pricingRow.style.flexWrap = 'nowrap';
            pricingRow.style.overflowX = 'auto';

            // Center middle package on load
            const centerPackage = () => {
                const packages = pricingRow.querySelectorAll('.col-lg-4');
                if (packages.length > 1) {
                    // Always center the Growth package (index 1)
                    const growthIndex = 1; // Growth package is at index 1
                    const packageWidth = packages[0].offsetWidth;
                    const scrollPosition = (packageWidth * growthIndex) - 
                        (pricingRow.offsetWidth - packageWidth) / 2;
                    
                    // Set initial scroll position
                    pricingRow.scrollTo({
                        left: scrollPosition,
                        behavior: 'instant'
                    });

                    // Update dots to show Growth package as active
                    const dots = document.querySelectorAll('.slider-dot');
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === growthIndex);
                    });
                }
            };

            // Call immediately and after a short delay to ensure proper positioning
            centerPackage();
            setTimeout(centerPackage, 100);

            // Create and append dots
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'slider-dots';
            
            const packages = pricingRow.querySelectorAll('.col-lg-4');
            packages.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
                dotsContainer.appendChild(dot);
            });
            
            pricingRow.parentElement.appendChild(dotsContainer);
            const dots = dotsContainer.querySelectorAll('.slider-dot');

            // Update dots based on scroll position
            const updateDots = () => {
                const scrollPercentage = pricingRow.scrollLeft / (pricingRow.scrollWidth - pricingRow.clientWidth);
                const activeIndex = Math.round(scrollPercentage * (packages.length - 1));
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === activeIndex);
                });
            };

            // Scroll event listener for updating dots
            pricingRow.addEventListener('scroll', () => {
                requestAnimationFrame(updateDots);
            });

            // Touch events
            let startX;
            let scrollLeft;

            pricingRow.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - pricingRow.offsetLeft;
                scrollLeft = pricingRow.scrollLeft;
            });

            pricingRow.addEventListener('touchend', () => {
                const packageWidth = pricingRow.querySelector('.col-lg-4').offsetWidth;
                const nearestPackage = Math.round(pricingRow.scrollLeft / packageWidth);
                
                pricingRow.scrollTo({
                    left: nearestPackage * packageWidth,
                    behavior: 'smooth'
                });
            });

            pricingRow.addEventListener('touchmove', (e) => {
                const x = e.touches[0].pageX - pricingRow.offsetLeft;
                const walk = (x - startX);
                pricingRow.scrollLeft = scrollLeft - walk;
            });

            // Click on dots to navigate
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    const packageWidth = pricingRow.querySelector('.col-lg-4').offsetWidth;
                    pricingRow.scrollTo({
                        left: index * packageWidth,
                        behavior: 'smooth'
                    });
                });
            });
        }
    }
});

// Update active nav link based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === '#')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});