import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '~/constants';

import './helpCenter.scss';

const HelpCenter = () => (
  <article className="help-center-page">
    <header className="help-center-page__header">
      <p className="help-center-page__eyebrow">Tareitas</p>
      <h1>Help Center</h1>
    </header>

    <p className="help-center-page__lead">
      Choose a topic to learn how to use Tareitas.
    </p>

    <ol className="help-center-page__topics">
      <li>
        <Link to={ROUTES.HELP_CENTER_LOGIN_SIGNUP}>
          Login / Signup description
        </Link>
      </li>
    </ol>
  </article>
);

export default HelpCenter;
