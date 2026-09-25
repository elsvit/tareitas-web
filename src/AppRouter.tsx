/**
 * @fileOverview Routers
 */

import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { SiteLayout } from '~/components/blocks';
import {
  DeleteAccountPage,
  HelpCenterPage,
  HomePage,
  PrivacyPolicyPage,
} from '~/components/pages';
import { ROUTES } from '~/constants';

const AppRouter = () => (
  <BrowserRouter>
    <SiteLayout>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route
          path={ROUTES.PRIVACY_POLICY}
          element={<PrivacyPolicyPage />}
        />
        <Route
          path={ROUTES.DELETE_ACCOUNT}
          element={<DeleteAccountPage />}
        />
        <Route path={ROUTES.HELP_CENTER} element={<HelpCenterPage />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </SiteLayout>
  </BrowserRouter>
);

export default AppRouter;
