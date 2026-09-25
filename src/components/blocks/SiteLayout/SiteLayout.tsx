import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useUi, withSearch } from '~/assets/translation';
import { LanguagePicker } from '~/components/blocks/LanguagePicker';
import { ROUTES } from '~/constants';

import HeaderNav from './HeaderNav';
import './siteLayout.scss';

type Props = {
  children: React.ReactNode;
};

export const SiteLayout = ({ children }: Props) => {
  const { lang, ui, searchParams } = useUi();

  useEffect(() => {
    const previousLang = window.document.documentElement.lang;
    window.document.documentElement.lang = lang;

    return () => {
      window.document.documentElement.lang = previousLang || 'en';
    };
  }, [lang]);

  return (
    <div className="site-layout">
      <header className="site-layout__header">
        <div className="site-layout__inner">
          <Link
            to={withSearch(ROUTES.HOME, searchParams)}
            className="site-layout__brand"
          >
            Tareitas
          </Link>
          <HeaderNav />
          <LanguagePicker />
        </div>
      </header>

      <main className="site-layout__main">
        <div className="site-layout__inner">{children}</div>
      </main>

      <footer className="site-layout__footer">
        <div className="site-layout__inner">
          <span>© {new Date().getFullYear()} Tareitas</span>
          <div className="site-layout__footer-links">
            <Link to={withSearch(ROUTES.HELP_CENTER, searchParams)}>
              {ui.nav.helpCenter}
            </Link>
            <Link to={withSearch(ROUTES.PRIVACY_POLICY, searchParams)}>
              {ui.nav.privacyPolicy}
            </Link>
            <Link to={withSearch(ROUTES.DELETE_ACCOUNT, searchParams)}>
              {ui.nav.deleteAccount}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
