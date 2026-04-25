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

// Скрипт для табів "Рішення"
function switchTab(tabId, btn) {
    // Знімаємо клас active з усіх кнопок
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    // Знімаємо клас active з усіх панелей
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    
    // Додаємо active натиснутій кнопці та відповідній панелі
    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Скрипт для прокрутки каруселі систем
function scrollCarousel(direction) {
    const track = document.getElementById('systems-track');
    // Отримуємо ширину одного слайду + відступ (gap 30px)
    const slideWidth = track.querySelector('.carousel-slide').clientWidth + 30;
    
    // Прокручуємо
    track.scrollBy({ 
        left: slideWidth * direction, 
        behavior: 'smooth' 
    });
}