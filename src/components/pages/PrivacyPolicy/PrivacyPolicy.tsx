import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LegalDocumentView } from '~/components/blocks';
import {
  getPrivacyPolicy,
  resolvePrivacyPolicyLang,
} from '~/assets/translation';

import './privacyPolicy.scss';

const PrivacyPolicy = () => {
  const [searchParams] = useSearchParams();
  const lang = resolvePrivacyPolicyLang(searchParams.get('lang'));
  const legalDocument = getPrivacyPolicy(lang);

  useEffect(() => {
    const previousLang = window.document.documentElement.lang;
    window.document.documentElement.lang = lang;

    return () => {
      window.document.documentElement.lang = previousLang || 'en';
    };
  }, [lang]);

  return (
    <div className="privacy-policy-page">
      <LegalDocumentView document={legalDocument} />
    </div>
  );
};

export default PrivacyPolicy;
