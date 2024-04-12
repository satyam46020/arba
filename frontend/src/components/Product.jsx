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
  }, [dispatch]);
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  
  const [cart, setCart] = useState({});
  // console.log(cart)
  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1 
    }));
    console.log(cart)
  };
  
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] > 0) {
        updatedCart[productId] -= 1; 
        const existingCartItem = carts.find(item => item.productId === productId);
          dispatch(updateCart(existingCartItem._id, updatedCart[productId]));
          console.log(cart)
      }
      return updatedCart;
    });
  };

  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // }, [cart]);

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
                  if (cartItem.productId === product._id && cartItem.owner === user._id ) {
                    return (
                      <Flex key={cartItem._id} align="center">
                        <Button colorScheme="teal" size="sm" onClick={() => handleRemoveFromCart(product._id)}>-</Button>
                        <Text mx={2}>{cartItem.quantity}</Text> 
                        <Button colorScheme="teal" size="sm" onClick={() => handleAddToCart(product._id)}>+</Button>
                      </Flex>
                    );
                  }
                })}

                {/* If no cart item found with matching productId, render "Add to Cart" button */}
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
