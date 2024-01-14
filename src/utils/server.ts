/**
 * Mock a remote server using local storage
 */

import { User } from '../types/types';

const getUserByEmail = (email: string): User | undefined => {
  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
  return users.find((user) => user.email === email);
};

export const signup = (user: User) => {
  const savedUser = getUserByEmail(user.email);
  if (savedUser) {
    throw new Error('User already exists');
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  return user;
};

export const login = ({
  email,
  password,
}: Pick<User, 'email' | 'password'>): User => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = getUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  if (user.password !== password) {
    throw new Error('Invalid password');
  }

  return user;
};

export const updateUser = (user: User): User => {
  if (!user.email) {
    throw new Error('Email is required');
  }

  const prevUser = getUserByEmail(user.email);
  if (!prevUser) {
    throw new Error('User not found');
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
  const otherUsers = users.filter(
    (savedUser) => savedUser.email !== user.email,
  );
  const updatedUser: User = { ...prevUser, ...user };
  const newUsers = [...otherUsers, updatedUser];
  localStorage.setItem('users', JSON.stringify(newUsers));

  return updatedUser;
};
