// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Hero Slider
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Slide every 5 seconds

// Shake button every 5 seconds
const heroBtn = document.getElementById('heroMenuBtn');

setInterval(() => {
    if (heroBtn) {
        heroBtn.classList.add('shake');
        setTimeout(() => heroBtn.classList.remove('shake'), 600);
    }
}, 5000);
