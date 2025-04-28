/**
 * Main JavaScript for Pretty Mush website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animation
    initScrollAnimation();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize contact form
    initContactForm();
});

/**
 * Handles animations when elements come into viewport
 */
function initScrollAnimation() {
    const elements = document.querySelectorAll('.section-header, .feature-card, .about-content, .product-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Handles mobile menu toggle
 */
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navToggle.checked) {
                navToggle.checked = false;
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInside = navLinks.contains(event.target) ||
                              document.querySelector('.nav-toggle-label').contains(event.target);

        if (!isClickInside && navToggle.checked) {
            navToggle.checked = false;
        }
    });
}

/**
 * Handles contact form submission
 */
function initContactForm() {
    const contactForm = document.querySelector('.quick-contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Here you would typically send the form data to a server
            // For now, we'll just simulate success

            // Clear form
            this.reset();

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <p>Thanks for reaching out, ${name}! We'll get back to you soon.</p>
            `;

            // Replace form with success message
            this.style.display = 'none';
            this.parentNode.appendChild(successMessage);

            // Optional: Reset after delay
            setTimeout(() => {
                successMessage.remove();
                this.style.display = 'block';
            }, 5000);
        });
    }
}

/**
 * Adds active class to current page link
 */
(function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
})();