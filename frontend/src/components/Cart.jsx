import React, { useEffect, useState } from 'react';
import { useToast, Button, Flex, Image, Text, Box, Grid, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, fetchCart, updateCart } from '../Redux/Cart/action';
import { fetchProducts } from '../Redux/Product/action';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const carts = useSelector((state) => state.cartReducer.cartItems);
  const products = useSelector((state) => state.productReducer.products);

  const user = JSON.parse(localStorage.getItem("user"));
  const tcopen = JSON.parse(localStorage.getItem("isopen"));

  const [isOpen, setIsOpen] = useState(tcopen);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch,carts]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };
  
  const handleRemoveFromCart = (cart) => {
    dispatch(updateCart(cart._id, cart.quantity));
  };

  const handleCheckout = () => {
    showToastSuccess("Thank you for Shopping!!!");
    navigate("/home")
  };

  const handleConfirm = () => {
    setIsOpen(false);
    localStorage.setItem("isopen", JSON.stringify(false));
  };

  const handleCancel = () => {
    setIsOpen(false);
    localStorage.setItem("isopen", JSON.stringify(true));
  };

  const showToastSuccess = (message) => {
    toast({
      title: message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms and Conditions</ModalHeader>
          <ModalBody>
            <Text>
              Welcome to E-Commerce, where we provide a platform for purchasing products and services online. By using our website, you agree to comply with all applicable laws and regulations. We offer a range of products and services, and while we strive for accuracy, pricing and availability may change without notice. Payment is due at the time of purchase, and we accept various payment methods. Shipping and delivery times may vary, and we offer a return policy for eligible items. All content on our website is protected by intellectual property laws. We value your privacy and handle personal information according to our privacy policy.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleCancel} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleConfirm}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Navbar />
      <Box align="center">
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Cart Page
        </Text>
      </Box>
      {carts.length === 0 ? (
        <Box align="center">
          <Text fontSize="7xl" fontWeight="semibold" mb={4} color={"red"}>
            Your cart is empty....
          </Text>
        </Box>
      ) : (
        <Box justifyContent="center" m={8} p="auto">
          <Grid templateColumns="repeat(4,25%)" justifyContent={'space-around'} gap={5}>
            {carts.map((cartItem) => (
              <Flex key={cartItem._id} direction="column" align="center" borderWidth="1px" borderRadius="lg" p={4} maxW="200px">
                <Flex align="center" direction="column">
                  <Image src={products.find(product => product._id === cartItem.productId && user._id === cartItem.owner )?.image} alt="Product Image" boxSize="100px" objectFit="cover" mb={2} />
                  <Text fontSize="md" fontWeight="semibold">{products.find(product => product._id === cartItem.productId && user._id === cartItem.owner )?.title}</Text>
                </Flex>
                <Flex align="center">
                  <Button colorScheme="teal" size="sm" onClick={() => handleRemoveFromCart(cartItem)}>-</Button>
                  <Text mx={2}>{cartItem.quantity}</Text>
                  <Button colorScheme="teal" size="sm" onClick={() => handleAddToCart(cartItem.productId)}>+</Button>
                </Flex>
              </Flex>
            ))}
          </Grid>
        </Box>
      )}
      <Box align="center">
        <Button colorScheme="teal" size="md" onClick={handleCheckout} disabled={carts.length === 0}>Checkout</Button>
      </Box>
    </>
  );
};

export default Cart;
