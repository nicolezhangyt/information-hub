import { useQuery } from '@apollo/client';
import {
  Flex,
  Heading,
  Spinner,
  Text,
  List,
  ListItem,
  Card,
  CardBody,
  useDisclosure,
} from '@chakra-ui/react';
import { GET_CHARACTERS } from '../api/queries';
import { CharacterQueryData } from '../types/gqlQueryTypes';
import CharacterDetailsModal from './CharacterDetailsModal';
import { Character } from '../types/types';
import { useState } from 'react';

const InformationList = () => {
  const { loading, error, data } = useQuery<CharacterQueryData>(
    GET_CHARACTERS,
    { variables: { page: 1 } },
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();

  if (loading) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Text fontSize="xl">Failed to loading the data, please try again.</Text>
      </Flex>
    );
  }

  const onItemClick = (character: Character) => {
    setSelectedCharacter(character);
    onOpen();
  };

  return (
    <Flex direction="column">
      <Heading>Information Page</Heading>
      <List spacing={2} mt={8}>
        {data?.characters.results.map((character) => (
          <ListItem key={character.id} onClick={() => onItemClick(character)}>
            <Card
              variant="outline"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 0 0 2px #000',
                },
              }}
            >
              <CardBody>
                <Text>{character.name}</Text>
              </CardBody>
            </Card>
          </ListItem>
        ))}
      </List>
      <CharacterDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        character={selectedCharacter}
      />
    </Flex>
  );
};

export default InformationList;
