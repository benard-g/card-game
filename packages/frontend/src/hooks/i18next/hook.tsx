import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { initReactI18next } from 'react-i18next';

//
// Context
//
interface Context {
  loading: boolean;
  error?: Error;
  languages: string[];
}

const I18NEXT_CONTEXT = createContext<Context | undefined>(undefined);

//
// Provider
//
interface Props {
  fallbackLanguage: string;
  languages: string[];
}

interface State {
  loading: boolean;
  ready: boolean;
  error?: Error;
}

export const I18nextProvider: FC<Props> = (props) => {
  const { children, fallbackLanguage, languages } = props;

  const [state, setState] = useState<State>({
    loading: true,
    ready: false,
    error: undefined,
  });

  const loadI18n = useCallback(async () => {
    try {
      await i18n
        .use(Backend)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          fallbackLng: fallbackLanguage,
          whitelist: languages,
          react: { wait: true },
          debug: false,
          returnEmptyString: false,
          returnObjects: true,
        });
      setState({
        ready: true,
        loading: false,
        error: undefined,
      });
    } catch (err) {
      setState({
        ready: false,
        loading: false,
        error: err,
      });
    }
  }, [fallbackLanguage, languages]);

  useEffect(() => {
    if (state.ready || state.error) {
      return;
    }
    loadI18n();
  }, [state, loadI18n]);

  return (
    <I18NEXT_CONTEXT.Provider
      value={{ loading: state.loading, error: state.error, languages }}
    >
      {children}
    </I18NEXT_CONTEXT.Provider>
  );
};

//
// Hook
//
interface HookResponse {
  loading: boolean;
  error?: Error;
  languages: string[];
}

export function useI18nextConfig(): HookResponse {
  const context = useContext(I18NEXT_CONTEXT);
  if (!context) {
    throw new Error('Missing wrapping I18nextProvider');
  }

  const { loading, error, languages } = context;

  return {
    loading,
    error,
    languages,
  };
}
