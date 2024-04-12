import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/Product/action';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { addToCart, fetchCart, updateCart } from '../Redux/Cart/action';

const Product = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productReducer.products);
  const carts = useSelector((state)=> state.cartReducer.cartItems)

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart())
  }, [dispatch,carts]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };
  
  const handleRemoveFromCart = (cart) => {
    dispatch(updateCart(cart._id, cart.quantity));
  };

  return (
    <>
      <Flex direction="column" align="center" justify="center" mt={8}>
        <Heading as="h2" size="lg" mb={4}>
          Products
        </Heading>
        <Flex flexWrap="wrap" justifyContent="center">
          {products.map((product) => (
            <Box key={product._id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" m={4} boxShadow="md">
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
                {carts.map((cartItem) => {
                  if (cartItem.productId === product._id && cartItem.owner === user._id && cartItem.quantity>0) {
                    return (
                      <Flex key={cartItem._id} align="center">
                        <Button colorScheme="teal" size="sm" onClick={() => handleRemoveFromCart(cartItem)}>-</Button>
                        <Text mx={2}>{cartItem.quantity}</Text> 
                        <Button colorScheme="teal" size="sm" onClick={() => handleAddToCart(product._id)}>+</Button>
                      </Flex>
                    );
                  }
                })}

                {!carts.some(cartItem => cartItem.productId === product._id) && (
                  <Button colorScheme="teal" size="sm" onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
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
