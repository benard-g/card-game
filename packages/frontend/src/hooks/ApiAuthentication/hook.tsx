import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { authenticateUser } from './utils';

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
interface State {
  authenticated: boolean;
  loading: boolean;
  error?: Error;
}

export const ApiAuthProvider: FC = (props) => {
  const { children } = props;

  const [state, setState] = useState<State>({
    authenticated: false,
    loading: true,
    error: undefined,
  });

  const doAuth = useCallback(async () => {
    try {
      const response = await authenticateUser();
      if (!response.ok) {
        setState({
          authenticated: false,
          loading: false,
          error: new Error('Auth failed'),
        });
        return;
      }

      setState({
        authenticated: true,
        loading: false,
        error: undefined,
      });
    } catch (err) {
      setState({
        authenticated: false,
        loading: false,
        error: err,
      });
    }
  }, []);

  useEffect(() => {
    if (state.authenticated || state.error) {
      return;
    }
    doAuth();
  }, [state, doAuth]);

  return (
    <API_AUTH_CONTEXT.Provider
      value={{ loading: state.loading, error: state.error }}
    >
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
