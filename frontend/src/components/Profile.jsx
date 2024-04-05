import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input, Box, Image, Text, Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updatePassword, updateProfile } from '../Redux/Login/action';
import Navbar from './Navbar';

const Profile = () => {
  const dispatch = useDispatch();

  // Retrieve user data from localStorage
  const userData = (localStorage.getItem('user'));

  // State variables for handling profile update
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [userName, setUserName] = useState(userData.userName);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState('');

  // State variables for handling password update
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // State variable for handling terms and conditions modal
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);


  // Function to handle profile update
  const handleUpdateProfile = () => {
    // Update user data
    const updatedUserData = { ...userData, userName, email };
    dispatch(updateProfile(updatedUserData)); // Dispatch action to update profile
    // Close the update modal
    setIsUpdateModalOpen(false);
  };

  // Function to handle opening the update modal
  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };


  // Function to handle password update
  const handleUpdatePassword = () => {
    dispatch(updatePassword(newPassword));
    setIsPasswordModalOpen(false);
  };

  // Function to handle opening the password modal
  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  // Function to handle opening the terms and conditions modal
  const handleOpenTermsModal = () => {
    setIsTermsModalOpen(true);
  };
  console.log(userData)

  return (
    <Box p={4}>
      <Navbar />

      <Flex direction="column" alignItems="center">
        {/* Display user avatar */}
        <Image src={userData.avatar} alt="User Avatar" borderRadius="full" boxSize="100px" mb={4} />

        {/* Display userName */}
        <Text fontSize="xl" fontWeight="bold" mb={2}>{userData.userName}</Text>

        {/* Display email */}
        <Text fontSize="md" mb={4}>{userData.email}</Text>

        {/* Button to update profile */}
        <Button colorScheme="teal" onClick={handleOpenUpdateModal} mb={4}>Update Profile</Button>

        {/* Button to open terms and conditions modal */}
        <Flex>
            <Button colorScheme="teal" mb={4} mr={4} onClick={handleOpenTermsModal}>Terms and Conditions</Button>

            {/* Button to change password */}
            <Button colorScheme="teal" onClick={handleOpenPasswordModal} mb={4}>Change Password</Button>
        </Flex>
      </Flex>

      {/* Update profile modal */}
      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>UserName</FormLabel>
              <Input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleUpdateProfile}>Update</Button>
            <Button onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Password update modal */}
      <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>New Password</FormLabel>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleUpdatePassword}>Update</Button>
            <Button onClick={() => setIsPasswordModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Terms and conditions modal */}
      <Modal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)}>
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
            <Button colorScheme="teal" onClick={() => setIsTermsModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Profile;
