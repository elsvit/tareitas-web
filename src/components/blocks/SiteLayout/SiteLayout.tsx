import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '~/constants';

import './siteLayout.scss';

type Props = {
  children: React.ReactNode;
};

export const SiteLayout = ({ children }: Props) => (
  <div className="site-layout">
    <header className="site-layout__header">
      <div className="site-layout__inner">
        <Link to={ROUTES.HOME} className="site-layout__brand">
          Tareitas
        </Link>
        <nav className="site-layout__nav">
          <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
        </nav>
      </div>
    </header>

    <main className="site-layout__main">
      <div className="site-layout__inner">{children}</div>
    </main>

    <footer className="site-layout__footer">
      <div className="site-layout__inner">
        <span>© {new Date().getFullYear()} Tareitas</span>
        <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
      </div>
    </footer>
  </div>
);

export default SiteLayout;
