import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input, Box, Image, Text, Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updatePassword, updateProfile } from '../Redux/Login/action';
import Navbar from './Navbar';

const Profile = () => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('user'));
  
  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [id, setId] = useState(userData._id);
  const [name, setName] = useState(userData.fullName)
  const [userName, setUserName] = useState(userData.userName);
  const [email, setEmail] =useState(userData.email)
  const [avatar, setAvatar] = useState(userData.avatar);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  
  var tcopen = JSON.parse(localStorage.getItem("isopen"))
  const [isOpen, setIsOpen] = useState(tcopen);
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user'));
    dispatch(updateProfile(userData._id, name, userName, avatar)); 
    const updatedUser = {
      ...userData,
      _id:id,
      fullName:name,
      userName,
      email
    }
    localStorage.setItem('user', JSON.stringify(updatedUser));
  },[name,userName,avatar])

  const handleUpdateProfile = () => {
    setIsUpdateModalOpen(false);
  };

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleUpdatePassword = () => {
    dispatch(updatePassword(userData._id,newPassword));
    setIsPasswordModalOpen(false);
    if(JSON.parse(localStorage.getItem("isPasswordChanged"))){
      alert("Password changed successfully!");
    }
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleOpenTermsModal = () => {
    setIsTermsModalOpen(true);
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
    <Box p={4}>
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

      <Flex direction="column" alignItems="center">
        {/* Display user avatar */}
        <Image src={userData.avatar} alt="User Avatar" borderRadius="full" boxSize="100px" mb={4} />

        <Text fontSize="xl" fontWeight="bold" mb={2}>{userData.fullName}</Text>
        
        <Text fontSize="l" fontWeight="bold" mb={2}>Username : {userData.userName}</Text>

        <Text fontSize="md" mb={4}>{userData.email}</Text>

        <Button colorScheme="teal" onClick={handleOpenUpdateModal} mb={4}>Update Profile</Button>

        <Flex>
            <Button colorScheme="teal" mb={4} mr={4} onClick={handleOpenTermsModal}>Terms and Conditions</Button>

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
              <FormLabel>Full Name</FormLabel>
              <Input type="name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>UserName</FormLabel>
              <Input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </FormControl>
            <FormControl mb={6}>
              <FormLabel>Avatar</FormLabel>
              <Input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
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
            Welcome to E-Commerce, where we provide a platform for purchasing products and services online. By using our website, you agree to comply with all applicable laws and regulations. We offer a range of products and services, and while we strive for accuracy, pricing and availability may change without notice. Payment is due at the time of purchase, and we accept various payment methods. Shipping and delivery times may vary, and we offer a return policy for eligible items. All content on our website is protected by intellectual property laws. We value your privacy and handle personal information according to our privacy policy.
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
