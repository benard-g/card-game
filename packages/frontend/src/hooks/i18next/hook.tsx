import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

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
interface ProviderProps {
  fallbackLanguage: string;
  languages: string[];
}

export const I18nextProvider: FC<ProviderProps> = (props) => {
  const { children, fallbackLanguage, languages } = props;

  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (ready) {
      return;
    }

    i18n
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
      })
      .then(() => {
        setReady(true);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, ready, fallbackLanguage, languages]);

  return (
    <I18NEXT_CONTEXT.Provider value={{ loading, error, languages }}>
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
