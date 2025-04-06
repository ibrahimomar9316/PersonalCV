// DOM Elements
const nav = document.querySelector('nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.section');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const scrollTopButton = document.querySelector('.scroll-top');

// Navigation
menuToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
});

// Scroll behavior
window.addEventListener('scroll', () => {
    // Sticky navigation
    if (window.scrollY > 100) {
        nav?.classList.add('sticky');
    } else {
        nav?.classList.remove('sticky');
    }

    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollTopButton?.classList.add('show');
    } else {
        scrollTopButton?.classList.remove('show');
    }

    // Animate sections on scroll
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('animate');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks?.classList.remove('active');
        }
    });
});

// Dark mode toggle
darkModeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save preference
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

// Check for saved dark mode preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
}

// Scroll to top
scrollTopButton?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons?.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => card.classList.add('show'), 10);
            } else {
                card.style.display = 'none';
                card.classList.remove('show');
            }
        });
    });
});

// Form validation
const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic validation
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();
    
    if (!name || !email || !message) {
        showFormError('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormError('Please enter a valid email address');
        return;
    }
    
    // If validation passes, you can submit the form
    submitForm(name, email, message);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(message) {
    const errorDiv = document.querySelector('.form-error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

async function submitForm(name, email, message) {
    try {
        // Replace with your form submission logic
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });
        
        if (response.ok) {
            showFormSuccess('Message sent successfully!');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        showFormError('Failed to send message. Please try again later.');
    }
}

function showFormSuccess(message) {
    const successDiv = document.querySelector('.form-success');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    }
}

// Skill progress animation
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const progress = bar.dataset.progress;
        bar.style.width = progress + '%';
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate skills on page load
    setTimeout(animateSkills, 500);
    
    // Initialize first section animation
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        firstSection.classList.add('animate');
    }
});
