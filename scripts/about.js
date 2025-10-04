// ========================
// Hero Image Carousel
// ========================
let heroIndex = 0;

function showHeroSlide(n) {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;
    slides.forEach(slide => slide.classList.remove("active"));
    if (slides[n]) slides[n].classList.add("active");
}

function startHeroCarousel() {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;
    showHeroSlide(heroIndex);
    setInterval(() => {
        heroIndex = (heroIndex + 1) % slides.length;
        showHeroSlide(heroIndex);
    }, 4000);
}

// ========================
// Cart Logic
// ========================
let cart = [];
let selectedNetwork = "MTN";

function orderNow(name, price) {
    const item = cart.find(i => i.name === name);
    if (item) item.qty++;
    else cart.push({ name, price, qty: 1 });
    renderCart();
    scrollToCheckout();
}

function removeItem(idx) {
    if (!cart[idx]) return;
    cart[idx].qty--;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    renderCart();
}

function renderCart() {
    const el = document.getElementById("cartItems");
    const totalEl = document.getElementById("total");
    if (!el || !totalEl) return;

    el.innerHTML = "";
    if (!cart.length) {
        el.innerHTML = '<div style="color:#999">Cart is empty</div>';
        totalEl.innerText = "Total: UGX 0";
        return;
    }

    let total = 0;
    cart.forEach((it, idx) => {
        const row = document.createElement("div");
        row.className = "cart-row";
        const left = document.createElement("div");
        left.innerHTML = `${it.qty} × ${it.name}`;
        const right = document.createElement("div");
        right.innerHTML = `UGX ${it.price * it.qty} <button style="margin-left:8px" onclick="removeItem(${idx})">−</button>`;
        row.appendChild(left);
        row.appendChild(right);
        el.appendChild(row);
        total += it.price * it.qty;
    });

    totalEl.innerText = "Total: UGX " + total;
}

// ========================
// Mobile Money Checkout
// ========================
function selectNetwork(network) {
    selectedNetwork = network;
    const mtn = document.getElementById("n-mtn");
    const airtel = document.getElementById("n-airtel");
    if (!mtn || !airtel) return;

    mtn.classList.remove("active");
    airtel.classList.remove("active");
    if (network === "MTN") mtn.classList.add("active");
    else airtel.classList.add("active");
}

function checkout() {
    if (!cart.length) {
        alert("Your cart is empty");
        return;
    }

    const phone = document.getElementById("phone")?.value.trim();
    if (!phone || (!/^0\d{8,9}$/.test(phone) && !/^\+?256\d{9}$/.test(phone))) {
        alert("Please enter a valid phone number (e.g. 0753727200)");
        return;
    }

    const totalAmount = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    if (confirm(`Proceed to pay UGX ${totalAmount} via ${selectedNetwork} Mobile Money?`)) {
        alert("Payment initiated. Demo simulation only.");
        cart = [];
        renderCart();
        document.getElementById("phone").value = "";
    }
}

// ========================
// Hamburger Menu Toggle
// ========================
function toggleMenu() {
    const nav = document.querySelector("header nav");
    if (nav) nav.classList.toggle("active");
    const burger = document.querySelector(".hamburger");
    if (burger) burger.classList.toggle("active");
}

// ========================
// Scroll Functions
// ========================
function scrollToCheckout() {
    const checkout = document.getElementById("checkoutPanel");
    if (checkout) checkout.scrollIntoView({ behavior: "smooth" });
}

// ========================
// Animate Order Buttons
// ========================
function shakeOrderButtons() {
    const buttons = document.querySelectorAll(".item button");
    buttons.forEach(btn => {
        btn.classList.add("shake");
        setTimeout(() => btn.classList.remove("shake"), 600);
    });
}
setInterval(shakeOrderButtons, 4000);

// ========================
// Init
// ========================
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    selectNetwork("MTN");
    startHeroCarousel();
    const burger = document.querySelector(".hamburger");
    if (burger) burger.addEventListener("click", toggleMenu);
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const hamburgerIcon = document.getElementById('hamburger-icon');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle icon
    if (navLinks.classList.contains('active')) {
        hamburgerIcon.textContent = '✖'; // X when open
    } else {
        hamburgerIcon.textContent = '☰'; // Hamburger when closed
    }
});

