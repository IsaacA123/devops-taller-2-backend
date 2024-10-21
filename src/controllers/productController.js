const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  const { storeId } = req.params
  try {
    const result = await Product.create({name, price, stock}, storeId);
    res.status(201).json({ message: 'Producto creado correctamente', productId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creando los productos' });
  }
};

exports.getProductById = async (req, res) => {
  const { productId }  = req.params;
  try {
    const products = await Product.findById(productId);
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo el producto' });
  }
};

exports.getAllProductsByStoreId = async (req, res) => {
  const { storeId }  = req.params;
  try {
    const products = await Product.findAllByStoreId(storeId);
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo los productos' });
  }
};

exports.updateProductStock = async (req, res) => {
  const { productId}  = req.params;
  const { stock } = req.body;

  try {
    const products = await Product.updateStock(productId, stock);
    res.status(201).json("Stock del producto actualizado correctamente");
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando el stock del producto' });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId }  = req.params;
  const { name, price, stock } = req.body;

  try {
    await Product.updateProduct(productId, { name, price, stock });
    res.status(201).json("Producto actualizado correctamente");
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando el producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId }  = req.params;

  try {
    await Product.deleteProduct(productId);
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando el producto' });
  }
};
