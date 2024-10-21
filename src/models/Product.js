const db = require('../database/db');

class Product {
  static async create({ name, price, stock}, storeId) {
    try {
      const [result] = await db.execute(
        'INSERT INTO products (name, price, stock, store_id) VALUES (?, ?, ?, ?)',
        [name, price, stock, storeId]
      );
      return result;
    } catch (error) {
      console.error("error:",error)
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]); 
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error al buscar el producto:', error);
      throw error; 
    }
  }

  static async findAllByStoreId(store_id) {
    try {
      const [rows] = await db.execute('SELECT * FROM products WHERE store_id = ?', [store_id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateStock(id, stock) {
    try {
      const [result] = await db.execute(
        'UPDATE products SET stock = ? WHERE id = ?',
        [stock, id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(productId, {name, price, stock}) {
    try {
      const [result] = await db.execute(
        'UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?',
        [name, price, stock, productId]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(id) {
    try {
      const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

};

module.exports = Product;
