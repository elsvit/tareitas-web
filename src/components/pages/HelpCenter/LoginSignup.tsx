import React from 'react';
import { Link } from 'react-router-dom';

import { useUi, withSearch } from '~/assets/translation';
import { ROUTES } from '~/constants';

import { getLoginSignupImages } from './loginSignupImages';

import './helpCenter.scss';

const LoginSignup = () => {
  const { lang, ui, searchParams } = useUi();
  const images = getLoginSignupImages(lang);
  const copy = ui.loginSignup;

  return (
    <article className="help-center-page">
      <header className="help-center-page__header">
        <p className="help-center-page__eyebrow">
          <Link to={withSearch(ROUTES.HELP_CENTER, searchParams)}>
            {ui.nav.helpCenter}
          </Link>
        </p>
        <h1>{copy.title}</h1>
      </header>

      <img
        className="help-center-page__image"
        src={images.initial}
        alt={copy.initialAlt}
      />

      <p>{copy.threeOptions}</p>

      <section className="help-center-page__option" id="create-group">
        <h2>{copy.createTitle}</h2>
        <p>{copy.createP1}</p>
        <p>{copy.createP2}</p>
        <p>{copy.createP3}</p>
        <img
          className="help-center-page__image"
          src={images.signup}
          alt={copy.createAlt}
        />
      </section>

      <section className="help-center-page__option" id="join-group">
        <h2>{copy.joinTitle}</h2>
        <p>{copy.joinP1}</p>
        <p>{copy.joinP2}</p>
        <img
          className="help-center-page__image"
          src={images.signinMultidevices}
          alt={copy.joinAlt}
        />
      </section>

      <section className="help-center-page__option" id="this-device">
        <h2>{copy.deviceTitle}</h2>
        <p>{copy.deviceP1}</p>
        <p>{copy.deviceP2}</p>
        <img
          className="help-center-page__image"
          src={images.signinOnlyDevice}
          alt={copy.deviceAlt}
        />
      </section>

      <section className="help-center-page__contact">
        <p>{copy.contact}</p>
        <p>
          <a href="mailto:tarecitas@gmail.com">tarecitas@gmail.com</a>
        </p>
      </section>
    </article>
  );
};

export default LoginSignup;
