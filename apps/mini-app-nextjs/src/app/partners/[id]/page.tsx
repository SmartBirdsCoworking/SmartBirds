'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode.react';
import { Section, List, Cell, Text, Modal, Banner, Button } from '@telegram-apps/telegram-ui';
import { Icon32ProfileColoredSquare } from '@telegram-apps/telegram-ui/dist/cjs/icons/32/profile_colored_square';
import { Icon24QR } from '@telegram-apps/telegram-ui/dist/cjs/icons/24/qr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faWifi, faGlobe, faCopy } from '@fortawesome/free-solid-svg-icons';

async function fetchPartnerDetails(partnerId) {
  const partnerDetails = {
    id: "1",
    title: "Smart Birds Coworking",
    subtitle: "The Coworking in Kusadasi",
    description: "In our coworking space there is everything for effective work: a high-speed internet, comfy office furniture, and nice atmosphere",
    logo_src: "https://static.tildacdn.one/tild6361-3139-4330-b064-393537376230/SB-Brandmark-Black_2.png",
    address: "Smart Birds Coworking, Türkmen, ASO PARK RESIDANCE, Ant Sk. No: 28 D:2A, 09400 Kuşadası/Aydın, Türkiye",
    working_hours: "Mon-Fri: 9am - 7pm",
    wifi_info: "Name: SmartBirds, Password: smart1234",
  };
  return partnerDetails;
}

export default function PartnerDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [partner, setPartner] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    if (id) {
      fetchPartnerDetails(id).then(setPartner).catch(console.error);
    }
  }, [id]);

  if (!partner) {
    return <div>Loading...</div>;
  }

  const handleGenerateQRCode = () => {
    setShowQRCode(true);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(partner.address);
      setCopySuccess('Address copied!');
      setTimeout(() => setCopySuccess(''), 2000); // Уведомление исчезает через 2 секунды
    } catch (err) {
      setCopySuccess('Failed to copy');
    }
  };

  return (
    <div style={styles.appContainer}>
      <Button
        mode="plain"
        size="s"
        onClick={() => router.back()}
        style={styles.backButton}
      >
        ⟵
      </Button>

      <List>
        <Section header={partner.title}>
          <Cell>
            <img alt={partner.title} src={partner.logo_src} style={styles.image} />
          </Cell>
        </Section>
        <Section>
          <Modal
            trigger={
              <Button
                style={styles.button}
                onClick={handleGenerateQRCode}
                mode="filled"
                size="l"
                stretched
                before={<Icon24QR />}
              >
                Get Discount
              </Button>
            }
          >
            {showQRCode && (
              <div style={styles.qrCodeContainer}>
                <QRCode
                  value={`https://example.com/partners/${id}`}
                  size={256}
                  style={{ display: 'block', margin: '0 auto' }}
                />
                <Text style={{ textAlign: 'center', margin: '20px' }}>
                  Show this QR code to the cashier to get a discount
                </Text>
              </div>
            )}
          </Modal>
        </Section>

        <Section>
          <Cell before={<Icon32ProfileColoredSquare />} multiline>
            {partner.description}
          </Cell>

          <Banner
            before={<FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />}
            header="Address"
            subheader={
              <div style={styles.addressContainer}>
                <span style={{ cursor: 'pointer' }}>{partner.address}</span>
                <FontAwesomeIcon
                  icon={faCopy}
                  size="1x"
                  style={styles.copyIcon}
                  onClick={handleCopyAddress}
                />
                {copySuccess && <Text style={styles.copySuccess}>{copySuccess}</Text>}
              </div>
            }
            style={styles.banner}
          >
            <Button
              mode="secondary"
              size="s"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partner.address)}`, '_blank')}
            >
              Open in Maps
            </Button>
          </Banner>

          <Banner
            before={<FontAwesomeIcon icon={faClock} size="2x" />}
            header="Working Hours"
            subheader={partner.working_hours}
            style={styles.banner}
          />

          <Banner
            before={<FontAwesomeIcon icon={faWifi} size="2x" />}
            header="Wi-Fi Info"
            subheader={partner.wifi_info}
            style={styles.banner}
          />

          {partner.website && (
            <Banner
              before={<FontAwesomeIcon icon={faGlobe} size="2x" />}
              header="Website"
              subheader={partner.website}
              style={styles.banner}
            />
          )}
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
  backButton: {
    marginBottom: '20px',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    objectFit: 'cover',
  },
  button: {
    fontSize: '16px',
    cursor: 'pointer',
  },
  qrCodeContainer: {
    marginTop: '20px',
  },
  banner: {
    padding: '20px 28px',
  },
  addressContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  copyIcon: {
    marginLeft: '10px',
    cursor: 'pointer',
  },
  copySuccess: {
    marginLeft: '10px',
    color: 'green',
  },
};
