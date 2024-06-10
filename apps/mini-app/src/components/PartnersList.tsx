import React, { useEffect, useState } from 'react';
import { Banner, Button, Image, Section } from '@xelene/tgui';
import { Link } from 'react-router-dom';
import AWS from 'aws-sdk';
import { config } from '../config';

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: config.region,
  endpoint: config.endpoint,
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey',
});

interface Partner {
  id: string;
  name: string;
  description: string;
  address: string;
}

export const PartnersList: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      const params = {
        TableName: 'partners',
      };

      try {
        const data = await dynamodb.scan(params).promise();
        setPartners(data.Items as Partner[]);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div>
      <h1>Partners List</h1>
      <ul>
        {partners.map((partner) => (
          <li key={partner.id}>
            <Link to={`/partner/${partner.id}`}>
              <h2>{partner.name}</h2>
              <p>{partner.description}</p>
              <p>{partner.address}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
