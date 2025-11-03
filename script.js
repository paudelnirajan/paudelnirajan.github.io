document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
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

    // Active navigation link highlighting on scroll
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Modal functionality for project cards
    const modal = document.getElementById('project-modal');
    if (modal) {
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const closeBtn = document.querySelector('.close-btn');

        document.querySelectorAll('.see-more-btn').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.project-card');
                const title = card.querySelector('.project-title').innerText;
                const fullDescription = card.querySelector('.full-description');
                
                if (fullDescription) {
                    modalTitle.innerText = title;
                    modalDescription.innerHTML = fullDescription.innerHTML;
                    modal.style.display = 'block';
                }
            });
        });

        // Function to close the modal
        const closeModal = () => {
            modal.style.display = 'none';
        }

        // Event listeners to close the modal
        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                closeModal();
            }
        });
        window.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
    }
});