// ========================
// ⭐ HERO IMAGE CAROUSEL ⭐
// Smooth fade, mobile-friendly, auto-slide every 5s
// ========================
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    let currentIndex = 0;
    let autoSlide;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove("active");
            slide.style.opacity = "0";
            slide.style.transition = "opacity 1s ease-in-out";
        });
        slides[index].classList.add("active");
        slides[index].style.opacity = "1";
        updateDots(index);
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 5000); // ⭐ every 5s
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    // Init first slide
    showSlide(currentIndex);
    startAutoSlide();

    // Arrow navigation
    const leftArrow = document.querySelector(".hero-arrow.left");
    const rightArrow = document.querySelector(".hero-arrow.right");

    if (leftArrow && rightArrow) {
        leftArrow.addEventListener("click", () => {
            stopAutoSlide();
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
            startAutoSlide();
        });

        rightArrow.addEventListener("click", () => {
            stopAutoSlide();
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
            startAutoSlide();
        });
    }

    // Dot navigation
    const dots = document.querySelectorAll(".hero-dot");
    function updateDots(index) {
        if (!dots.length) return;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index]?.classList.add("active");
    }
    if (dots.length) {
        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                stopAutoSlide();
                currentIndex = i;
                showSlide(currentIndex);
                startAutoSlide();
            });
        });
    }

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX);
        hero.addEventListener("touchend", e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) { // swipe left
                stopAutoSlide();
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
                startAutoSlide();
            } else if (touchEndX > touchStartX + 50) { // swipe right
                stopAutoSlide();
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(currentIndex);
                startAutoSlide();
            }
        });
    }
});

// ========================
// 🛒 CART LOGIC
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
// 📱 MOBILE MONEY CHECKOUT
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
// 🍔 HAMBURGER MENU TOGGLE
// ========================
function toggleMenu() {
    const nav = document.querySelector("header nav");
    const burger = document.getElementById("hamburger");
    const icon = document.getElementById("hamburger-icon");
    if (!nav || !burger || !icon) return;

    nav.classList.toggle("active");
    burger.classList.toggle("active");

    icon.textContent = nav.classList.contains("active") ? "✖" : "☰";
}

// Close menu when a nav link is clicked
function closeMobileMenu() {
    const nav = document.querySelector("header nav");
    const icon = document.getElementById("hamburger-icon");
    if (!nav || !icon) return;
    nav.classList.remove("active");
    icon.textContent = "☰";
}

// ========================
// 📜 SCROLL TO CHECKOUT
// ========================
function scrollToCheckout() {
    const checkout = document.getElementById("checkoutPanel");
    if (checkout) checkout.scrollIntoView({ behavior: "smooth" });
}

// ========================
// 🎯 ANIMATE ORDER BUTTONS
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
// INIT
// ========================
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    selectNetwork("MTN");

    const burger = document.getElementById("hamburger");
    if (burger) burger.addEventListener("click", toggleMenu);

    document.querySelectorAll(".nav-links li a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });
});
// ========================
// ⭐ HERO IMAGE CAROUSEL ⭐
// Smooth fade, mobile-friendly, auto-slide every 5s
// ========================
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    let currentIndex = 0;
    let autoSlide;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove("active");
            slide.style.opacity = "0";
            slide.style.transition = "opacity 1s ease-in-out";
        });
        slides[index].classList.add("active");
        slides[index].style.opacity = "1";
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 5000); // ⭐ every 5s
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    // Init first slide
    showSlide(currentIndex);
    startAutoSlide();

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX);
        hero.addEventListener("touchend", e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) { // swipe left
                stopAutoSlide();
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
                startAutoSlide();
            } else if (touchEndX > touchStartX + 50) { // swipe right
                stopAutoSlide();
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(currentIndex);
                startAutoSlide();
            }
        });
    }

    // ========================
    // ⭐ MOBILE HAMBURGER MENU ⭐
    // ========================
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            hamburger.classList.toggle("open");
        });
    }
});
