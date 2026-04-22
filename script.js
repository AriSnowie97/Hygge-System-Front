// === ЛОГІКА БУРГЕР-МЕНЮ ===
// Логіка бургер-меню та анімації хрестика
const burgerBtn = document.getElementById('burger-btn');
const navContainer = document.querySelector('.nav-container');

if (burgerBtn && navContainer) {
    burgerBtn.addEventListener('click', () => {
        // Відкриваємо/закриваємо меню
        navContainer.classList.toggle('active');
        // Перетворюємо бургер на хрестик і назад
        burgerBtn.classList.toggle('toggle');
    });

    // Закриття меню при кліку на будь-яке посилання
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (link.getAttribute('href') !== '#!') {
                navContainer.classList.remove('active');
                burgerBtn.classList.remove('toggle'); // Повертаємо три смужки
            }
        });
    });
}