import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AWS from 'aws-sdk';
import { config } from '../config';

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: config.region,
  endpoint: config.endpoint,
});

interface Partner {
  id: string;
  name: string;
  description: string;
  address: string;
}

export const PartnerInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [partner, setPartner] = useState<Partner | null>(null);

  useEffect(() => {
    const fetchPartner = async () => {
      const params = {
        TableName: 'partners',
        Key: { id },
      };

      try {
        const data = await dynamodb.get(params).promise();
        setPartner(data.Item as Partner);
      } catch (error) {
        console.error('Error fetching partner:', error);
      }
    };

    fetchPartner();
  }, [id]);

  if (!partner) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{partner.name}</h1>
      <p>{partner.description}</p>
      <p>{partner.address}</p>
    </div>
  );
};
