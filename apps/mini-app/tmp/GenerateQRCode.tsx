// src/components/GenerateQRCode.js
import React, { useState } from 'react';
import axios from 'axios';

const GenerateQRCode = ({ userId, partnerId }) => {
  const [qrCode, setQrCode] = useState('');

  const generateQRCode = async () => {
    try {
      const response = await axios.post('/api/generate-qr', { userId, partnerId });
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div>
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCode && <img src={qrCode} alt="QR Code" />}
    </div>
  );
};

export default GenerateQRCode;
