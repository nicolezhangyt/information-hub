import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  Text,
  MenuDivider,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const authContextValue = useContext(AuthContext);

  return (
    <Box
      bg="blue.500"
      w="100%"
      minH="4rem"
      p={4}
      display="flex"
      justifyContent="flex-end"
    >
      {authContextValue?.user &&
        (authContextValue.user.username && authContextValue.user.jobTitle ? (
          <Menu>
            <MenuButton sx={{ cursor: 'pointer' }} as={Box}>
              <Flex align="center" gap={4}>
                <Box
                  w="44px"
                  h="44px"
                  borderRadius="50%"
                  bg="gray.200"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="lg"
                >
                  <Text textAlign="center">
                    {authContextValue.user.username.at(0)?.toUpperCase()}
                  </Text>
                </Box>
                <Box color="white">
                  <Text fontSize="lg" as="b">
                    {authContextValue.user.username}
                  </Text>
                  <Text fontSize="sm">{authContextValue.user.jobTitle}</Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList>
              <Text fontSize="md" pl={3} as="b" color="gray.600">
                {authContextValue.user.email}
              </Text>
              <MenuDivider />
              <MenuItem onClick={authContextValue?.editUser}>Edit</MenuItem>
              <MenuDivider />
              <MenuItem color="red.400" onClick={authContextValue?.logout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Text fontSize="md" color="white">
            {authContextValue.user.email}
          </Text>
        ))}
    </Box>
  );
};

export default Navbar;
