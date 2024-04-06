import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../Redux/Product/action';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box, Input, Flex } from '@chakra-ui/react';
import ProductModal from './ProductModal';

const ProductTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(filterValue.toLowerCase())
  );
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleAddProduct = () => {
    setIsAddEditModalOpen(true);
    setProductToEdit(null);
  };

  const handleEditProduct = (product) => {
    setIsAddEditModalOpen(true);
    setProductToEdit(product);
  };

  const handleCloseModal = () => {
    setIsAddEditModalOpen(false);
    setProductToEdit(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleRefresh = () => {
    dispatch(fetchProducts());
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Flex mb={4} justifyContent={'space-around'}>
        <Input width="50%" placeholder="Search by title" value={filterValue} onChange={handleFilterChange} border="1px solid black" />
        <Button ml={4} colorScheme="teal" onClick={handleRefresh}>Refresh</Button>
        <Button colorScheme="teal" onClick={handleAddProduct} mb={4}>
            Add Product
        </Button>
      </Flex>
      <Box pl="15%">
      <Table variant="simple" >
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentProducts?.map((product) => (
            <Tr key={product._id}>
              <Td>{product.title}</Td>
              <Td>{product.description}</Td>
              <Td>{product.price}</Td>
              <Td>{product.category}</Td>
              <Td>
                <Button colorScheme="teal" mr={2} onClick={() => handleEditProduct(product)}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </Box>
      <Box mt={4} display="flex" justifyContent="center">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
          <Button key={i} mx={1} colorScheme="teal" onClick={() => paginate(i + 1)}>{i + 1}</Button>
        ))}
      </Box>
      <ProductModal isOpen={isAddEditModalOpen} onClose={handleCloseModal} productToEdit={productToEdit} />
    </>
  );
};

export default ProductTable;
