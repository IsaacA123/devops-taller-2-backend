const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: 'El nombre de usuario ya está registrado' });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({username, password: passwordHash});
    const user = await User.findByUsername(username);
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
     console.log(token);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error registrando el usuario' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'El nombre de usuario no existe en la base de datos' });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error del servidor:' });
  }
};
