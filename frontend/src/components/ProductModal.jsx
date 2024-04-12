import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../Redux/Product/action';
import { fetchCategories } from '../Redux/Category/action';

const ProductModal = ({ isOpen, onClose, productToEdit }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);
  
  const [formData, setFormData] = useState({ title: '', description: '', price: '', category: '', image: '' });

  useEffect(() => {
    dispatch(fetchCategories());

    if (productToEdit) {
      setFormData({
        title: productToEdit.title,
        description: productToEdit.description,
        price: productToEdit.price,
        category: productToEdit.category,
        image: productToEdit.image,
      });
    } else {
      setFormData({ title: '', description: '', price: '', category: '', image: '' });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (productToEdit) {
      dispatch(updateProduct(productToEdit._id, formData));
    } else {
      dispatch(createProduct(formData));
    }
    onClose();
  };

  // console.log(categories)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{productToEdit ? 'Edit Product' : 'Add Product'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" value={formData.title} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formData.description} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Price</FormLabel>
            <Input type="number" name="price" value={formData.price} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <Select name="category" value={formData.category} onChange={handleChange}>
              <option>Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Image URL</FormLabel>
            <Input type="text" name="image" value={formData.image} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSubmit}>{productToEdit ? 'Save Changes' : 'Add Product'}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
