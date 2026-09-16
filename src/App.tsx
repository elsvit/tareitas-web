/**
 * @fileOverview Root App component
 */

import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import { store } from '~/store';

import AppRouter from './AppRouter';

import './app.scss';

const App = () => (
  <Provider store={store}>
    <Suspense fallback={null}>
      <div className="app">
        <AppRouter />
      </div>
    </Suspense>
  </Provider>
);

export default App;
