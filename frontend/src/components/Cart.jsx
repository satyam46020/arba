import React, { useEffect, useState } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';

const Cart = ({ cart, products, handleAddToCart, handleRemoveFromCart, handleCheckout }) => {
  return (
    <Flex direction="column" align="center" justify="center" mt={8}>
      <Flex direction="column" align="center">
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Your Cart
        </Text>
        {Object.keys(cart).map((productId) => (
          <Flex key={productId} align="center" justify="space-between" borderWidth="1px" borderRadius="lg" p={4} mb={2}>
            <Text fontSize="md" fontWeight="semibold">{products.find(product => product._id === productId).title}</Text>
            <Flex align="center">
              <Button colorScheme="teal" size="sm" onClick={() => handleRemoveFromCart(productId)}>-</Button>
              <Text mx={2}>{cart[productId]}</Text>
              <Button colorScheme="teal" size="sm" onClick={() => handleAddToCart(productId)}>+</Button>
            </Flex>
          </Flex>
        ))}
        <Button colorScheme="teal" size="md" onClick={handleCheckout} disabled={Object.keys(cart).length === 0}>Checkout</Button>
      </Flex>
    </Flex>
  );
};

export default Cart;
