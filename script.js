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

// === МАГІЯ СИНХРОНІЗАЦІЇ КАРТОК І ТАБІВ НА МОБІЛЬНОМУ ===
document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.tabs-content-area');
    const tabsContainer = document.querySelector('.tabs-sidebar');
    const tabs = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.tab-panel');

    if (!cardsContainer || !tabsContainer || tabs.length === 0 || cards.length === 0) return;

    // 1. СВАЙП КАРТОК -> ОНОВЛЮЄ ТАБИ (Те, що ми вже зробили)
    cardsContainer.addEventListener('scroll', () => {
        if (window.innerWidth > 992) return; 

        let scrollLeft = cardsContainer.scrollLeft;
        let cardWidth = cards[0].offsetWidth + 15; // ширина картки + відступ (gap)
        let activeIndex = Math.round(scrollLeft / cardWidth);

        tabs.forEach((tab, index) => {
            if (index === activeIndex) {
                tab.classList.add('active');
                // Змушуємо верхнє меню прокрутитися до активної кнопки
                tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                tab.classList.remove('active');
            }
        });
    });

    // 2. НОВЕ: КЛІК ПО ТАБУ -> СКРОЛИТЬ КАРТКИ
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
            if (window.innerWidth > 992) return; // Працює тільки на мобільному
            
            // Зупиняємо стандартну поведінку (якщо раптом таби перемикалися через дисплей none)
            e.preventDefault(); 

            // Вираховуємо ширину кроку
            let cardWidth = cards[0].offsetWidth + 15; 
            
            // Плавно прокручуємо нижню карусель до відповідної картки
            cardsContainer.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // === ЛОГИКА ФИЛЬТРОВ ДЛЯ СТРАНИЦ (Кейсы, Блог) ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.item-card');

    if (filterBtns.length > 0 && cards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Убираем активный класс со всех кнопок и вешаем на нажатую
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Получаем категорию, которую нужно показать
                const filterValue = btn.getAttribute('data-filter');

                // Перебираем все карточки
                cards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    // Показываем, если категория совпадает или если выбрано "Всі"
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'flex'; // Карточка использует flex
                        // Добавляем микро-анимацию появления
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.display = 'none'; // Прячем лишние
                    }
                });
            });
        });
    }
});