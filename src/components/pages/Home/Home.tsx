import React from 'react';
import { Link } from 'react-router-dom';

import { useUi, withSearch } from '~/assets/translation';
import { ROUTES } from '~/constants';

import './home.scss';

const Home = () => {
  const { ui, searchParams } = useUi();

  return (
    <div className="home-page">
      <h1>Tareitas</h1>
      <p className="home-page__lead">{ui.home.lead}</p>
      <div className="home-page__links">
        <Link to={withSearch(ROUTES.HELP_CENTER, searchParams)}>
          {ui.nav.helpCenter}
        </Link>
        <Link to={withSearch(ROUTES.PRIVACY_POLICY, searchParams)}>
          {ui.nav.privacyPolicy}
        </Link>
      </div>
    </div>
  );
};

export default Home;
