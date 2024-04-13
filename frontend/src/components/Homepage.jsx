import React, { useState } from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Product from "./Product";
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const tcopen = JSON.parse(localStorage.getItem("isopen"))
  const [isOpen, setIsOpen] = useState(tcopen);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setIsOpen(false);
    localStorage.setItem("isopen", JSON.stringify(false));

  };
  const handleCancel = () => {
    setIsOpen(false);
    localStorage.setItem("isopen", JSON.stringify(true));

  }

  const handleClick = () => {
    navigate('/product')
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

      <Box>
        <Navbar />
      </Box>
      <Box>
        <Carousel />
      </Box>
      <Box>
        <Product />
      </Box>
      <Button textAlign={"right"} colorScheme="teal" onClick={handleClick}>All Products</Button>
    </>
  );
};
