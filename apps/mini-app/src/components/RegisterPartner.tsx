import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterPartner: React.FC = () => {
  const [partnerId, setPartnerId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log('Register button clicked');
    console.log('Partner ID:', partnerId);
    console.log('Name:', name);
    console.log('Description:', description);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ partnerId, name, description }),
      });
      if (response.ok) {
        console.log('Partner registered successfully');
        navigate('/');
      } else {
        console.error('Error registering partner:', await response.json());
      }
    } catch (error) {
      console.error('Error registering partner:', error);
    }
  };

  return (
    <div>
      <h1>Register Partner</h1>
      <input
        type="text"
        placeholder="Partner ID"
        value={partnerId}
        onChange={(e) => setPartnerId(e.target.value)}
      />
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};
