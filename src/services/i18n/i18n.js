/** @format */

export const fallback = 'en';

export const supportedLocales = {
  en: {
    name: 'English',
    translationFileLoader: () => require('./lang/en.json'),
    momentLocaleLoader: () => Promise.resolve(),
  },
  es: {
    name: 'Español',
    translationFileLoader: () => require('./lang/es.json'),
    momentLocaleLoader: () => import('moment/locale/es'),
  },
};

export const defaultNamespace = 'common';

export const namespaces = [
  'common',
  'welcome',
  'groups',
  'events',
  'categories',
  'profile',
  'products',
  'explore',
  'sports',
  'settings',
  'auth',
  'errors',
  'loaders',
];
