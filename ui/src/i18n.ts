import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

import en from './locales/en.json'

const resources: Resource = {
  en: {
    translation: en
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;