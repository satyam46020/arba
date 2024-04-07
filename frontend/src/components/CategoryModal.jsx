import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { createCategory, updateCategory } from '../Redux/Category/action';

const CategoryModal = ({ isOpen, onClose, categoryToEdit }) => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({ name: '', slug: '', image: '' });

  useEffect(() => {
    if (categoryToEdit) {
      setFormData({
        name: categoryToEdit.name ,
        slug: categoryToEdit.slug,
        image: categoryToEdit.image
      });
    }
    else{
      setFormData({ name: '', slug: '', image: '' });
    }
  },[categoryToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (categoryToEdit) {
      dispatch(updateCategory(categoryToEdit._id, formData));
    } else {
      dispatch(createCategory(formData));
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{categoryToEdit ? 'Edit Category' : 'Add Category'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Slug</FormLabel>
            <Input type="text" name="slug" value={formData.slug} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Image</FormLabel>
            <Input type="text" name="image" value={formData.image} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {categoryToEdit ? 'Save Changes' : 'Add'}
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CategoryModal;
