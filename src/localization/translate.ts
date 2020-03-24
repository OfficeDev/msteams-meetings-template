import { createIntl, createIntlCache } from 'react-intl';
import _ from 'lodash';

const supportedLocales = [
  'ar',
  'bg',
  'cs',
  'cy',
  'da',
  'de',
  'en-us',
  'en-gb',
  'es',
  'es-mx',
  'fi',
  'fr',
  'fr-ca',
  'he',
  'is',
  'it',
  'ja',
  'ko',
  'nb',
  'nl',
  'no',
  'nn-no',
  'pl',
  'pt-br',
  'pt-pt',
  'ru',
  'sv',
  'th',
  'tr',
  'zh-cn',
  'zh-tw'
];

export function getUserLocale() {
  let locale = [];

  if (navigator.languages) {
    locale.push(navigator.languages[0].toLocaleLowerCase());
  } else if (navigator.language) {
    locale.push(navigator.language.toLocaleLowerCase());
  } else {
    locale.push('en-us');
  }

  return locale[0];
}

const userLocale = getUserLocale();

async function loadTranslations() {
  let translations;

  if (_.includes(supportedLocales, userLocale)) {
    translations = await import(`../translations/${userLocale}/strings.json`);
  } else {
    translations = await import(`../translations/en-us/strings.json`);
  }

  return translations;
}

loadTranslations().then((translatedStrings: any) => {
  sessionStorage.setItem(
    'translatedStrings',
    JSON.stringify(translatedStrings.default)
  );
});

let storedTranslations = sessionStorage.getItem('translatedStrings');

export let messages: any = storedTranslations
  ? JSON.parse(storedTranslations)
  : {};

const cache = createIntlCache();
let int = createIntl(
  {
    locale: userLocale,
    messages: messages
  },
  cache
);

export async function getMessages(): Promise<any>
{
  if (!!storedTranslations)
  {
    return JSON.parse(storedTranslations);
  }
  console.log("Translation not cached, loading...");
  await loadTranslations();

  // Load the translations into the storedTranslations variable again.
  storedTranslations = sessionStorage.getItem('translatedStrings');

  if (!storedTranslations)
  {
    console.error("Unable to load translations");
    return {};
  }

  messages = JSON.parse(storedTranslations);
  int = createIntl(
    {
      locale: userLocale,
      messages: messages
    },
    cache
  );
  
  return messages;
}

export const translate = (id: string, values?: {}) => {
  return int.formatMessage({ id }, values);
};
