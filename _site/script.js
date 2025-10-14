// Function to update active navigation link based on current section
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // If no sections with IDs are found (like on blog page), highlight blog nav item
    if (sections.length === 0) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '/blog.html') {
                link.classList.add('active');
            }
        });
        return;
    }

    // Get current scroll position
    const scrollPosition = window.scrollY + 100; // Offset for better detection
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Find which section is currently in view
    let currentSection = '';

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Check if scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
        // Special handling for the last section
        else if (index === sections.length - 1 && scrollPosition >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
        // If we're at the bottom of the page, highlight the last section
        else if (scrollPosition + windowHeight >= documentHeight - 10) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        // Check if this link matches the current section
        if (href === `#${currentSection}` || href === `/#${currentSection}`) {
            link.classList.add('active');
        }
    });

    // If no section is found, default to about section
    if (!currentSection) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '/#about' || href === '#about') {
                link.classList.add('active');
            }
        });
    }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Update active link on page load
    updateActiveNavLink();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // If it's an external link (not an anchor), let it navigate normally
            if (href && !href.startsWith('#')) {
                return; // Allow default navigation for external links
            }

            // Otherwise, handle smooth scrolling for anchor links
            e.preventDefault();

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 