const { default: mongoose } = require('mongoose');
const Category = require('../models/Category.model');

// Create Category
const createCategory = async (req, res) => {
    try {
      const { name, slug, image } = req.body;
      const { userId } = req;
  
      if (!userId) {
        return res.status(400).json({ msg: 'owner ID is required' });
      }
  
      // Check if userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ msg: 'Invalid owner ID' });
      }
  
      const category = await Category.create({ name, slug, image, owner:userId });
      res.status(200).json(category);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  };
// Update Category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get Category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Category deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory
};
