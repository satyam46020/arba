import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/Product/action';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    console.log(`Product added to cart: ${productId}`);
  };

  return (

    <>
    <Flex direction="column" align="center" justify="center" mt={8}>
      <Heading as="h2" size="lg" mb={4}>
        Products
      </Heading>
      <Flex flexWrap="wrap" justifyContent="center">
        {products.map((product) => (
          <Box key={product.id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" m={4} boxShadow="md">
            <Image src={product.image} alt={product.title} />
            <Box p={4}>
              <Text fontSize="lg" fontWeight="semibold" mb={2}>
                {product.title}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={2}>
                {product.description}
              </Text>
              <Text fontSize="md" fontWeight="semibold" color="teal.600" mb={4}>
               ₹{product.price}
              </Text>
              <Button colorScheme="teal" size="sm" onClick={() => handleAddToCart(product.id)}>
                Add to Cart
              </Button>
            </Box>
          </Box>
        ))}
      </Flex>
    </Flex>
    </>
  );
};

export default Product;
