/**
 * @fileOverview Root App component
 */

import React, { Suspense } from 'react';

import AppRouter from './AppRouter';

import './app.scss';

const App = () => (
  <Suspense fallback={null}>
    <div className="app">
      <AppRouter />
    </div>
  </Suspense>
);

export default App;
