import React, { useState } from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Product from "./Product";
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Text } from "@chakra-ui/react";

export const Homepage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms and Conditions</ModalHeader>
          <ModalBody>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero id sem rhoncus consequat. Vivamus id felis id leo convallis dictum ac vel felis. Mauris sit amet dapibus nulla. In hac habitasse platea dictumst. Nullam tristique
              ligula eu mi eleifend, ac feugiat velit malesuada. Integer at magna id orci efficitur rutrum in at turpis.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3}>
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
    </>
  );
};
