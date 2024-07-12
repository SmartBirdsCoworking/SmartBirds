'use client';

import React, { useEffect, useState } from 'react';
import { Section, List, Card } from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';

async function fetchPartners() {
  // const response = await fetch('/api/partners'); // Замените на ваш реальный API-эндпоинт
  // if (!response.ok) {
  //   throw new Error('Failed to fetch partners');
  // }
  // return await response.json();

  const datajson = [
    {
      "title": "Smart Birds Coworking",
      "subtitle": "The Coworking in Kusadasi",
      "description": "Description 1",
      "logo_src": "https://static.tildacdn.one/tild6361-3139-4330-b064-393537376230/SB-Brandmark-Black_2.png",
      "discount": "10%"
    },
    {
      "title": "Partner 2",
      "subtitle": "Subtitle 2",
      "description": "Description 2",
      "logo_src": "https://steemitimages.com/1280x0/https://steemitimages.com/DQmQCN7XP4wVAtEELRzWCYXYYxPZhfjcrNQ2z3UAJMq8Vsc/kusadas%C4%B1-05.png",
      "discount": "₺150"
    },
    {
      "title": "Izolcar",
      "subtitle": "The Car rental in Kusadasi",
      "description": "Description 1",
      "logo_src": "https://img1.wsimg.com/isteam/ip/7222a9f6-7043-4e5d-b301-bcebdeb42ceb/0001.jpg/:/rs=w:353,h:250,cg:true,m/cr=w:353,h:250/qt=q:95",
      "discount": ""
    },
    {
      "title": "Boat hire",
      "subtitle": "Yacht rental Kusadasi",
      "description": "Description 2",
      "logo_src": "https://images.viravira.co/uploads/boats/12313/28c3eb4e-18ea-4aa2-8096-552bb02c15ffx720.jpg",
      "discount": "₺150"
    },
    
    // ... more partners
  ]
  return datajson
}

export default function Home() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchPartners().then(data => setPartners(data)).catch(error => console.error(error));
  }, []);
  

  return (
    <div style={styles.appContainer}>
      <List>
        <Section
          header='Partners'
          footer='Please open any service to get detailed information and discounts'
          >
          <div style={styles.cardContainer}>
            {partners.map(partner => (
              <Card style={styles.card} key={partner.title}>
                {partner.discount && partner.discount !== '0' && (
                  <CardChip readOnly style={styles.CardChip}>
                    {partner.discount}
                  </CardChip>
                )}
                <img
                  alt={partner.title}
                  src={partner.logo_src}
                  style={styles.image}
                />
                <div style={styles.spacer}></div>
                <CardCell
                  readOnly
                  subtitle={partner.subtitle}
                >
                  {partner.title}
                </CardCell>
              </Card>
            ))}
          </div>
        </Section>
      </List>
    </div>
  );
}

const styles = {
  appContainer: {
    maxWidth: '414px', // Maximum width for the mini-app
    margin: '0 auto', // Center the app horizontally
    padding: '10px', // Add some padding for better appearance 
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '0 8px'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: '0 0 calc(50% - 5px)', // Adjust the width of the cards and the margin between them
    marginBottom: '10px', // Adjust the space between rows
    height: '300',
  },
  image: {
    display: 'block',
    objectFit: 'cover',
    width: '100%', // Ensure the image takes up the full width of the card
  },
  spacer: {
    flex: '1 1 auto', // Take up remaining space
  },
  CardChip: {
    margin: '0 auto', // Center the app horizontally
    opacity: '70%',
    right: '8px',
    top: '8px'
  }
};
