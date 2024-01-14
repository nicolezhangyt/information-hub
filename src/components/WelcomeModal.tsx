import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { ReactNode, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

type SlideType = 'Username' | 'Job title';

type WelcomeModalProps = {
  showClose: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const WelcomeModal = ({
  isOpen,
  onClose,
  showClose = false,
}: WelcomeModalProps) => {
  const [slideType, setSlideType] = useState<SlideType>('Username');
  const [username, setUsername] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [updating, setUpdating] = useState(false);
  const authContextValue = useContext(AuthContext);

  const onSave = async () => {
    setUpdating(true);
    await authContextValue?.updateUser?.(username, jobTitle);
    setUpdating(false);
    // reset
    reset();
    onClose();
  };

  const onCloseModal = () => {
    reset();
    onClose();
  };

  const onNext = () => {
    if (!!username && slideType === 'Username') {
      setSlideType('Job title');
    }
  };

  const reset = () => {
    setSlideType('Username');
    setUsername('');
    setJobTitle('');
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        {showClose && !updating && <ModalCloseButton />}
        <ModalBody>
          {slideType === 'Username' ? (
            <UsernameSlide
              inputValue={username}
              onInputChange={setUsername}
              onClick={onNext}
            />
          ) : (
            <JobTitleSlide
              inputValue={jobTitle}
              onInputChange={setJobTitle}
              onBackClick={() => setSlideType('Username')}
              onSave={onSave}
              isUpdating={updating}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

type UsernameSlideProps = Pick<
  BaseSlideProps,
  'inputValue' | 'onInputChange'
> & {
  onClick: () => void;
};

const UsernameSlide = ({
  inputValue,
  onInputChange,
  onClick,
}: UsernameSlideProps) => {
  return (
    <BaseSlide
      title="Please enter username"
      inputValue={inputValue}
      onInputChange={onInputChange}
      actionComponent={
        <Button
          mt={8}
          colorScheme="blue"
          w="100%"
          onClick={onClick}
          isDisabled={!inputValue}
        >
          Next
        </Button>
      }
    />
  );
};

type JobTitleSlideProps = Pick<
  BaseSlideProps,
  'inputValue' | 'onInputChange'
> & {
  isUpdating: boolean;
  onBackClick: () => void;
  onSave: () => void;
};

const JobTitleSlide = ({
  inputValue,
  onInputChange,
  isUpdating,
  onBackClick,
  onSave,
}: JobTitleSlideProps) => {
  return (
    <BaseSlide
      title="Please enter job title"
      inputValue={inputValue}
      onInputChange={onInputChange}
      actionComponent={
        <Flex mt={8} gap={6}>
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={onBackClick}
            flex="1"
            isDisabled={isUpdating}
          >
            Back
          </Button>
          <Button
            colorScheme="blue"
            onClick={onSave}
            flex="1"
            isDisabled={!inputValue}
            isLoading={isUpdating}
          >
            Save
          </Button>
        </Flex>
      }
    />
  );
};

type BaseSlideProps = {
  title: string;
  inputValue: string;
  onInputChange: (text: string) => void;
  actionComponent: ReactNode;
};

const BaseSlide = ({
  title,
  inputValue,
  onInputChange,
  actionComponent,
}: BaseSlideProps) => {
  return (
    <Flex direction="column" py="6">
      <Heading textAlign="center">{title}</Heading>
      <Input
        mt={12}
        size="lg"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <Box mt={4}>{actionComponent}</Box>
    </Flex>
  );
};

export default WelcomeModal;
