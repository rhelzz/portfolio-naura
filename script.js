// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });

    // Typewriter effect with reverse typing
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const textToAnimate = typewriterElement.textContent;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeLoop = () => {
            // Set current substring
            const currentString = textToAnimate.substring(0, charIndex);
            typewriterElement.textContent = currentString;
            
            // To prevent layout shift, ensure there's content so the element doesn't collapse
            if (typewriterElement.textContent === '') {
                typewriterElement.innerHTML = '&nbsp;'; // Use innerHTML to set non-breaking space
            }

            if (!isDeleting && charIndex < textToAnimate.length) {
                // Typing forward
                charIndex++;
                setTimeout(typeLoop, 150); // Typing speed
            } else if (isDeleting && charIndex > 0) {
                // Deleting
                charIndex--;
                setTimeout(typeLoop, 100); // Deleting speed
            } else {
                // Switch mode after a pause
                isDeleting = !isDeleting;
                // Longer pause when text is full, shorter when empty
                const pauseTime = isDeleting ? 2000 : 500;
                setTimeout(typeLoop, pauseTime);
            }
        };

        typeLoop(); // Start the animation
    }

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Cursor hover effect on links and buttons
        const interactables = document.querySelectorAll('a, button, input, textarea, .hover-effect');
        
        interactables.forEach(item => {
            item.addEventListener('mouseenter', function() {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(212, 163, 115, 0.2)';
            });
            
            item.addEventListener('mouseleave', function() {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    // Variabel speed mengatur durasi animasi. Angka yang lebih kecil = animasi lebih cepat.
    // Nilai awal 200 (sekitar 3.2 detik) terlalu lambat untuk angka target yang kecil. 
    // Nilai 80 akan memberikan durasi sekitar 1.3 detik, yang terasa lebih pas.
    const speed = 80;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.parentElement.dataset.target);
                const suffix = counter.parentElement.dataset.suffix || '';
                let count = 0;
                
                const updateCount = () => {
                    const increment = target / speed;
                    
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.floor(count) + suffix;
                        setTimeout(updateCount, 16);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, {threshold: 0.5});

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // Portfolio filter
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // ... (kode filter yang sudah ada)
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('text-accent'); // Ensure accent color is removed
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.classList.add('text-accent');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    // Menggunakan display: block untuk menampilkan item yang cocok
                    item.style.display = 'block'; 
                    // Menambahkan sedikit delay sebelum mengubah opacity dan transform
                    // Ini membantu memastikan display sudah berubah sebelum animasi dimulai
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize Swiper for testimonials
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 1.5,
                centeredSlides: true,
            },
        }
    });

    // Progress bar on scroll
    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY;
        let docHeight = document.body.offsetHeight;
        let winHeight = window.innerHeight;
        let scrollPercent = scrollTop / (docHeight - winHeight);
        let scrollPercentRounded = Math.round(scrollPercent * 100);
        
        document.querySelector('.progress-bar').style.width = scrollPercentRounded + '%';
        
        // Show/hide back to top button
        const backToTopBtn = document.getElementById('backToTop');
        
        if (scrollTop > 600) {
            backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-10');
            backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-10');
            backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
        }
        
        // Parallax effect
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.2;
            element.style.transform = `translateY(${scrollTop * speed}px)`;
        });
        
        // Reveal elements on scroll
        const fadeElements = document.querySelectorAll('.fade-up');
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < window.innerHeight - 100) {
                element.classList.add('active');
            }
        });
    });
    
    // Back to top button functionality
    document.getElementById('backToTop').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Handle form submission with validation and animation
    const form = document.querySelector('.contact-form');
    const formMessage = document.querySelector('.form-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            formMessage.classList.remove('hidden', 'text-green-500');
            formMessage.classList.add('text-red-500');
            formMessage.textContent = 'Please fill out all fields.';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.classList.remove('hidden', 'text-green-500');
            formMessage.classList.add('text-red-500');
            formMessage.textContent = 'Please enter a valid email address.';
            return;
        }
        
        // Simulate form submission
        formMessage.classList.remove('hidden', 'text-red-500');
        formMessage.classList.add('text-green-500');
        formMessage.textContent = 'Thank you! Your message has been sent.';
        
        // Reset form
        form.reset();
        
        // Clear success message after a delay
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    });

    // Image reveal animation
    const imageRevealElements = document.querySelectorAll('.image-reveal:not(.revealed)');
    
    const imageRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 300);
                imageRevealObserver.unobserve(entry.target);
            }
        });
    }, {threshold: 0.3});
    
    imageRevealElements.forEach(element => {
        imageRevealObserver.observe(element);
    });
});