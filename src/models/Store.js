const db = require('../database/db');

class Store{
    static async createStore({ name='Mi tienda', ownerId}) {
        try {
            const [result] = await db.execute(
                'INSERT INTO stores (name) VALUES (?)',
                [name]
            );
            await db.execute(
                'INSERT INTO store_users (user_id, store_id, role) VALUES (?, ?, ?)',
                [ownerId, result.insertId, "owner"]
            );
            return result;
        } catch (error) {
            console.error("error:",error)
            throw error;
        }
      }

    static async findAllByUserId(ownerId) {
        console.log("UID",ownerId)
        try {
            const [rows] = await db.execute(`
                SELECT stores.* 
                FROM stores 
                JOIN store_users ON stores.id = store_users.store_id 
                WHERE store_users.user_id = ?
                `,
                [ownerId]
            );
            return rows;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
}

module.exports = Store;