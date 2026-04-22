// === ЛОГІКА БУРГЕР-МЕНЮ ===
const burgerBtn = document.getElementById('burger-btn');
const navContainer = document.querySelector('.nav-container');

if (burgerBtn && navContainer) {
    // Відкрити/закрити меню по кліку на бургер
    burgerBtn.addEventListener('click', () => {
        navContainer.classList.toggle('active');
    });

    // Закривати меню при кліку на посилання (крім випадаючих списків)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (link.getAttribute('href') !== '#!') {
                navContainer.classList.remove('active');
            }
        });
    });
}