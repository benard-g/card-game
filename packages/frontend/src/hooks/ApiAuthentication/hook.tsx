import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';

import { config } from '../../config';

//
// Context
//
interface Context {
  loading: boolean;
  error?: Error;
}

const API_AUTH_CONTEXT = createContext<Context | undefined>(undefined);

//
// Provider
//
async function authenticate() {
  const authUri = `${config.API_URI}/api/auth/authenticate`;
  return fetch(authUri, { method: 'POST', credentials: 'include' });
}

export const ApiAuthProvider: FC = (props) => {
  const { children } = props;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

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
  }, [isAuthenticated, loading]);

  return (
    <API_AUTH_CONTEXT.Provider value={{ loading, error }}>
      {children}
    </API_AUTH_CONTEXT.Provider>
  );
};

//
// Hook
//
interface HookResponse {
  loading: boolean;
  error?: Error;
}

export function useApiAuth(): HookResponse {
  const context = useContext(API_AUTH_CONTEXT);
  if (!context) {
    throw new Error('Missing wrapping ApiAuthProvider');
  }

  const { loading, error } = context;

  return {
    loading,
    error,
  };
}
