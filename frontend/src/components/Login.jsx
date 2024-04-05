import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Redux/Login/action";
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
} from "@chakra-ui/react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(
    false
  );
  const isAuth = useSelector((store) => store.loginReducer.isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate("/Home");
    }
  }, [isAuth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }

    dispatch(login({ email, password }));
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

  return (
    <Flex align="center" justify="center" h="100vh">
      <Center>
        <Box
          p={10}
          maxW="md"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
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
            <Button type="submit" colorScheme="teal" size="md" width="100%">
              Log In
            </Button>
            <Button
              colorScheme="blue"
              variant="link"
              size="sm"
              mt={2}
              onClick={handleOpenForgotPasswordModal}
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
      </Center>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotPasswordModalOpen}
        onClose={handleCloseForgotPasswordModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalBody>
            {/* Implement your forgot password form here */}
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={handleCloseForgotPasswordModal}
            >
              Submit
            </Button>
            <Button onClick={handleCloseForgotPasswordModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Login;
