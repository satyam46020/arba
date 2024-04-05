import React, { useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import CategoryTable from './CategoryTable';
import Navbar from './Navbar';
import ProductTable from './ProductTable';

const Mystore = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const handleCategoryClick = () => {
    setShowCategories(true);
    setShowProducts(false);
  };

  const handleProductClick = () => {
    setShowCategories(false);
    setShowProducts(true);
  };

  return (
    <>
    <Navbar/>
    <Box >
        
      <Flex justifyContent={'space-around'}>
        <Button padding="0 15%" colorScheme="blue" onClick={handleCategoryClick}>Show Categories</Button>
        <Button padding="0 15%" colorScheme="teal" onClick={handleProductClick}>Show Products</Button>
      
      </Flex>
      <Box mt={20}>
        {showCategories && <CategoryTable />}
        {showProducts && <ProductTable />}
      </Box >
    </Box >
    </>
  );
};

export default Mystore;
