import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory } from '../Redux/Category/action';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box, Input, Flex } from '@chakra-ui/react';
import CategoryModal from './CategoryModal';

const CategoryTable = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const categoryNames = categories.map(category => category.name);
    localStorage.setItem('categoryNames', JSON.stringify(categoryNames));
  }, [categories]);

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

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleRefresh = () => {
    dispatch(fetchCategories());
  };
  // console.log(categories)

  
  return (
    <>
      <Flex mb={4} justifyContent={'space-around'}>
        <Input width="50%" placeholder="Search by name" value={filterValue} onChange={handleFilterChange} border="1px solid black"/>
        <Button ml={4} colorScheme="blue" onClick={handleRefresh}>Refresh</Button>
        <Button colorScheme="blue" onClick={handleAddCategory} mb={4}>
            Add Category
        </Button>
      </Flex>
      <Box pl="18%">
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
          {categories.filter(category =>
            category.name.toLowerCase().includes(filterValue.toLowerCase())
          ).map((category) => (
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
      </Box>
      <CategoryModal isOpen={isAddEditModalOpen} onClose={handleCloseModal} categoryToEdit={categoryToEdit} />
    </>
  );
};

export default CategoryTable;
