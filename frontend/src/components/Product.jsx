import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/Product/action';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const [cart, setCart] = useState({});

  const handleAddToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1 
    }));
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] > 0) {
        updatedCart[productId] -= 1; 
      }
      return updatedCart;
    });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
                {cart[product.id] ? ( 
                  <Flex align="center">
                    <Button colorScheme="teal" size="sm" onClick={() => handleRemoveFromCart(product.id)}>-</Button>
                    <Text mx={2}>{cart[product.id]}</Text> 
                    <Button colorScheme="teal" size="sm" onClick={() => handleAddToCart(product.id)}>+</Button>
                  </Flex>
                ) : (
                  <Button colorScheme="teal" size="sm" onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
                )}
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default Product;
