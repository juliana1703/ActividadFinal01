import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, User, LoginRequest, RegisterRequest } from '../types/auth';
import { apiClient } from '../utils/api';
import { storageManager } from '../utils/storage';

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  changePassword: (passwordData: any) => Promise<void>;
}

type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string; refreshToken: string; rememberMe: boolean } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User };

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
  rememberMe: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        rememberMe: action.payload.rememberMe,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Initialize auth state from storage
    const initializeAuth = () => {
      try {
        const { token, refreshToken, rememberMe } = storageManager.getCurrentTokens();
        const user = storageManager.getUser(rememberMe);

        if (token && user) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, token, refreshToken: refreshToken || '', rememberMe }
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        storageManager.clearAuth();
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiClient.login(credentials);
      
      if (response.isAuthenticated) {
        // Store auth data
        storageManager.setToken(response.token, credentials.rememberMe);
        storageManager.setRefreshToken(response.refreshToken, credentials.rememberMe);
        storageManager.setUser(response.user, credentials.rememberMe);
        storageManager.setRememberMe(credentials.rememberMe);

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
            rememberMe: credentials.rememberMe,
          }
        });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await apiClient.register(userData);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = (): void => {
    storageManager.clearAuth();
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = async (email: string): Promise<void> => {
    await apiClient.resetPassword(email);
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    const updatedUser = await apiClient.updateProfile(userData);
    storageManager.setUser(updatedUser, state.rememberMe);
    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
  };

  const changePassword = async (passwordData: any): Promise<void> => {
    await apiClient.changePassword(passwordData);
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};