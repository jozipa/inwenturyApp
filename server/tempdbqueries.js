// update_types.js
const Database = require('better-sqlite3');
const path = require('path');

// Łączymy się z plikiem bazy danych
const dbPath = path.join(__dirname, 'shop.sqlite');
const db = new Database(dbPath);

console.log('Rozpoczynam aktualizację tabeli product_types...');

// 1. Usunięcie starej tabeli, jeśli istnieje
db.exec(`DROP TABLE IF EXISTS product_types;`);

// 2. Utworzenie nowej tabeli z wymaganymi polami
db.exec(`
  CREATE TABLE product_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    size_template_id TEXT NOT NULL,
    FOREIGN KEY (size_template_id) REFERENCES size_templates(id)
  );
`);

// 3. Dodanie 3 rekordów po angielsku powiązanych z id ze zdjęcia (one_size, adults_shirt, kids_shirt)[cite: 2]
const insertType = db.prepare(`
  INSERT INTO product_types (name, size_template_id)
  VALUES (?, ?)
`);

const updateTransaction = db.transaction(() => {
  insertType.run('Koszulka (Dorośli)', 'adults_shirt');
  
  // Dziecięca koszulka -> kids_shirt[cite: 2]
  insertType.run('Koszulka (Dzieci)', 'kids_shirt');
  
  // Torba / pojedynczy towar -> one_size[cite: 2]
  insertType.run('Torba', 'one_size');
});

try {
  updateTransaction();
  console.log('Sukces! Tabela product_types została przebudowana i uzupełniona rekordami.');
} catch (error) {
  console.error('Błąd podczas aktualizacji bazy:', error.message);
}