// apps/mini-app/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PartnersList } from './components/PartnersList';
import { PartnerInfo } from './components/PartnerInfo';
import { RegisterPartner } from './components/RegisterPartner';
import { EditPartner } from './components/EditPartner';
import { PartnerStats } from './components/PartnerStats';
import { GenerateQRCode } from './components/GenerateQRCode';


export const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PartnersList />} />
      <Route path="/partner/:id" element={<PartnerInfo />} />
      <Route path="/partner/register" element={<RegisterPartner />} />
      <Route path="/partner/edit/:id" element={<EditPartner />} />
      <Route path="/partner/stats/:id" element={<PartnerStats />} />
      <Route path="/partner/qrcode" element={<GenerateQRCode userId={userId} partnerId={partnerId}/>} />
    </Routes>
  </Router>
);
