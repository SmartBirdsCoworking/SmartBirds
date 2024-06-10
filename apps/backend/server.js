const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors');
const helmet = require('helmet');

// Настройка AWS SDK для локального использования
AWS.config.update({
  region: 'eu-central-1',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Настройка CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Маршрут для регистрации партнера
app.post('/api/register', async (req, res) => {
  const { partnerId, name, description } = req.body;
  const params = {
    TableName: 'partners',
    Item: {
      id: partnerId,
      name,
      description,
    },
  };

  console.log('Received request to register partner:', params);

  try {
    const data = await dynamodb.put(params).promise();
    console.log('Successfully registered partner:', data);
    res.status(201).json({ message: 'Partner registered successfully' });
  } catch (error) {
    console.error('Error registering partner:', error);
    res.status(500).json({ error: 'Error registering partner', details: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
