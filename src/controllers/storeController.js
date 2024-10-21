const Store = require('../models/Store');
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');

exports.createStore = async (req, res) => {
    const { name } = req.body;
    const ownerId  = req.user.id;

    try {
      const result = await Store.createStore({name, ownerId});
      res.status(201).json({ message: 'Tienda creada correctamente', storeId: result.insertId });
    } catch (error) {
      res.status(500).json({ message: 'Error creando la tienda' });
    }
};

exports.getAllStores = async (req, res) => {
    const ownerId = req.user.id;

    try {
        const stores = await Store.findAllByUserId(ownerId);
        res.status(200).json(stores);
      } catch (error) {
        res.status(500).json({ message: 'Error obteniedo las tiendas', error });
      }
}

exports.createEmployee = async (req, res) => {
    const { username, password , role } = req.body;
    const { storeId } = req.params;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const result = await User.create({ username, password: passwordHash },  role , storeId);
      res.status(201).json({ message: 'Empleado creado correctamente', userId: result.insertId });
      } catch (error) {
        res.status(500).json({ message: 'Error creando el empleado', error });
      }
}

exports.getEmployees = async (req, res) => {
    const { storeId } = req.params;
    try {
        const employees = await User.findAllByStoreId(storeId)
        res.status(200).json(employees);
      } catch (error) {
        res.status(500).json({ message: 'Error obteniedo los empleados', error });
      }
}

