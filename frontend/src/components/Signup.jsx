import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../Redux/Register/action";
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
  FormErrorMessage,
  Spinner
} from "@chakra-ui/react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [nameError, setNameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isAuth = useSelector((store) => store.signupReducer.isAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!userName.trim()) {
      setUserNameError("User name is required");
      isValid = false;
    } else {
      setUserNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      setIsLoading(true);
      const payload=new FormData();
      payload.append('fullName', name);
      payload.append('userName',userName);
      payload.append('email',email);
      payload.append('password',password);
      payload.append('avatar',avatar);
      await dispatch(signup(payload));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <Flex align="center" justify="center" h="100vh">
      <Center width={1200}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuMCjTjLy6tF52cg1RjGzSEX8jdLSbbCjkyWyfU_tYIoqUd2Fv" alt="" width="30%" />
        <Box
          p={10}
          maxW="md"
          overflow="hidden"
        >
          <Heading as="h3" size="lg" mb={4}>
            Register
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4} isInvalid={!!nameError}>
              <FormLabel>
                Name<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                size="md"
              />
              <FormErrorMessage>{nameError}</FormErrorMessage>
            </FormControl>
            <FormControl mb={4} isInvalid={!!userNameError}>
              <FormLabel>
                User Name<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your user name"
                size="md"
              />
              <FormErrorMessage>{userNameError}</FormErrorMessage>
            </FormControl>
            <FormControl mb={4} isInvalid={!!emailError}>
              <FormLabel>
                Email<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                size="md"
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>
            <FormControl mb={6} isInvalid={!!passwordError}>
              <FormLabel>
                Password<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                size="md"
              />
              <FormErrorMessage>{passwordError}</FormErrorMessage>
            </FormControl>
            <FormControl mb={6}>
              <FormLabel>Avatar</FormLabel>
              <Input
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                
                name="avatar"  
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" size="md" width="100%" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : 'Sign Up'}
            </Button>
          </form>
          <Flex justify="center" mt={4}>
            <Text>Already have an account? </Text>
            <Button
              as={Link}
              to="/"
              variant="link"
              colorScheme="blue"
              ml={1}
            >
              Login
            </Button>
          </Flex>
        </Box>
      </Center>
    </Flex>
  );
};

export default Register;
