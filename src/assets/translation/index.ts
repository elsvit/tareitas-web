import { useSearchParams } from 'react-router-dom';

import type { LegalDocument } from '~/types';

import en from './en.json';
import enUi from './ui/en.json';

export type UiStrings = typeof enUi;

const documents = import.meta.glob<LegalDocument>('./*.json', {
  eager: true,
  import: 'default',
});

const uiDocuments = import.meta.glob<UiStrings>('./ui/*.json', {
  eager: true,
  import: 'default',
});

export const DEFAULT_PRIVACY_POLICY_LANG = 'en';

export const resolveLang = (
  lang: string | null | undefined,
): string => {
  if (!lang) {
    return DEFAULT_PRIVACY_POLICY_LANG;
  }

  const normalized = lang.trim().toLowerCase().split(/[-_]/)[0];

  if (!normalized || !documents[`./${normalized}.json`]) {
    return DEFAULT_PRIVACY_POLICY_LANG;
  }

  return normalized;
};

export const resolvePrivacyPolicyLang = resolveLang;

export const getPrivacyPolicy = (
  lang: string | null | undefined,
): LegalDocument => {
  const resolved = resolveLang(lang);
  return documents[`./${resolved}.json`] ?? en;
};

export const getUiStrings = (
  lang: string | null | undefined,
): UiStrings => {
  const resolved = resolveLang(lang);
  return uiDocuments[`./ui/${resolved}.json`] ?? enUi;
};

export const interpolate = (
  template: string,
  values: Record<string, string>,
) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');

export const withSearch = (path: string, searchParams: URLSearchParams) => {
  const search = searchParams.toString();
  return search ? `${path}?${search}` : path;
};

export { AvailableLanguages, type AvailableLanguage } from './languages';

export const useUi = () => {
  const [searchParams] = useSearchParams();
  const lang = resolveLang(searchParams.get('lang'));

  return {
    lang,
    ui: getUiStrings(lang),
    searchParams,
  };
};
