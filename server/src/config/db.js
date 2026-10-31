const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../shop.sqlite');
const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS size_templates (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        sizes TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS product_types (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        size_templates_id TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS product_models (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      categories TEXT NOT NULL,
      imageUrl TEXT,
      description TEXT,
      size_template_id TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      model_id INTEGER NOT NULL,
      size TEXT NOT NULL,
      count INTEGER NOT NULL DEFAULT 0,
      barcode TEXT UNIQUE,
      FOREIGN KEY (model_id) REFERENCES product_models(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        total_amount REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS transaction_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transaction_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      unit_price REAL NOT NULL DEFAULT 0, 
      FOREIGN KEY (transaction_id) REFERENCES transactions (id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products (id)
    );
  `);

  const insertTemplate = db.prepare(`
  INSERT OR IGNORE INTO size_templates (id, name, type, sizes)
  VALUES (?, ?, ?, ?)
`);

  insertTemplate.run('one_size', 'Pojedynczy towar', 'single', JSON.stringify(['UNI']));
  insertTemplate.run('adults_shirt', 'Koszulka Dorosła', 'multiple', JSON.stringify(['S', 'M', 'L', 'XL', 'XXL']));
  insertTemplate.run('kids_shirt', 'Koszulka Dziecięca', 'multiple', JSON.stringify(["1","2","3-4", "5-6", "7-8", "9-11", "12-14"]));
  console.log('Baza SQLite gotowa do pracy.');
}

initDb();

module.exports = db;