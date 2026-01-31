import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(initReactI18next)            
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'am'],

    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },

    ns: ['translation'],
    defaultNS: 'translation',

    interpolation: {
      escapeValue: false
    },

    react: {
      useSuspense: false
    }
  });

export default i18n;
