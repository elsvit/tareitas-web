import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useUi, withSearch } from '~/assets/translation';
import { ROUTES } from '~/constants';

const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
    />
  </svg>
);

const HeaderNav = () => {
  const { ui, searchParams } = useUi();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  const links = [
    { to: withSearch(ROUTES.HELP_CENTER, searchParams), label: ui.nav.helpCenter },
    {
      to: withSearch(ROUTES.PRIVACY_POLICY, searchParams),
      label: ui.nav.privacyPolicy,
    },
    {
      to: withSearch(ROUTES.DELETE_ACCOUNT, searchParams),
      label: ui.nav.deleteAccount,
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <nav className="site-layout__nav">
      <div className="site-layout__nav-links">
        {links.map(link => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="site-layout__nav-menu">
        <button
          type="button"
          className="site-layout__menu-button"
          aria-label={ui.nav.menu}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(open => !open)}
        >
          <MenuIcon />
        </button>

        {isOpen ? (
          <>
            <button
              type="button"
              className="site-layout__menu-backdrop"
              aria-label={ui.language.close}
              onClick={() => setIsOpen(false)}
            />
            <ul className="site-layout__menu-popup" role="menu">
              {links.map(link => (
                <li key={link.to} role="none">
                  <Link
                    role="menuitem"
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default HeaderNav;
