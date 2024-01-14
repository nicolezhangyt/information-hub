import Navbar from '@/src/components/Navbar';
import WelcomeModal from '@/src/components/WelcomeModal';
import { AuthContext } from '@/src/context/AuthContext';
import { User } from '@/src/types/types';
import { getLocalUser, isUserSetUp, saveLocalUser } from '@/src/utils/auth';
import { useDisclosure, Box, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { updateUser as updateUserApi } from '@/src/api/api';
import { logout as logoutUser } from '@/src/utils/auth';
import InformationList from '@/src/components/InformationList';

const Home = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<User>();
  const [isEditUser, setIsEditUser] = useState(false);

  useEffect(() => {
    // user check
    const savedUser = getLocalUser();
    if (!savedUser) {
      router.replace('/signin');
      return;
    }

    setUser(savedUser);

    if (!isUserSetUp(savedUser)) {
      onOpen();
    }
  }, []);

  const updateUser = useCallback(async (username: string, jobTitle: string) => {
    if (user) {
      const updatedUser = await updateUserApi({
        email: user.email,
        username,
        jobTitle,
      });
      const newSavedLocalUser = saveLocalUser(updatedUser);
      setUser(newSavedLocalUser);
    }
  }, [user]);

  const logout = useCallback(() => {
    logoutUser();
    router.reload();
  }, []);

  const editUser = useCallback(() => {
    setIsEditUser(true);
    onOpen();
  }, []);

  const ctxValue = useMemo(
    () => ({
      user,
      updateUser,
      logout,
      editUser,
    }),
    [user, updateUser, logout, editUser],
  );

  const handleModalClose = () => {
    const savedUser = getLocalUser();
    setUser(savedUser);
    onClose();
  };

  return (
    <AuthContext.Provider value={ctxValue}>
      <Box>
        <Navbar />
        <Container centerContent>
          <Box padding="12">{isUserSetUp(user) && <InformationList />}</Box>
        </Container>
        <WelcomeModal
          isOpen={isOpen}
          onClose={handleModalClose}
          showClose={isEditUser}
        />
      </Box>
    </AuthContext.Provider>
  );
};

export default Home;
