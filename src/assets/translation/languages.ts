export type AvailableLanguage = {
  code: string;
  name: string;
};

const LANGUAGE_DEFINITIONS: AvailableLanguage[] = [
  { code: 'cs', name: 'Čeština' },
  { code: 'da', name: 'Dansk' },
  { code: 'de', name: 'Deutsch' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'el', name: 'Ελληνικά' },
  { code: 'et', name: 'Eesti' },
  { code: 'fr', name: 'Français' },
  { code: 'hr', name: 'Hrvatski' },
  { code: 'it', name: 'Italiano' },
  { code: 'lt', name: 'Lietuvių' },
  { code: 'lv', name: 'Latviešu' },
  { code: 'hu', name: 'Magyar' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'pl', name: 'Polski' },
  { code: 'pt', name: 'Português' },
  { code: 'ro', name: 'Română' },
  { code: 'sk', name: 'Slovenčina' },
  { code: 'sl', name: 'Slovenščina' },
  { code: 'fi', name: 'Suomi' },
  { code: 'sv', name: 'Svenska' },
  { code: 'bg', name: 'Български' },
  { code: 'uk', name: 'Українська' },
];

export const AvailableLanguages: AvailableLanguage[] = [
  ...LANGUAGE_DEFINITIONS,
].sort((left, right) => left.name.localeCompare(right.name));
