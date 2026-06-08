const fs = require('fs');
const path = require('path');

const PRODUCTS_BLOCK = [
  '',
  '                            <!-- Картки програм -->',
  '                            <div class="mega-products-row">',
  '                                <a href="product-card.html" class="mega-product-card">',
  '                                    <img class="mega-product-img" src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format' + String.fromCharCode(38) + 'fit=crop' + String.fromCharCode(38) + 'w=120' + String.fromCharCode(38) + 'q=80" alt="Продажі та CRM">',
  '                                    <div class="mega-product-info">',
  '                                        <strong>Продажі та CRM</strong>',
  '                                        <span>Ведення клієнтів від переговорів до сервісу в єдиній системі</span>',
  '                                    </div>',
  '                                </a>',
  '                                <a href="product-card.html" class="mega-product-card">',
  '                                    <img class="mega-product-img" src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format' + String.fromCharCode(38) + 'fit=crop' + String.fromCharCode(38) + 'w=120' + String.fromCharCode(38) + 'q=80" alt="Склад">',
  '                                    <div class="mega-product-info">',
  '                                        <strong>Склад</strong>',
  '                                        <span>Прозорий контроль запасів, партій та серійних номерів</span>',
  '                                    </div>',
  '                                </a>',
  '                                <a href="product-card.html" class="mega-product-card">',
  '                                    <img class="mega-product-img" src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format' + String.fromCharCode(38) + 'fit=crop' + String.fromCharCode(38) + 'w=120' + String.fromCharCode(38) + 'q=80" alt="Фінанси">',
  '                                    <div class="mega-product-info">',
  '                                        <strong>Фінанси</strong>',
  '                                        <span>Управління грошовими потоками, баланс та звітність у реальному часі</span>',
  '                                    </div>',
  '                                </a>',
  '                            </div>',
  '',
  '                            <!-- Колонки посилань -->',
  '                            <div class="mega-links-row">'
].join('\n');

const files = [
  'article.html', 'blog.html', 'case-single.html', 'cases.html',
  'migration.html', 'promo-single.html', 'promos.html', 'sap-b1.html'
];
const base = 'c:/Users/arina/source/repos/Hygge-System-Front/';

for (const fname of files) {
  const fpath = path.join(base, fname);
  let content = fs.readFileSync(fpath, 'utf8');

  if (content.includes('mega-products-row')) {
    console.log('SKIP: ' + fname);
    continue;
  }

  // Insert PRODUCTS_BLOCK after mega-menu-container opening, before first mega-column
  let newContent = content.replace(
    /<div class="mega-menu-container">([\s\S]*?)(<div class="mega-column">)/,
    (match, between, col) => {
      return '<div class="mega-menu-container">' + PRODUCTS_BLOCK + '\n                            ' + col;
    }
  );

  // Close mega-links-row: find the last mega-column closing div followed by mega-menu-container close
  newContent = newContent.replace(
    /( {28}<\/div>\n)( {24}<\/div>\n {20}<\/div>)/,
    '$1                            </div><!-- /mega-links-row -->\n$2'
  );

  if (newContent !== content) {
    fs.writeFileSync(fpath, newContent, 'utf8');
    console.log('UPDATED: ' + fname);
  } else {
    console.log('NO MATCH: ' + fname);
  }
}
