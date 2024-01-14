import React, { FormEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { signup, login } from '@/src/api/api';
import type { User } from '@/src/types/types';
import { useRouter } from 'next/router';
import { saveLocalUser } from '@/src/utils/auth';

type PageType = 'Login' | 'Sign up';

const Login = () => {
  const [pageType, setPageType] = useState<PageType>('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // reset form state
    setError('');
    setEmail('');
    setPassword('');
  }, [pageType]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      let user: User;
      if (pageType === 'Login') {
        user = await login(email, password);
      } else {
        user = await signup({ email, password });
      }
      saveLocalUser(user);
      router.replace('/');
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <Box bg="gray.100" w="full" h="100vh">
      <Flex align="center" justify="center" h="100%">
        <Box bg="white" w="400px" p={8} rounded="md">
          <Text mb={4} fontSize="2xl" fontWeight="bold">
            {pageType}
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {error && (
              <Box color="red.400" mt={2}>
                {error}
              </Box>
            )}
            <Button
              mt={8}
              w="100%"
              colorScheme="blue"
              type="submit"
              isDisabled={!(email && password)}
              isLoading={loading}
            >
              {pageType}
            </Button>
            <Text mt={4}>
              {pageType === 'Login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <Button variant="link" onClick={() => setPageType('Sign up')}>
                    Sign up
                  </Button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Button variant="link" onClick={() => setPageType('Login')}>
                    Login
                  </Button>
                </>
              )}
            </Text>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
