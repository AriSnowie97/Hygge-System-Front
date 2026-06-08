import re

PRODUCTS_BLOCK = (
    '\n'
    '                            <!-- Картки програм -->\n'
    '                            <div class="mega-products-row">\n'
    '                                <a href="product-card.html" class="mega-product-card">\n'
    '                                    <img class="mega-product-img" src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=120&q=80" alt="Продажі та CRM">\n'
    '                                    <div class="mega-product-info">\n'
    '                                        <strong>Продажі та CRM</strong>\n'
    '                                        <span>Ведення клієнтів від переговорів до сервісу в єдиній системі</span>\n'
    '                                    </div>\n'
    '                                </a>\n'
    '                                <a href="product-card.html" class="mega-product-card">\n'
    '                                    <img class="mega-product-img" src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80" alt="Склад">\n'
    '                                    <div class="mega-product-info">\n'
    '                                        <strong>Склад</strong>\n'
    '                                        <span>Прозорий контроль запасів, партій та серійних номерів</span>\n'
    '                                    </div>\n'
    '                                </a>\n'
    '                                <a href="product-card.html" class="mega-product-card">\n'
    '                                    <img class="mega-product-img" src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=120&q=80" alt="Фінанси">\n'
    '                                    <div class="mega-product-info">\n'
    '                                        <strong>Фінанси</strong>\n'
    '                                        <span>Управління грошовими потоками, баланс та звітність у реальному часі</span>\n'
    '                                    </div>\n'
    '                                </a>\n'
    '                            </div>\n'
    '\n'
    '                            <!-- Колонки посилань -->\n'
    '                            <div class="mega-links-row">\n'
)

files = [
    'article.html', 'blog.html', 'case-single.html', 'cases.html',
    'migration.html', 'promo-single.html', 'promos.html', 'sap-b1.html'
]

base = r'c:/Users/arina/source/repos/Hygge-System-Front/'

for fname in files:
    fpath = base + fname
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'mega-products-row' in content:
        print(f'SKIP (already updated): {fname}')
        continue

    # Insert PRODUCTS_BLOCK after opening mega-menu-container tag
    new_content = content.replace(
        '<div class="mega-menu-container">\n                            \n                            <div class="mega-column">',
        '<div class="mega-menu-container">' + PRODUCTS_BLOCK + '                            <div class="mega-column">'
    )

    if new_content == content:
        # Try alternative: just after mega-menu-container opening with any whitespace
        new_content = re.sub(
            r'(<div class="mega-menu-container">)\s*(<div class="mega-column">)',
            r'\1' + PRODUCTS_BLOCK + r'\2',
            content
        )

    # Close mega-links-row before last </div> of mega-menu-container
    # The pattern is the last mega-column closing </div> followed by mega-menu-container closing </div>
    # We add </div><!-- /mega-links-row --> before </div>\n                        </div>
    new_content = re.sub(
        r'(                            </div>\n)(                        </div>\n                    </div>)',
        r'\1                            </div><!-- /mega-links-row -->\n\2',
        new_content,
        count=1
    )

    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'UPDATED: {fname}')
    else:
        print(f'NO MATCH: {fname}')
