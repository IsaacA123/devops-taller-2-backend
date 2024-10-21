const db = require('../database/db');

class User {

  // Método para registrar un nuevo usuario
  static async create({ username, password},  role = "Employee", storeId) {
    try {
      const [result] = await db.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, password ]
      );
      if(storeId){
        await db.execute(
          'INSERT INTO store_users (user_id, store_id, role) VALUES (?, ?, ?)',
          [result.insertId, storeId , role]
        );
      }
      return result;
    } catch (error) {
      console.error("error:",error)
      throw error;
    }
  }

  static async findByUsername(username) {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]); 
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      throw error; 
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]); 
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      throw error; 
    }
  }

  static async findAll() {
    try {
      const [rows] = await db.execute('SELECT * FROM users');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, { username, password }) {
    try {
      const [result] = await db.execute(
        'UPDATE users SET username = ?, password = ? WHERE id = ?',
        [username, password, id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findAllByStoreId(storeId) {
    try {
      const [rows] = await db.execute(
        `SELECT u.* 
         FROM users u
         JOIN store_users su ON u.id = su.user_id
         WHERE su.store_id = ?`,
        [storeId]
    );
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = User;
