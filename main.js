// TwelveTech Media - Premium Animations & Logic

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing scripts...");

    // Initialize Swiper Testimonials FIRST
    let testimonialSwiper;
    try {
        testimonialSwiper = new Swiper('.testimonial-swiper', {
            slidesPerView: 2,
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
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
            },
            breakpoints: {
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 }
            }
        });
        console.log("Swiper initialized successfully:", testimonialSwiper);
    } catch (e) {
        console.error("Swiper initialization failed:", e);
    }

    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: target, offsetY: 80 },
                    ease: "power3.inOut"
                });
            }
        });
    });

    // Nav Background Transition
    const nav = document.querySelector('nav');
    ScrollTrigger.create({
        start: "top -50",
        onEnter: () => nav.classList.add('scrolled'),
        onLeaveBack: () => nav.classList.remove('scrolled'),
    });

    // Hero Section Animations
    gsap.from(".hero-content h1", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power4.out",
        delay: 0.2
    });

    gsap.from(".hero-content p", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power4.out",
        delay: 0.4
    });

    gsap.from(".hero-cta, .risk-reversal", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.6
    });

    // Scroll Reveal Animations - Simplified for maximum reliability
    const revealOnScroll = (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom-=20px",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all"
            });
        });
    };

    const selectors = [
        ".stat-item",
        ".service-card",
        ".icp-card",
        ".case-study",
        ".testimonial-card",
        ".glass-card",
        ".step",
        ".pricing-card",
        ".contact-container"
    ];

    selectors.forEach(revealOnScroll);

    // Refresh ScrollTrigger after all content is loaded
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('i').classList.replace('fa-minus', 'fa-plus');
            });

            if (!isActive) {
                item.classList.add('active');
                item.querySelector('i').classList.replace('fa-plus', 'fa-minus');
            }
        });
    });

    // Counter Animation Enhancement
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        ScrollTrigger.create({
            trigger: stat,
            start: "top 90%",
            onEnter: () => animateCount(stat, target)
        });
    });

    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Custom Cursor Logic
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Show cursors on first move
        cursorDot.style.opacity = "1";
        cursorOutline.style.opacity = "1";

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth outline follow
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect for links
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .icp-card, .faq-question');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.background = 'rgba(255, 0, 0, 0.1)';
            cursorOutline.style.border = 'none';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.background = 'none';
            cursorOutline.style.border = '2px solid var(--primary-red)';
        });
    });

    // Webhook Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalBtnText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('https://services.leadconnectorhq.com/hooks/nkOG8YDt5FCP8gQtdGjt/webhook-trigger/c0657027-f0f3-4669-8791-df2a10ee3cf2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    btn.innerText = 'Message Sent!';
                    btn.style.background = '#27c93f';
                    contactForm.reset();
                } else {
                    throw new Error('Server responded with ' + response.status);
                }
                
                setTimeout(() => {
                    btn.innerText = originalBtnText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);

            } catch (error) {
                console.error('Submission Error:', error);
                btn.innerText = 'Error! Try Again';
                btn.style.background = '#ff5f56';
                setTimeout(() => {
                    btn.innerText = originalBtnText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }
        });
    }

    function animateCount(el, target) {
        let obj = { value: 0 };
        gsap.to(obj, {
            value: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                const suffix = el.innerText.includes('+') ? '+' : (el.innerText.includes('hrs') ? ' hrs' : '');
                el.innerText = Math.floor(obj.value) + suffix;
            }
        });
    }

    }
});
