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