import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { config } from '../../config';

//
// Context
//
interface ApiAuthContext {
  isAuthenticated: boolean;
  loading: boolean;
  error?: Error;
  setDoAuth: (state: boolean) => void;
}

const API_AUTH_CONTEXT = createContext<ApiAuthContext | undefined>(undefined);

//
// Provider
//
interface ApiAuthProviderProps {
  lazy?: boolean;
}

async function authenticate() {
  const authUri = `${config.API_URI}/api/auth/authenticate`;
  return fetch(authUri, { method: 'POST', credentials: 'include' });
}

export const ApiAuthProvider: FC<ApiAuthProviderProps> = (props) => {
  const { lazy = false, children } = props;

  const [loading, setLoading] = useState(false);
  const [doAuth, setDoAuth] = useState(!lazy);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (isAuthenticated || loading || !doAuth) {
      return;
    }

    setDoAuth(false);
    setLoading(true);

    authenticate()
      .then((response) => {
        if (!response.ok) {
          setError(new Error('Auth failed'));
          return;
        }
        setIsAuthenticated(true);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [doAuth, isAuthenticated, loading]);

  return (
    <API_AUTH_CONTEXT.Provider
      value={{ isAuthenticated, loading, error, setDoAuth }}
    >
      {children}
    </API_AUTH_CONTEXT.Provider>
  );
};

//
// Hook
//
interface UseApiAuthResponse {
  isAuthenticated?: boolean;
  loading: boolean;
  error?: Error;
  authenticate: () => void;
}

export function useApiAuth(): UseApiAuthResponse {
  const context = useContext(API_AUTH_CONTEXT);
  if (!context) {
    throw new Error('Missing wrapping ApiAuthProvider');
  }

  const { isAuthenticated, loading, error, setDoAuth } = context;

  return {
    isAuthenticated,
    loading,
    error,
    authenticate: useCallback(() => setDoAuth(true), [setDoAuth]),
  };
}
