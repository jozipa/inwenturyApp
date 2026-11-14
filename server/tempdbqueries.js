// update_types.js
const Database = require('better-sqlite3');
const path = require('path');

// Łączymy się z plikiem bazy danych
const dbPath = path.join(__dirname, 'shop.sqlite');
const db = new Database(dbPath);

console.log('Rozpoczynam aktualizację tabeli product_types...');

db.prepare(`
  ALTER TABLE products
  ADD expected_quantity INTEGER NOT NULL DEFAULT 0;
  `).run();


