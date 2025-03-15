document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded");
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Note: Countdown functionality is now in countdown.js
    // Note: FAQ functionality is now in faq.js - don't duplicate it here

    // Smooth Scroll for Navigation Links with enhanced animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Add a slight delay for better UX
            setTimeout(() => {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (!targetElement) return;
                
                // Add a highlight effect to the target section
                gsap.to(targetElement, {
                    backgroundColor: 'rgba(255, 51, 51, 0.1)',
                    duration: 0.3,
                    onComplete: () => {
                        gsap.to(targetElement, {
                            backgroundColor: 'transparent',
                            duration: 1
                        });
                    }
                });
                
                // Smooth scroll
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 100);
        });
    });

    // Challenge Card Enhanced Animations
    document.querySelectorAll('.challenge-card').forEach((card, index) => {
        // Add a staggered entrance animation
        gsap.from(card, {
            scrollTrigger: {
                trigger: '.challenges',
                start: 'top center',
                toggleActions: 'play none none none' // Changed to prevent reverse animations
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out'
        });
        
        // Add hover animations
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.challenge-icon i');
            gsap.to(icon, {
                rotate: 360,
                scale: 1.2,
                duration: 0.5,
                ease: 'back.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.challenge-icon i');
            gsap.to(icon, {
                rotate: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });

    // Details Section - Fixed animation to prevent disappearing
    gsap.from('.detail-card', {
        scrollTrigger: {
            trigger: '.details',
            start: 'top center',
            toggleActions: 'play none none none' // Changed to prevent reverse animations
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // FAQ Animation - Fixed to prevent disappearing
    gsap.from('.faq-item', {
        scrollTrigger: {
            trigger: '.faq',
            start: 'top center',
            toggleActions: 'play none none none' // Changed to prevent reverse animations
        },
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Random particle animation for the hero section
    const heroSection = document.querySelector('.hero');
    function createHeroParticle() {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        
        // Random particle properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        // Set particle styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.backgroundColor = `hsl(${Math.random() * 30 + 350}, 100%, 70%)`;
        
        heroSection.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
        createHeroParticle();
    }
    
    // Continue creating particles
    setInterval(createHeroParticle, 1000);

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // GSAP Animations
    // Hero Section with enhanced animation
    gsap.from('.hero-content', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power4.out',
        onComplete: () => {
            // Animate the countdown items sequentially
            gsap.from('.countdown-item', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.2,
                ease: 'back.out(1.7)'
            });
        }
    });

    // Themes Section
    gsap.from('.theme-card', {
        scrollTrigger: {
            trigger: '.themes',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Timeline Animation
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.schedule',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Team Section Animation
    gsap.from('.team-lead', {
        scrollTrigger: {
            trigger: '.team',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        x: index => index === 0 ? -50 : 50, // First lead comes from left, second from right
        y: 30,
        opacity: 0,
        stagger: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.team-member', {
        scrollTrigger: {
            trigger: '.team',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.15,
        ease: 'back.out(1.7)'
    });
    
    // Enhanced hover animations for team photos
    document.querySelectorAll('.team-photo-wrapper').forEach(photo => {
        photo.addEventListener('mouseenter', () => {
            const overlay = photo.querySelector('.team-photo-overlay');
            const image = photo.querySelector('img');
            
            gsap.to(overlay, {
                bottom: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.to(image, {
                scale: 1.05,
                filter: 'brightness(0.7)',
                duration: 0.5,
                ease: 'power2.out'
            });
            
            const h3 = overlay.querySelector('h3');
            const p = overlay.querySelector('p');
            const social = overlay.querySelector('.team-social');
            
            gsap.to([h3, p, social], {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        photo.addEventListener('mouseleave', () => {
            const overlay = photo.querySelector('.team-photo-overlay');
            const image = photo.querySelector('img');
            
            gsap.to(overlay, {
                bottom: '-100%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
            
            gsap.to(image, {
                scale: 1,
                filter: 'brightness(1)',
                duration: 0.5,
                ease: 'power2.in'
            });
            
            const h3 = overlay.querySelector('h3');
            const p = overlay.querySelector('p');
            const social = overlay.querySelector('.team-social');
            
            gsap.to([h3, p, social], {
                y: 20,
                opacity: 0,
                stagger: 0.05,
                duration: 0.2,
                ease: 'power2.in'
            });
        });
    });

    // Contact Form Animation
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 100,
        opacity: 0,
        ease: 'power3.out'
    });

    // Parallax Effect for Hero Background
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to('.hero-background', {
            duration: 0.5,
            x: x,
            y: y,
            ease: 'power2.out'
        });
    });

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the form data to your server
            console.log('Form submitted:', { name, email, message });
            contactForm.reset();
            alert('Thank you for your message! We will get back to you soon.');
        });
    }

    // Register Button Click Handler
    // const registerButtons = document.querySelectorAll('.register-btn, .cta-button');
    // registerButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         // Add your registration logic here
    //         alert('Registration form will be available soon!');
    //     });
    // });

    // Navbar Background Change on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Form Validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Sponsor Logo Slider
    const sponsorSlider = document.querySelector('.sponsor-logos');
    let isDown = false;
    let startX;
    let scrollLeft;

    sponsorSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - sponsorSlider.offsetLeft;
        scrollLeft = sponsorSlider.scrollLeft;
    });

    sponsorSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    sponsorSlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    sponsorSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sponsorSlider.offsetLeft;
        const walk = (x - startX) * 2;
        sponsorSlider.scrollLeft = scrollLeft - walk;
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Glitch Effect Animation
    function createGlitchEffect(element) {
        const text = element.textContent;
        let glitchInterval;
        
        element.addEventListener('mouseenter', () => {
            glitchInterval = setInterval(() => {
                const glitchedText = text.split('').map(char => {
                    if (Math.random() < 0.1) {
                        return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                    }
                    return char;
                }).join('');
                element.textContent = glitchedText;
            }, 50);
        });
        
        element.addEventListener('mouseleave', () => {
            clearInterval(glitchInterval);
            element.textContent = text;
        });
    }

    document.querySelectorAll('.glitch-text').forEach(createGlitchEffect);

    // Particle Background Effect
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.querySelector('.hero').appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.reset();
            if (this.y < 0 || this.y > canvas.height) this.reset();
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 243, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }

    animate();

    // Sponsor Section Enhanced Animation
    const sponsorSection = document.querySelector('.sponsors');
    const sponsorLogos = document.querySelectorAll('.sponsor-logo');
    const sponsorParticles = document.querySelector('.sponsor-particles');
    
    // Create sponsor particles
    function createSponsorParticles() {
        if (!sponsorParticles) return;
        
        sponsorParticles.innerHTML = '';
        const particleCount = window.innerWidth < 768 ? 20 : 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('sponsor-particle');
            
            // Random position and size
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            // Set styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            sponsorParticles.appendChild(particle);
        }
    }
    
    // Add interactive hover effects to sponsor logos
    sponsorLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            // Create spark effect around logo
            const sparkCount = 10;
            const logoRect = logo.getBoundingClientRect();
            const sectionRect = sponsorSection.getBoundingClientRect();
            
            for (let i = 0; i < sparkCount; i++) {
                const spark = document.createElement('div');
                spark.classList.add('sponsor-spark');
                
                const angle = (Math.random() * 360) * (Math.PI / 180);
                const distance = Math.random() * 80 + 20;
                const posX = (logoRect.left + logoRect.width / 2) - sectionRect.left + Math.cos(angle) * distance;
                const posY = (logoRect.top + logoRect.height / 2) - sectionRect.top + Math.sin(angle) * distance;
                
                spark.style.left = `${posX}px`;
                spark.style.top = `${posY}px`;
                
                sponsorSection.appendChild(spark);
                
                // Remove spark after animation
                setTimeout(() => {
                    spark.remove();
                }, 1000);
            }
            
            // Add pulse wave
            const pulse = document.createElement('div');
            pulse.classList.add('sponsor-pulse');
            pulse.style.left = `${(logoRect.left + logoRect.width / 2) - sectionRect.left}px`;
            pulse.style.top = `${(logoRect.top + logoRect.height / 2) - sectionRect.top}px`;
            
            sponsorSection.appendChild(pulse);
            
            // Remove pulse after animation
            setTimeout(() => {
                pulse.remove();
            }, 1000);
        });
    });
    
    // Initialize sponsor effects
    if (sponsorSection) {
        createSponsorParticles();
        
        // Recreate particles on window resize
        window.addEventListener('resize', createSponsorParticles);
        
        // Add scroll effect to sponsor logos
        gsap.from(sponsorLogos, {
            scrollTrigger: {
                trigger: sponsorSection,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: 1
            },
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 1
        });
    }
}); 

// ... existing code ...

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.reset();
        if (this.y < 0 || this.y > canvas.height) this.reset();
    }
    
    draw() {
        ctx.fillStyle = `rgba(0, 243, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();



// div
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    menuIcon.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});