// Optional: close menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburgerIcon.textContent = '☰';
    });
});
// ========================
// Hero Image Carousel
// ========================
let heroIndex = 0;

function showHeroSlide(n) {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;
    slides.forEach(slide => slide.classList.remove("active"));
    if (slides[n]) slides[n].classList.add("active");
}

function startHeroCarousel() {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;
    showHeroSlide(heroIndex);
    setInterval(() => {
        heroIndex = (heroIndex + 1) % slides.length;
        showHeroSlide(heroIndex);
    }, 4000);
}

// ========================
// Cart Logic
// ========================
let cart = [];
let selectedNetwork = "MTN";

function orderNow(name, price) {
    const item = cart.find(i => i.name === name);
    if (item) item.qty++;
    else cart.push({ name, price, qty: 1 });
    renderCart();
    scrollToCheckout();
}

function removeItem(idx) {
    if (!cart[idx]) return;
    cart[idx].qty--;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    renderCart();
}

function renderCart() {
    const el = document.getElementById("cartItems");
    const totalEl = document.getElementById("total");
    if (!el || !totalEl) return;

    el.innerHTML = "";
    if (!cart.length) {
        el.innerHTML = '<div style="color:#999">Cart is empty</div>';
        totalEl.innerText = "Total: UGX 0";
        return;
    }

    let total = 0;
    cart.forEach((it, idx) => {
        const row = document.createElement("div");
        row.className = "cart-row";
        const left = document.createElement("div");
        left.innerHTML = `${it.qty} × ${it.name}`;
        const right = document.createElement("div");
        right.innerHTML = `UGX ${it.price * it.qty} <button style="margin-left:8px" onclick="removeItem(${idx})">−</button>`;
        row.appendChild(left);
        row.appendChild(right);
        el.appendChild(row);
        total += it.price * it.qty;
    });

    totalEl.innerText = "Total: UGX " + total;
}

// ========================
// Mobile Money Checkout
// ========================
function selectNetwork(network) {
    selectedNetwork = network;
    const mtn = document.getElementById("n-mtn");
    const airtel = document.getElementById("n-airtel");
    if (!mtn || !airtel) return;

    mtn.classList.remove("active");
    airtel.classList.remove("active");
    if (network === "MTN") mtn.classList.add("active");
    else airtel.classList.add("active");
}

function checkout() {
    if (!cart.length) {
        alert("Your cart is empty");
        return;
    }

    const phone = document.getElementById("phone")?.value.trim();
    if (!phone || (!/^0\d{8,9}$/.test(phone) && !/^\+?256\d{9}$/.test(phone))) {
        alert("Please enter a valid phone number (e.g. 0753727200)");
        return;
    }

    const totalAmount = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    if (confirm(`Proceed to pay UGX ${totalAmount} via ${selectedNetwork} Mobile Money?`)) {
        alert("Payment initiated. Demo simulation only.");
        cart = [];
        renderCart();
        document.getElementById("phone").value = "";
    }
}

// ========================
// Hamburger Menu Toggle
// ========================
function toggleMenu() {
    const nav = document.querySelector("header nav");
    if (nav) nav.classList.toggle("active");
    const burger = document.querySelector(".hamburger");
    if (burger) burger.classList.toggle("active");
}

// Optional: close menu when a link is clicked
function closeMobileMenu() {
    const navLinks = document.getElementById("nav-links");
    const hamburgerIcon = document.getElementById("hamburger-icon");
    if (!navLinks || !hamburgerIcon) return;

    navLinks.classList.remove("active");
    hamburgerIcon.textContent = "☰";
}

// ========================
// Scroll Functions
// ========================
function scrollToCheckout() {
    const checkout = document.getElementById("checkoutPanel");
    if (checkout) checkout.scrollIntoView({ behavior: "smooth" });
}

