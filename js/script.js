document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Video Play Functionality
    const playButton = document.querySelector('.play-button');
    const demoVideo = document.querySelector('.demo-video');
    
    if (playButton && demoVideo) {
        playButton.addEventListener('click', function() {
            if (demoVideo.paused) {
                demoVideo.play();
                this.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                demoVideo.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }
    
    // Modal for Gallery Videos
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.querySelector('.close-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            const caption = this.querySelector('h3').textContent;
            
            if (videoSrc) {
                modalVideo.src = videoSrc;
                document.querySelector('.video-caption').textContent = caption;
                modal.style.display = 'flex';
                modalVideo.play();
            }
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just log it and show an alert
            console.log({ name, email, message });
            
            alert('Thank you for your message, Aryan will get back to you soon!');
            contactForm.reset();
        });
    }
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }
});
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 80 },
    "color": { "value": "#00FFFF" },
    "shape": { 
      "type": "circle",
      "stroke": { "width": 0, "color": "#000000" }
    },
    "opacity": { "value": 0.5, "random": true },
    "size": { "value": 4, "random": true },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#00FFFF",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 3,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "repulse" }
    }
  }
});
// Reel Modal Functionality
const reelCards = document.querySelectorAll('.reel-card');
const reelModal = document.createElement('div');
reelModal.className = 'reel-modal';
reelModal.innerHTML = `
  <div class="modal-content">
    <span class="close-reel-modal">&times;</span>
    <video controls class="reel-video">
      <source src="" type="video/mp4">
    </video>
  </div>
`;
document.body.appendChild(reelModal);

reelCards.forEach(card => {
  card.addEventListener('click', () => {
    const videoSrc = card.getAttribute('data-reel');
    const video = reelModal.querySelector('.reel-video');
    
    video.src = videoSrc;
    reelModal.style.display = 'flex';
    video.play();
  });
});

reelModal.querySelector('.close-reel-modal').addEventListener('click', () => {
  const video = reelModal.querySelector('.reel-video');
  reelModal.style.display = 'none';
  video.pause();
  video.currentTime = 0;
});