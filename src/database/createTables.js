const db = require('./db');

const createTables = async () => {
  try {
    // Tabla de usuarios
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);
    // Tabla de tiendas
    await db.execute(`
      CREATE TABLE IF NOT EXISTS stores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);
    // Tabla de tiendas_usuarios
    await db.execute(`
      CREATE TABLE IF NOT EXISTS store_users (
        user_id INT,
        store_id INT,
        role ENUM('owner', 'admin', 'employee') NOT NULL DEFAULT 'employee',
        PRIMARY KEY (user_id, store_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
      )
    `);
    // Tabla de productos
    await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL, 
        store_id INT,
        FOREIGN KEY (store_id) REFERENCES stores(id)
      )
    `);

    console.log("Tablas creadas o verificadas correctamente!");
  } catch (error) {
    console.error("Error creando las tablas:", error.message);
  }
};

module.exports = createTables;
