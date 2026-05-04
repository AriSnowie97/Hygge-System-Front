// === ЛОГІКА БУРГЕР-МЕНЮ (ЕФЕКТ APP-ДОДАТКУ) ===
const burgerBtn = document.getElementById('burger-btn');
const navContainer = document.querySelector('.nav-container');

if (burgerBtn && navContainer) {
    // 1. Автоматично створюємо кнопку "Назад" для мобільних екранів
    document.querySelectorAll('.mega-menu, .simple-menu').forEach(menu => {
        if (!menu.querySelector('.mobile-back-btn')) {
            const backBtn = document.createElement('div');
            backBtn.className = 'mobile-back-btn';
            backBtn.innerHTML = '⬅ Назад'; // Стрілочка та текст
            
            // Вставляємо кнопку на самий початок меню
            if(menu.classList.contains('mega-menu')) {
                menu.querySelector('.mega-menu-container').prepend(backBtn);
            } else {
                menu.prepend(backBtn);
            }

            // Закриваємо поточне підменю при кліку на "Назад"
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                menu.closest('.nav-item').classList.remove('active');
            });
        }
    });

    // 2. Логіка відкриття/закриття основного бургер-меню
    burgerBtn.addEventListener('click', () => {
        navContainer.classList.toggle('active');
        burgerBtn.classList.toggle('toggle');
        
        // Якщо ми закриваємо меню хрестиком, ховаємо й усі відкриті підменю
        if (!navContainer.classList.contains('active')) {
            document.querySelectorAll('.nav-item.active').forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // 3. Логіка кліків по посиланнях "Програми" та "Про нас"
    document.querySelectorAll('.nav-links > .nav-item > a').forEach(link => {
        link.addEventListener('click', function(e) {
            const parentLi = this.parentElement;
            
            if (parentLi.classList.contains('dropdown') || parentLi.classList.contains('simple-dropdown')) {
                if (window.innerWidth <= 992) {
                    e.preventDefault(); 
                    // Додаємо клас active, щоб меню плавно виїхало збоку
                    parentLi.classList.add('active'); 
                }
                return; 
            }

            // Для звичайних посилань - закриваємо все меню і повертаємо на сторінку
            if (link.getAttribute('href') !== '#!') {
                navContainer.classList.remove('active');
                burgerBtn.classList.remove('toggle');
                document.querySelectorAll('.nav-item.active').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    });
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