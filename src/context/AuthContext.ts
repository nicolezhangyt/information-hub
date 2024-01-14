import { createContext } from 'react';
import type { User } from '../types/types';

type AuthContextValue = {
  user?: User;
  updateUser?: (username: string, jobTitle: string) => Promise<void>;
  logout?: () => void;
  editUser?: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
