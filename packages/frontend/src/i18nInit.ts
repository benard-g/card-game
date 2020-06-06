import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export async function init(): Promise<void> {
  await i18n
    // load translations using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    .init({
      detection: {
        order: ['querystring', 'localStorage', 'navigator'],
        lookupLocalStorage: 'i18nextLng',
        lookupQuerystring: 'lng',
        caches: ['localStorage'],
      },
      whitelist: ['en', 'fr'],
      preload: ['en'],
      debug: process.env.NODE_ENV !== 'production',
      fallbackLng: 'en',
    });
}
