import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const en = require('./locales/en.json');
const th = require('./locales/th.json');
const de = require('./locales/de.json');
const da = require('./locales/da.json');
const es = require('./locales/es.json');
const it = require('./locales/it.json');
const fr = require('./locales/fr.json');
const ko = require('./locales/ko.json');
const pt = require('./locales/pt.json');
const ja = require('./locales/ja.json');
const ru = require('./locales/ru.json');

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    lng: "en",
    resources: {
      en: en,
      da: da,
      de: de,
      es: es,
      th: th,
      it: it,
      fr: fr,
      ko: ko,
      pt: pt,
      ja: ja,
      ru: ru
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
