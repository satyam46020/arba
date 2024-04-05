import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory } from '../Redux/Category/action';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box, Text } from '@chakra-ui/react';
import CategoryModal from './CategoryModal';

const CategoryTable = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const handleAddCategory = () => {
    setIsAddEditModalOpen(true);
    setCategoryToEdit(null);
  };

  const handleEditCategory = (category) => {
    setIsAddEditModalOpen(true);
    setCategoryToEdit(category);
  };

  const handleCloseModal = () => {
    setIsAddEditModalOpen(false);
    setCategoryToEdit(null);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(categoryId));
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Button colorScheme="teal" onClick={handleAddCategory} mb={4}>
        Add Category
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Slug</Th>
            <Th>Image</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentCategories.map((category) => (
            <Tr key={category._id}>
              <Td>{category.name}</Td>
              <Td>{category.slug}</Td>
              <Td>{category.image}</Td>
              <Td>
                <Button colorScheme="blue" mr={2} onClick={() => handleEditCategory(category)}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDeleteCategory(category._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={4} display="flex" justifyContent="center">
        {Array.from({ length: Math.ceil(categories.length / categoriesPerPage) }, (_, i) => (
          <Button key={i} mx={1} colorScheme="teal" onClick={() => paginate(i + 1)}>{i + 1}</Button>
        ))}
      </Box>
      <CategoryModal isOpen={isAddEditModalOpen} onClose={handleCloseModal} categoryToEdit={categoryToEdit} />
    </>
  );
};

export default CategoryTable;
