import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '~/constants';

import './home.scss';

const Home = () => (
  <div className="home-page">
    <h1>Tareitas</h1>
    <p className="home-page__lead">
      A family app to manage daily tasks, routines, stars, and rewards.
    </p>
    <div className="home-page__links">
      <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
    </div>
  </div>
);

export default Home;
