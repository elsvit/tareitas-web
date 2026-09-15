import type { LegalDocument } from '~/types';

import en from './en.json';

const documents = import.meta.glob<LegalDocument>('./*.json', {
  eager: true,
  import: 'default',
});

export const DEFAULT_PRIVACY_POLICY_LANG = 'en';

export const getPrivacyPolicy = (
  lang: string | null | undefined,
): LegalDocument => {
  const resolved = resolvePrivacyPolicyLang(lang);
  return documents[`./${resolved}.json`] ?? en;
};

export const resolvePrivacyPolicyLang = (
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
