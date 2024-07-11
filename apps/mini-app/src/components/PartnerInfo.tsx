// apps/mini-app/src/components/PartnerInfo.tsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Banner, Button, Image, Section } from '@xelene/tgui';

interface Partner {
  id: string;
  name: string;
  description: string;
  address: string;
  logoUrl: string;
  website: string;
  wifiPassword: string;
  workingHours: string;
  menu: string;
}

export const PartnerInfo: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [partner, setPartner] = useState<Partner | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPartner = async () => {
        try {
          const response = await fetch(`/api/partners/${id}`, {
            method: 'GET',
            headers: {},
          });
          const data = await response.json();
          setPartner(data as Partner);
        } catch (error) {
          console.error('Error fetching partner:', error);
        }
      };

      fetchPartner();
    }
  }, [id]);

  if (!partner) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Section header="Partner Information">
        <Banner
          before={<Image size={96} src={partner.logoUrl} />}
          header={partner.name}
          subheader={partner.description}
        >
          <p>Address: {partner.address}</p>
          <p>Website: <a href={partner.website} target="_blank" rel="noopener noreferrer">{partner.website}</a></p>
          <p>Wi-Fi Password: {partner.wifiPassword}</p>
          <p>Working Hours: {partner.workingHours}</p>
          <p>Menu: {partner.menu}</p>
          <Button
            size="s"
            Component="a"
            href={`/generate-qr?partner=${partner.id}`}
          >
            Generate QR Code
          </Button>
        </Banner>
      </Section>
    </>
  );
};
