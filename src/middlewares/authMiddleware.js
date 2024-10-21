const jwt = require('jsonwebtoken');
const db = require('../database/db');
require('dotenv').config();

authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No se proporcionó un token' });
  
  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Fallo al autenticar el token, por favor verifique el formato correcto del Bearer token' });
    req.user = decoded;
    next();
  });
};

const getRole =  async (userId, storeId) => {
  try {
    const [rows] = await db.execute(
      'SELECT role FROM store_users WHERE user_id = ? AND store_id = ?',
      [userId, storeId]
    );

    if (rows.length > 0) {
      return rows[0].role; 
    }
    return null;
  } catch (error) {
    console.error(error)
    throw error;
  }
};

const authorizeRole = (requiredRoles) => {
  return async (req, res, next) => {
    const userId = req.user.id; 
    const { storeId } = req.params

    try {
      const role = await getRole(userId, storeId);
      if (!role || !requiredRoles.includes(role)) {
        return res.status(403).json({ message: 'No tienes permiso en esta tienda para realizar esta acción', requiredRoles, "Su rol es: ": role });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Error verificando el rol del usuario', error });
    }
  };
};

module.exports = { authMiddleware, authorizeRole, getRole };
