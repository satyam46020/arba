import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Spacer,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import logo from "../Assets/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Login/action";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
  return (
    <Box>
      <Flex p={4} color="Red">
        <Link to="/home">
          <Image src={logo} alt="Logo" h={10} />
        </Link>
        <Spacer />
        <Button as={Link} to="/cart" leftIcon={<FiShoppingCart />} variant="solid" colorScheme="teal" mr={4}>
          Cart
        </Button>
        <Menu>
          <MenuButton as={Button} rightIcon={<FaUserCircle />} variant="Blue" colorScheme="Blue">
            Profile
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/mystore">My Store</MenuItem>
            <MenuItem as={Link} to="/profile">Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      
    </Box>
  );
};

export default Navbar;
