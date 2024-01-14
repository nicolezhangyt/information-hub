import type { User } from '../types/types';

export const saveLocalUser = (user: User): User => {
  const { password, ...rest } = user;
  // eliminate sensitive data
  const userWithoutPw = { ...rest };
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPw));
  return userWithoutPw;
};

export const getLocalUser = (): User | undefined => {
  const currentUserStr = localStorage.getItem('currentUser');
  if (currentUserStr) {
    return JSON.parse(currentUserStr) as User;
  }
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const isUserSetUp = (user?: User): boolean => {
  return !!user?.username && !!user?.jobTitle;
};
