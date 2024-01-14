import { User } from '../types/types';
import * as Server from '../utils/server';

/**
 * Mock API functions that use local storage o store and retrieve data.
 */

// sign up and create new user flow
export const signup = (user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(Server.signup(user));
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};

// login and authenticate user
export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(Server.login({ email, password }));
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};

// update user's profile
export const updateUser = (user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(Server.updateUser(user));
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};
