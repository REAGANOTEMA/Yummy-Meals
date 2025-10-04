// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Shake Order Buttons Every 3 Seconds
setInterval(() => {
    const buttons = document.querySelectorAll('.order-btn');
    buttons.forEach(btn => {
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 600);
    });
}, 3000);

// Order Now Button Click → WhatsApp Mobile Money
const orderButtons = document.querySelectorAll('.order-btn');

orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemDiv = button.closest('.item');
        const itemName = itemDiv.querySelector('.meta strong').textContent;
        const itemPrice = itemDiv.querySelector('.meta').textContent.split('-')[1].trim();

        // All payments go to this line
        const whatsappNumber = "256753727200";

        const message = `Hello! I would like to order: ${itemName} (${itemPrice}). I will pay via Mobile Money to ${whatsappNumber}.`;
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp for payment/order
        window.open(whatsappURL, "_blank");
    });
});
