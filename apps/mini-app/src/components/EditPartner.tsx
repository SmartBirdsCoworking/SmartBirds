import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import { useNavigate, useParams } from 'react-router-dom';

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'eu-central-1',
  endpoint: process.env.REACT_APP_ENV === 'local' ? 'http://localhost:8000' : undefined,
});

export const EditPartner: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartner = async () => {
      const params = {
        TableName: 'partners',
        Key: { id },
      };

      try {
        const data = await dynamodb.get(params).promise();
        const partner = data.Item;
        if (partner) {
          setName(partner.name);
          setDescription(partner.description);
        } else {
          console.error('Partner not found');
        }
      } catch (error) {
        console.error('Error fetching partner:', error);
      }
    };

    fetchPartner();
  }, [id]);

  const handleEdit = async () => {
    const params = {
      TableName: 'partners',
      Key: { id },
      UpdateExpression: 'set #name = :name, #description = :description',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#description': 'description',
      },
      ExpressionAttributeValues: {
        ':name': name,
        ':description': description,
      },
    };

    try {
      await dynamodb.update(params).promise();
      navigate(`/partner/${id}`);
    } catch (error) {
      console.error('Error updating partner:', error);
    }
  };

  return (
    <div>
      <h1>Edit Partner</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
      />
      <button onClick={handleEdit}>Save</button>
    </div>
  );
};
