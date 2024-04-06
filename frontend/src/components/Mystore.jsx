import React, { useState } from 'react';
import { Box, Button, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import CategoryTable from './CategoryTable';
import Navbar from './Navbar';
import ProductTable from './ProductTable';

const Mystore = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  
  const tcopen = JSON.parse(localStorage.getItem("isopen"))
  const [isOpen, setIsOpen] = useState(tcopen);

  const handleCategoryClick = () => {
    setShowCategories(true);
    setShowProducts(false);
  };

  const handleProductClick = () => {
    setShowCategories(false);
    setShowProducts(true);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    localStorage.setItem("isopen", JSON.stringify(false));

  };
  const handleCancel = () => {
    setIsOpen(false);
    localStorage.setItem("isopen", JSON.stringify(true));
  }

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
