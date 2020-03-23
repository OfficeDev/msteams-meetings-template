import { createIntl, createIntlCache } from "react-intl";
import locale_en from '../translations/en.json';

export function getUserLocale() {
  let locale = []

  if (navigator.languages) {
    locale.push(navigator.languages[0].toLocaleLowerCase()); 
  } else if (navigator.language) {
    locale.push(navigator.language.toLocaleLowerCase());
  } else {
    locale.push('en');
  }

  return locale[0];
}

export const messages: any = {
  'en': locale_en,
  'en-us': locale_en
};

const userLocale = getUserLocale();

const cache = createIntlCache();

const int = createIntl(
  {
    locale: userLocale,
    messages: messages[userLocale]
  },
  cache
);

export const translate = (id: string, values?: {}) => {
  return int.formatMessage({ id }, values);
};
