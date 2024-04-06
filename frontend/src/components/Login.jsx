import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword, login, updatePassword } from "../Redux/Login/action";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
  Center,
  Text,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner
} from "@chakra-ui/react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const isAuth = useSelector((store) => store.loginReducer.isAuth);

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("isopen",JSON.stringify(true));
      navigate("/Home");
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }

    setIsLoggingIn(true);
    dispatch(login({ email, password }));
    setIsLoggingIn(false);
    if (!isAuth) {
      setLoginError(true);
    }
  };

  const handleOpenForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const handleCloseForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };

  const handleClosePasswordResetModal = () => {
    setIsPasswordResetModalOpen(false);
  };

  const handleEmailSubmit = () => {
    dispatch(forgotPassword(email));

    setIsForgotPasswordModalOpen(false);
    setIsPasswordResetModalOpen(true);
  };

  const User_id = JSON.parse(localStorage.getItem("userId"))
  const handleNewPasswordSubmit = () => {
    dispatch(updatePassword(User_id,newPassword))
    setIsPasswordResetModalOpen(false);
    if(JSON.parse(localStorage.getItem("isPasswordChanged"))){
      alert("Password changed successfully!");
    }
  };

  return (
    <Flex align="center" justify="center" h="100vh" >
      <Center width={1200}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuMCjTjLy6tF52cg1RjGzSEX8jdLSbbCjkyWyfU_tYIoqUd2Fv" alt="" width="30%" />
        <Box
          p={10}
          maxW="md"
          overflow="hidden"
          display="flex" 
          alignItems="center" 
        >
          <Box >
            <Heading as="h2" size="lg" mb={4}>
              Login
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4} isInvalid={emailError}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(!e.target.value);
                  }}
                  placeholder="Enter your email"
                  size="md"
                />
              </FormControl>
              <FormControl mb={6} isInvalid={passwordError}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(!e.target.value);
                  }}
                  placeholder="Enter your password"
                  size="md"
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" size="md" width="100%" disabled={isLoggingIn}>
                {isLoggingIn ? <Spinner size="sm" /> : 'Log In'}
              </Button>
              <Button
                colorScheme="blue"
                variant="link"
                size="sm"
                mt={2}
                onClick={handleOpenForgotPasswordModal}
                disabled={isLoggingIn}
              >
                Forgot Password?
              </Button>
            </form>
            <Flex justify="center" mt={4}>
              <Text>Don't have an account? </Text>
              <Button as={Link} to="/register" variant="link" colorScheme="blue" ml={1}>
                Register
              </Button>
            </Flex>
          </Box>
        </Box>
      </Center>

      <Modal
        isOpen={isForgotPasswordModalOpen}
        onClose={handleCloseForgotPasswordModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => { setEmail(e.target.value)}} placeholder="Enter your email" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={handleEmailSubmit}
            >
              Submit
            </Button>
            <Button onClick={handleCloseForgotPasswordModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isPasswordResetModalOpen}
        onClose={handleClosePasswordResetModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>New Password</FormLabel>
              <Input type="password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value)}} placeholder="Enter your new password" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={handleNewPasswordSubmit}
            >
              Submit
            </Button>
            <Button onClick={handleClosePasswordResetModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Login;
