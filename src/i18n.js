import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const en = require('./locales/en.json')

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: en
    },
    lng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

console.log(i18n.t('mainpage:stat1.header'))

export default i18n;