// ========================
// Animate Order Buttons
// ========================
function shakeOrderButtons() {
    const buttons = document.querySelectorAll(".item button");
    buttons.forEach(btn => {
        btn.classList.add("shake");
        setTimeout(() => btn.classList.remove("shake"), 600);
    });
}
setInterval(shakeOrderButtons, 4000);

// ========================
// Init
// ========================
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    selectNetwork("MTN");
    startHeroCarousel();

    const burger = document.querySelector(".hamburger");
    if (burger) burger.addEventListener("click", toggleMenu);

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const hamburgerIcon = document.getElementById("hamburger-icon");

    if (hamburger && navLinks && hamburgerIcon) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburgerIcon.textContent = navLinks.classList.contains("active") ? "✖" : "☰";
        });
    }

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll(".nav-links li a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });
});
// ========================
// Hero Image Carousel with Smooth Fade
// ========================
let heroIndex = 0;

function showHeroSlide(n) {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    slides.forEach((slide, i) => {
        slide.style.opacity = "0";
        slide.style.transition = "opacity 1s ease-in-out";
        slide.classList.remove("active");
    });

    if (slides[n]) {
        slides[n].style.opacity = "1";
        slides[n].classList.add("active");
    }
}

function startHeroCarousel() {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    showHeroSlide(heroIndex); // show first slide immediately

    setInterval(() => {
        heroIndex = (heroIndex + 1) % slides.length; // loop back
        showHeroSlide(heroIndex);
    }, 5000); // change every 5 seconds
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    startHeroCarousel();
});
// ========================
// Hero Image Carousel with Smooth Fade
// ========================
let heroIndex = 0;

function showHeroSlide(n) {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    slides.forEach((slide, i) => {
        slide.style.opacity = "0";
        slide.style.transition = "opacity 1s ease-in-out";
        slide.classList.remove("active");
    });

    if (slides[n]) {
        slides[n].style.opacity = "1";
        slides[n].classList.add("active");
    }
}

function startHeroCarousel() {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    showHeroSlide(heroIndex); // show first slide immediately

    setInterval(() => {
        heroIndex = (heroIndex + 1) % slides.length; // loop
        showHeroSlide(heroIndex);
    }, 5000); // every 5 seconds
}

// ========================
// Cart Logic
// ========================
let cart = [];
let selectedNetwork = "MTN";

function orderNow(name, price) {
    const item = cart.find(i => i.name === name);
    if (item) item.qty++;
    else cart.push({ name, price, qty: 1 });
    renderCart();
    scrollToCheckout();
}

function removeItem(idx) {
    if (!cart[idx]) return;
    cart[idx].qty--;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    renderCart();
}

function renderCart() {
    const el = document.getElementById("cartItems");
    const totalEl = document.getElementById("total");
    if (!el || !totalEl) return;

    el.innerHTML = "";
    if (!cart.length) {
        el.innerHTML = '<div style="color:#999">Cart is empty</div>';
        totalEl.innerText = "Total: UGX 0";
        return;
    }

    let total = 0;
    cart.forEach((it, idx) => {
        const row = document.createElement("div");
        row.className = "cart-row";
        const left = document.createElement("div");
        left.innerHTML = `${it.qty} × ${it.name}`;
        const right = document.createElement("div");
        right.innerHTML = `UGX ${it.price * it.qty} <button style="margin-left:8px" onclick="removeItem(${idx})">−</button>`;
        row.appendChild(left);
        row.appendChild(right);
        el.appendChild(row);
        total += it.price * it.qty;
    });

    totalEl.innerText = "Total: UGX " + total;
}

// ========================
// Mobile Money Checkout
// ========================
function selectNetwork(network) {
    selectedNetwork = network;
    const mtn = document.getElementById("n-mtn");
    const airtel = document.getElementById("n-airtel");
    if (!mtn || !airtel) return;

    mtn.classList.remove("active");
    airtel.classList.remove("active");
    if (network === "MTN") mtn.classList.add("active");
    else airtel.classList.add("active");
}

