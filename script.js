// Loader
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
    
    // Enable scrolling on body
    document.body.style.overflow = 'auto';
  }, 3000);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons and panes
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    
    // Add active class to clicked button and corresponding pane
    btn.classList.add('active');
    const tabId = btn.dataset.tab;
    document.getElementById(tabId).classList.add('active');
  });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - revealPoint) {
      // Add delay if specified
      const delay = element.dataset.delay || 0;
      setTimeout(() => {
        element.classList.add('active');
      }, delay);
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Galerie Lightbox
const galerieItems = document.querySelectorAll('.galerie-item');

galerieItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    const caption = item.querySelector('.galerie-caption').textContent;
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close">&times;</button>
        <img src="${imgSrc}" alt="${caption}">
        <div class="lightbox-caption">${caption}</div>
      </div>
    `;
    
    // Add lightbox to body
    document.body.appendChild(lightbox);
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Add animation class
    setTimeout(() => {
      lightbox.classList.add('active');
    }, 10);
    
    // Close lightbox on click
    lightbox.addEventListener('click', e => {
      if (e.target.classList.contains('lightbox') || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('active');
        
        setTimeout(() => {
          document.body.removeChild(lightbox);
          document.body.style.overflow = 'auto';
        }, 300);
      }
    });
  });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', e => {
  e.preventDefault();
  
  const email = newsletterForm.querySelector('input').value;
  
  if (email) {
    // Simulate form submission
    const submitBtn = newsletterForm.querySelector('button');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    
    setTimeout(() => {
      newsletterForm.innerHTML = '<p class="success-message">Merci pour votre inscription !</p>';
    }, 1500);
  }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add CSS for lightbox
const style = document.createElement('style');
style.textContent = `
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .lightbox.active {
    opacity: 1;
  }
  
  .lightbox-content {
    position: relative;
    max-width: 80%;
    max-height: 80%;
  }
  
  .lightbox-content img {
    max-width: 100%;
    max-height: 80vh;
    border: 5px solid #fff;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  }
  
  .lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
  }
  
  .lightbox-caption {
    color: #fff;
    text-align: center;
    padding: 10px 0;
    font-weight: 600;
  }
  
  .success-message {
    color: var(--primary);
    font-weight: 600;
  }
`;

document.head.appendChild(style);