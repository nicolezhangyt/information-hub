import { ApolloClient, InMemoryCache } from '@apollo/client';

const gqlClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export { gqlClient };
