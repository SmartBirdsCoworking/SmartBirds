'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode.react';
import { Section, List, Card } from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';

async function fetchPartnerDetails(partnerId) {
  // const response = await fetch(`/api/partners/${partnerId}`); // Замените на ваш реальный API-эндпоинт
  // if (!response.ok) {
  //   throw new Error('Failed to fetch partner details');
  // }
  // return await response.json();

  const partnerDetails = {
    "id": "1",
    "title": "Smart Birds Coworking",
    "subtitle": "The Coworking in Kusadasi",
    "description": "In our coworking space there is everything for effective work: a high-speed internet, comfy office furniture, and nice atmosphere",
    // "logo_src": "https://static.tildacdn.one/tild6361-3139-4330-b064-393537376230/SB-Brandmark-Black_2.png",
    "logo_src": "https://steemitimages.com/1280x0/https://steemitimages.com/DQmQCN7XP4wVAtEELRzWCYXYYxPZhfjcrNQ2z3UAJMq8Vsc/kusadas%C4%B1-05.png",
    "discount": "10%",
    "address": "123 Main St, Kusadasi",
    "working_hours": "Mon-Fri: 9am - 7pm",
    "wifi_info": "SSID: SmartBirds, Password: smart1234"
  };
  return partnerDetails;
}

export default function PartnerDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const [partner, setPartner] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPartnerDetails(id).then(data => setPartner(data)).catch(error => console.error(error));
    }
  }, [id]);

  if (!partner) {
    return <div>Loading...</div>;
  }

  const handleGenerateQRCode = () => {
    setShowQRCode(true);
  };

  return (
    <div style={styles.appContainer}>
      <List>
        <Section
          header={partner.title}
          footer={partner.subtitle}
        >
          <Card style={styles.card}>
            <img
              alt={partner.title}
              src={partner.logo_src}
              style={styles.image}
            />
            <div style={styles.content}>
              <p>{partner.description}</p>
              <p><strong>Address:</strong> {partner.address}</p>
              {partner.website && partner.website !== '' && (
                <p>Website: <a href={partner.website} target="_blank" rel="noopener noreferrer">{partner.website}</a></p>
              )}
              <p><strong>Working Hours:</strong> {partner.working_hours}</p>
              <p><strong>Wi-Fi Info:</strong> {partner.wifi_info}</p>
              {partner.discount && partner.discount !== '0' && (
                <CardChip readOnly style={styles.cardChip}>
                  Discount: {partner.discount}
                </CardChip>
              )}
              <button style={styles.button} onClick={handleGenerateQRCode}>
                Generate QR Code
              </button>
              {showQRCode && (
                <div style={styles.qrCodeContainer}>
                  <QRCode value={`https://example.com/partners/${id}`} />
                </div>
              )}
            </div>
          </Card>
        </Section>
      </List>
    </div>
  );
}

const styles = {
  appContainer: {
    maxWidth: '414px',
    margin: '0 auto',
    padding: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  image: {
    width: '100%',
    objectFit: 'cover',
  },
  content: {
    marginTop: '20px',
    textAlign: 'left',
  },
  cardChip: {
    marginTop: '10px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  qrCodeContainer: {
    marginTop: '20px',
  },
};