function checkout() {
    if (!cart.length) {
        alert("Your cart is empty");
        return;
    }

    const phone = document.getElementById("phone")?.value.trim();
    if (!phone || (!/^0\d{8,9}$/.test(phone) && !/^\+?256\d{9}$/.test(phone))) {
        alert("Please enter a valid phone number (e.g. 0753727200)");
        return;
    }

    const totalAmount = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    if (confirm(`Proceed to pay UGX ${totalAmount} via ${selectedNetwork} Mobile Money?`)) {
        alert("Payment initiated. Demo simulation only.");
        cart = [];
        renderCart();
        document.getElementById("phone").value = "";
    }
}

// ========================
// Hamburger Menu Toggle
// ========================
function toggleMenu() {
    const nav = document.querySelector("header nav");
    if (nav) nav.classList.toggle("active");
    const burger = document.querySelector(".hamburger");
    if (burger) burger.classList.toggle("active");
}

function closeMobileMenu() {
    const navLinks = document.getElementById("nav-links");
    const hamburgerIcon = document.getElementById("hamburger-icon");
    if (!navLinks || !hamburgerIcon) return;

    navLinks.classList.remove("active");
    hamburgerIcon.textContent = "☰";
}

// ========================
// Scroll Functions
// ========================
function scrollToCheckout() {
    const checkout = document.getElementById("checkoutPanel");
    if (checkout) checkout.scrollIntoView({ behavior: "smooth" });
}

// ========================
// Animate Order Buttons
// ========================
function shakeOrderButtons() {
    const buttons = document.querySelectorAll(".item button");
    buttons.forEach(btn => {
        btn.classList.add("shake");
        setTimeout(() => btn.classList.remove("shake"), 600);
    });
}
setInterval(shakeOrderButtons, 4000);

// ========================
// Init
// ========================
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    selectNetwork("MTN");
    startHeroCarousel();

    const burger = document.querySelector(".hamburger");
    if (burger) burger.addEventListener("click", toggleMenu);

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const hamburgerIcon = document.getElementById("hamburger-icon");

    if (hamburger && navLinks && hamburgerIcon) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburgerIcon.textContent = navLinks.classList.contains("active") ? "✖" : "☰";
        });
    }

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll(".nav-links li a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });
});
// ========================
// ⭐ Hero Image Carousel with Smooth Fade ⭐
// ========================
let heroIndex = 0;

function showHeroSlide(n) {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    slides.forEach(slide => {
        slide.style.opacity = "0";
        slide.style.transition = "opacity 1s ease-in-out";
        slide.classList.remove("active");
    });

    if (slides[n]) {
        slides[n].style.opacity = "1";
        slides[n].classList.add("active");
    }
}

function startHeroCarousel() {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    showHeroSlide(heroIndex); // show first slide immediately

    setInterval(() => {
        heroIndex = (heroIndex + 1) % slides.length; // loop back
        showHeroSlide(heroIndex);
    }, 5000); // ⭐ change every 5 seconds ⭐
}
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            slide.style.opacity = "0";
        });
        slides[index].classList.add("active");
        slides[index].style.opacity = "1";
    }

    // Show first slide immediately
    showSlide(currentIndex);

    // Change slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 5000);
});
// ========================
// ⭐ HERO IMAGE CAROUSEL ⭐
// Smooth fade & fully mobile-friendly
// ========================

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            slide.style.opacity = "0";
            slide.style.transition = "opacity 1s ease-in-out";
        });

        slides[index].classList.add("active");
        slides[index].style.opacity = "1";
    }

    // Show first slide immediately
    showSlide(currentIndex);

    // Auto-change slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 5000);

    // Optional: Add arrow navigation (if needed)
    const leftArrow = document.querySelector(".hero-arrow.left");
    const rightArrow = document.querySelector(".hero-arrow.right");

    if (leftArrow && rightArrow) {
        leftArrow.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });

        rightArrow.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });
    }

    // Optional: Add dot navigation
    const dots = document.querySelectorAll(".hero-dot");
    if (dots.length) {
        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                currentIndex = i;
                showSlide(currentIndex);
            });
        });

        // Update active dot each time slide changes
        setInterval(() => {
            dots.forEach(dot => dot.classList.remove("active"));
            dots[currentIndex]?.classList.add("active");
        }, 100); // small interval to sync
    }
});
