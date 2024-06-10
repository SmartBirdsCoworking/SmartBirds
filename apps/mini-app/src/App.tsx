import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PartnersList } from './components/PartnersList';
import { PartnerInfo } from './components/PartnerInfo';
import { RegisterPartner } from './components/RegisterPartner';
import { EditPartner } from './components/EditPartner';
import { PartnerStats } from './components/PartnerStats';

export const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PartnersList />} />
      <Route path="/partner/:id" element={<PartnerInfo />} />
      <Route path="/partner/register" element={<RegisterPartner />} />
      <Route path="/partner/edit/:id" element={<EditPartner />} />
      <Route path="/partner/stats/:id" element={<PartnerStats />} />
    </Routes>
  </Router>
);
