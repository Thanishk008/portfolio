// Smooth scrolling and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Dark mode toggle logic ported from the photo-reviewer project.
    const themeToggle = document.getElementById('theme-toggle');
    const themeSwitch = document.getElementById('theme-switch');
    const html = document.documentElement;

    function getCookie(name) {
        const cookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`));

        return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
    }

    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    }

    function applyTheme(theme, options = { persist: true }) {
        const isDark = theme === 'dark';

        if (isDark) {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }

        if (themeSwitch) {
            themeSwitch.classList.toggle('is-checked', isDark);
            themeSwitch.setAttribute('aria-checked', String(isDark));
        }

        if (options.persist) {
            localStorage.setItem('theme', theme);
            setCookie('theme', theme, 365);
        }

        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme }
        }));
    }

    const savedTheme = getCookie('theme') || localStorage.getItem('theme');
    const initialTheme = savedTheme || 'dark';

    html.classList.add('no-transitions');
    applyTheme(initialTheme, { persist: false });
    setTimeout(() => {
        html.classList.remove('no-transitions');
    }, 100);

    if (themeSwitch) {
        themeSwitch.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

            applyTheme(nextTheme);

            if (themeToggle) {
                themeToggle.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
            }
        });
    }
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
            bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            bars[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll (optional)
        /*if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;*/
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Typing animation for hero section
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.style.borderRight = '';
        typingText.style.paddingRight = '';
        typingText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typingText.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Counter animation for stats
    const observerOptions = {
        threshold: 0.7
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current);
                }, 20);

                statsObserver.unobserve(statNumber);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-number').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Skill bar animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target;
                const width = skillProgress.getAttribute('data-width');
                setTimeout(() => {
                    skillProgress.style.width = width;
                }, 200);
                skillObserver.unobserve(skillProgress);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-progress').forEach(skill => {
        skillObserver.observe(skill);
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Scroll animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-right, .slide-in-left');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 1.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });

    // Add scroll animation classes to elements
    function addScrollAnimations() {
        // About section
        const aboutElements = document.querySelectorAll('.about .section-header, .about-text p, .stat');
        aboutElements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${index * 0.1}s`;
        });

        // Skills section
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        // Projects section
        const projectsHeader = document.querySelector('.projects .section-header');
        if (projectsHeader) projectsHeader.classList.add('fade-in');

        // Contact section
        const contactElements = document.querySelectorAll('.contact-item, .form-group');
        contactElements.forEach((element, index) => {
            if (element.classList.contains('contact-item')) {
                element.classList.add('slide-in-left');
            } else {
                element.classList.add('slide-in-right');
            }
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    addScrollAnimations();

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#10b981';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        const speed = scrolled * 0.5;

        parallaxElements.forEach((element, index) => {
            const speedMultiplier = (index + 1) * 0.3;
            element.style.transform = `translateY(${speed * speedMultiplier}px)`;
        });
    });

    // Add hover effects to project cards
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        project.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dynamic background particles (optional enhancement)
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '1';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = '#4f46e5';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    // Uncomment the line below to enable particles
    // createParticles();

    // Intersection Observer for section animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Apply initial styles and observe sections
    sections.forEach(section => {
        if (!section.classList.contains('hero')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.8s ease-out';
            sectionObserver.observe(section);
        }
    });

    // Smooth reveal animation for sections
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    });

    // Initialize body styles
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'all 0.5s ease-out';

    console.log('Portfolio website loaded successfully! 🚀');
});
