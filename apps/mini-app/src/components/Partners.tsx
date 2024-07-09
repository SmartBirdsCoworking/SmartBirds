import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Banner, Button, Image, Section } from '@xelene/tgui';

interface Partner {
  id: string;
  name: string;
  description: string;
  address: string;
  logoUrl: string;
}

const PARTNER_LINK = './partner';
const HOME_LINK = './';

export const PartnersList: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/partners', {
          method: 'GET',
          headers: {},
        });
        const data = await response.json();
        setPartners(data as Partner[]);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchPartners();
  }, []);

  return (
    <>
      {partners.length === 0 ? (
        <p>No partners found.</p>
      ) : (
        <Section header="Services">
          {partners.map((partner) => (
            <Banner
              key={partner.id}
              before={<Image size={96} src={partner.logoUrl} />}
              header={partner.name}
              subheader={partner.description}
            >
              <Button
                size="s"
                Component="a"
                href={`${PARTNER_LINK}?partner=${partner.id}`}
              >
                Info
              </Button>
              <Button
                size="s"
                Component="a"
                href={`${HOME_LINK}?partner=${partner.id}`}
              >
                QR Code
              </Button>
            </Banner>
          ))}
        </Section>
      )}
    </>
  );
};
