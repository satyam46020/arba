const Product = require('../models/Product.model');

// Create Product
const createProduct = async (req, res) => {
  try {
    const {title, description, price, category, image} = req.body;
    const {userId} = req;
    const product = await Product.create({title, description, price, category, image, owner:userId});
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.messsage);
  }
};

// Get all Products
const getAllProducts = async (req, res) => {
  try {
    let query = {};

    if (req.query.category) {
      query.category = req.query.category;
    }

    let sort = {};

    if (req.query.sort === 'price') {
      sort.price = 1;
    }

    const products = await Product.find(query).sort(sort);
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.messsage);
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.messsage);
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Product deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.messsage);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct
};
