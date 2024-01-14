import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { gqlClient } from '@/src/api/gqlClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ApolloProvider client={gqlClient}>
        <Component {...pageProps} />{' '}
      </ApolloProvider>
    </ChakraProvider>
  );
}
