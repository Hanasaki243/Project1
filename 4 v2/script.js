document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuItems = document.querySelectorAll('.nav-menu ul li a');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    }

    mobileMenuToggle.addEventListener('click', toggleMenu);

    // Add click event listeners to all menu items
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Check if the menu is currently active (visible on mobile)
            if (navMenu.classList.contains('active')) {
                // Prevent the default action (navigating to the link) for smooth transition
                e.preventDefault();
                
                // Close the menu
                toggleMenu();

                // Navigate to the link after a short delay
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 300); // Adjust this delay to match your CSS transition time
            }
        });
    });

    // Handle form submission
    const form = document.querySelector('#contact form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = 'Sending...';

        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                form.reset();
                alert('Thank you for your message. We will get back to you soon!');
            } else {
                alert('Oops! There was a problem submitting your form');
            }
        }).catch(error => {
            alert('Oops! There was a problem submitting your form');
        }).finally(() => {
            button.disabled = false;
            button.textContent = originalText;
        });
    });

    // Carousel functionality
    function createCarousel(carouselId) {
        const carousel = document.getElementById(carouselId);
        const container = carousel.querySelector('.carousel-container');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const images = container.querySelectorAll('img');
        let currentIndex = 0;

        function showImage(index) {
            container.style.transform = `translateX(-${index * 100}%)`;
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
    }

    // Initialize both carousels
    createCarousel('autoservice-carousel');
    createCarousel('autoshine-carousel');
});
