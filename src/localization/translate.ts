import { createIntl, createIntlCache } from 'react-intl';

const defaultLocale = 'en-US';
const supportedLocalesAndFallbackMap: Record<string, string> = {
  'ar': 'ar-SA',
  'ar-sa': 'ar-SA',
  'bg': 'bg-BG',
  'bg-bg': 'bg-BG',
  'cs': 'cs-CZ',
  'cs-cz': 'cs-CZ',
  'cy': 'cy-GB',
  'cy-gb': 'cy-GB',
  'da': 'da-DK',
  'da-dk': 'da-DK',
  'de': 'de-DE',
  'de-de': 'de-DE',
  'en': 'en-US',
  'en-gb': 'en-GB',
  'en-us': 'en-US',
  'es': 'es-ES',
  'es-es': 'es-ES',
  'es-mx': 'es-MX',
  'fi': 'fi-FI',
  'fi-fi': 'fi-FI',
  'fr': 'fr-FR',
  'fr-fr': 'fr-FR',
  'fr-ca': 'fr-CA',
  'he': 'he-IL',
  'he-il': 'he-IL',
  'is': 'is-IS',
  'is-is': 'is-IS',
  'it': 'it-IT',
  'it-it': 'it-IT',
  'ja': 'ja-JP',
  'ja-jp': 'ja-JP',
  'ko': 'ko-KR',
  'ko-kr': 'ko-KR',
  'nb': 'nb-NO',
  'nb-no': 'nb-NO',
  'nl': 'nl-NL',
  'nl-nl': 'nl-NL',
  'nn': 'nn-NO',
  'nn-no': 'nn-NO',
  'no': 'nb-NO',
  'pl': 'pl-PL',
  'pl-pl': 'pl-PL',
  'pt': 'pt-BR',
  'pt-br': 'pt-BR',
  'pt-pt': 'pt-PT',
  'ru': 'ru-RU',
  'ru-ru': 'ru-RU',
  'sk': 'sk-SK',
  'sk-sk': 'sk-SK',
  'sr': 'sr-Latn-RS',
  'sr-latn-rs': 'sr-Latn-RS',
  'sv': 'sv-SE',
  'sv-se': 'sv-SE',
  'th': 'th-TH',
  'th-th': 'th-TH',
  'tr': 'tr-TR',
  'tr-tr': 'tr-TR',
  'zh': 'en-US',
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW',
};

export function getUserLocale() {
  if (navigator.languages) {
    return navigator.languages[0].toLowerCase();
  } else if (navigator.language) {
    return navigator.language.toLowerCase();
  } else {
    return defaultLocale;
  }
}

function getTranslationLocale(locale: string) {
  if (supportedLocalesAndFallbackMap.hasOwnProperty(locale)) {
    return supportedLocalesAndFallbackMap[locale];
  } else if (locale.indexOf('-') > -1) {
    const index = locale.indexOf('-');
    const languageCode = locale.substring(0, index);
    return supportedLocalesAndFallbackMap.hasOwnProperty(languageCode) ? supportedLocalesAndFallbackMap[languageCode] : defaultLocale;
  } else {
    return defaultLocale;
  }
}

async function loadTranslations(sku: string, userLocale: string) {
  const translationLocale = getTranslationLocale(userLocale);
  console.log(`Using ${translationLocale} strings for ${userLocale} in ${sku}`);

  let stringsModule: any;
  try {
    stringsModule = await import(`../translations/${sku}/${translationLocale}/strings.json`);
  } catch (e) {
    console.error(`Failed to load ${translationLocale} in ${sku}, falling back to en-US`);
    stringsModule = await import(`../translations/${sku}/en-US/strings.json`);
  }

  return stringsModule.default;
}

const cache = createIntlCache();
let intl: any;

export async function getMessages(): Promise<any>
{
  const sku = process?.env?.REACT_APP_SKU ?? 'edu';
  const userLocale = getUserLocale();

  if (intl && (intl.locale === getUserLocale())) {
    return intl.messages;
  }

  console.log(`Loading ${userLocale} strings in ${sku}`);
  const messages = await loadTranslations(sku, userLocale);
  if (!messages)
  {
    console.error(`Unable to load ${userLocale} strings in ${sku}`);
    return {};
  }

  intl = createIntl(
    {
      locale: userLocale,
      messages: messages
    },
    cache
  );  
  return messages;
}

export const translate = (id: string, values?: {}) => {
  return intl.formatMessage({ id }, values);
};
