import { gql } from '@apollo/client';

/* 
  https://rickandmortyapi.com/documentation/#graphql 
*/
export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        gender
        status
        species
        image
      }
    }
  }
`;
