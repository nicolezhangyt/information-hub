import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Box,
  Image,
  Button,
} from '@chakra-ui/react';
import { Character } from '../types/types';

type CharacterDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  character?: Character;
};

const CharacterDetailsModal = ({
  character,
  isOpen,
  onClose,
}: CharacterDetailsModalProps) => {
  if (!character) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{character.name}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" align="center" gap={6} padding={8}>
            <Image
              boxSize="150px"
              objectFit="cover"
              src={character.image}
              alt={`${character.name} image`}
            />
            <Box>
              <Text>ID: {character.id}</Text>
              <Text>Name: {character.name}</Text>
              <Text>Gender: {character.gender}</Text>
              <Text>Status: {character.status}</Text>
              <Text>Species: {character.species}</Text>
            </Box>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CharacterDetailsModal;
