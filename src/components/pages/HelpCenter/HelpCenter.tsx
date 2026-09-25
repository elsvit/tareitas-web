import React from 'react';
import { Link } from 'react-router-dom';

import { useUi, withSearch } from '~/assets/translation';
import { ROUTES } from '~/constants';

import './helpCenter.scss';

const HelpCenter = () => {
  const { ui, searchParams } = useUi();

  return (
    <article className="help-center-page">
      <header className="help-center-page__header">
        <h1>{ui.helpCenter.title}</h1>
      </header>

      <p className="help-center-page__lead">{ui.helpCenter.lead}</p>

      <ol className="help-center-page__topics">
        <li>
          <Link
            to={withSearch(ROUTES.HELP_CENTER_LOGIN_SIGNUP, searchParams)}
          >
            {ui.helpCenter.loginSignup}
          </Link>
        </li>
      </ol>
    </article>
  );
};

export default HelpCenter;
