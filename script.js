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
// Функция для изменения стиля (темы)
function changeTheme(themeFile) {
    // Находим тег <link> по его id и меняем путь к CSS-файлу
    document.getElementById('theme-link').setAttribute('href', themeFile);
    
    // Сохраняем выбор в память браузера (localStorage)
    localStorage.setItem('selectedTheme', themeFile);
}

// Проверяем, есть ли сохраненный стиль при загрузке страницы
window.onload = () => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        document.getElementById('theme-link').setAttribute('href', savedTheme);
    }
}