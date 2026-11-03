// update_types.js
const Database = require('better-sqlite3');
const path = require('path');

// Łączymy się z plikiem bazy danych
const dbPath = path.join(__dirname, 'shop.sqlite');
const db = new Database(dbPath);

console.log('Rozpoczynam aktualizację tabeli product_types...');

/*
db.exec(`
  BEGIN TRANSACTION;

  -- 1. Usuń produkty z ceną 0
  DELETE FROM products
  WHERE price = 0;

  -- 2. Usuń modele, które nie mają już żadnych przypisanych produktów
  DELETE FROM product_models
  WHERE id NOT IN (
    SELECT DISTINCT model_id FROM products
  );

  COMMIT;
`);*/

db.exec(`DELETE * FROM receipts`);

