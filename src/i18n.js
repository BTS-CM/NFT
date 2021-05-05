import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const en = require('./locales/en.json')
const da = require('./locales/da.json')
const th = require('./locales/th.json')

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    lng: "en",
    resources: {
      en: en,
      da: da,
      th: th
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
