import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Spacer, Image, Button, Menu, MenuButton, MenuList, MenuItem, Badge } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import logo from "../Assets/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Login/action";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cart, setCart] = useState({}); 

    const savedCart = localStorage.getItem('cart');
    useEffect(() => {
      if (savedCart) {
            const cartData = JSON.parse(savedCart);
            setCart(cartData);
        }
    }, [savedCart]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.setItem("isopen", JSON.stringify(false));
        navigate('/');
    };

    const totalCartItems = Object.values(cart).reduce((total, count) => total + count, 0);

    return (
        <Box>
            <Flex p={4} color="Red">
                <Link to="/home">
                    <Image src={logo} alt="Logo" h={10} />
                </Link>
                <Spacer />
                <Button as={Link} to="/cart" variant="ghost" colorScheme="teal" mr={4}>
                    <FiShoppingCart size={24} />
                    {totalCartItems > 0 && (
                        <Badge colorScheme="teal" fontSize="xs" ml="1" position="absolute" top="-4px" right="-4px">
                            {totalCartItems}
                        </Badge>
                    )}
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
