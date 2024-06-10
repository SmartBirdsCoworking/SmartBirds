import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import { useParams } from 'react-router-dom';

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'eu-central-1',
  endpoint: process.env.REACT_APP_ENV === 'local' ? 'http://localhost:8000' : undefined,
});

export const PartnerStats: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [visits, setVisits] = useState<any[]>([]);

  useEffect(() => {
    const fetchVisits = async () => {
      const params = {
        TableName: 'visits',
        KeyConditionExpression: 'partner_id = :partner_id',
        ExpressionAttributeValues: {
          ':partner_id': id,
        },
      };

      try {
        const data = await dynamodb.query(params).promise();
        setVisits(data.Items || []);
      } catch (error) {
        console.error('Error fetching visits:', error);
      }
    };

    fetchVisits();
  }, [id]);

  return (
    <div>
      <h1>Partner Statistics</h1>
      <ul>
        {visits.map((visit) => (
          <li key={visit.id}>
            {visit.date} - {visit.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};
