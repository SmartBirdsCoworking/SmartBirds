import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppRoot, List } from '@xelene/tgui';
import { PartnersList } from './components/PartnersList';
import { DemoPage } from './Demo';
import { NewPage } from './components/PartnerInfo';

export const App = () => (
  <Router>
    <Routes>
      <Route path="/partner" element={<NewPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/" element={
        <AppRoot>
          <List>
            <PartnersList />
          </List>
        </AppRoot>
      } />
    </Routes>
  </Router>
);