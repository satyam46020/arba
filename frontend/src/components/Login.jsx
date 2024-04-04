import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false); // State to track login error
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

    dispatch(login({ email, password }))
        // If login is successful, isAuth will be true
        if (!isAuth) {
          // If login fails, set loginError to true
          setLoginError(true);
        }
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
          </form >
            {/* {loginError && ( 
              <Alert status="error" mb={4}>
                <AlertIcon />
                Invalid credentials. Please try again.
              </Alert>
            )} */}
          <Flex justify="center" mt={4}>
            <Text>Don't have an account? </Text>
            <Button as={Link} to="/register" variant="link" colorScheme="blue" ml={1}>
              Register
            </Button>
          </Flex>
        </Box>
      </Center>
    </Flex>
  );
};

export default Login;
