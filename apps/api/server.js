const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors');
const helmet = require('helmet');

// Настройка AWS SDK для локального использования
const region = process.env.AWS_REGION || 'eu-central-1';
const endpoint = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'fakeAccessKeyId';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || 'fakeSecretAccessKey';

AWS.config.update({
  region,
  endpoint,
  accessKeyId,
  secretAccessKey,
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

// Маршрут для проверки работоспособности сервера
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Маршрут для получения списка партнеров
app.get('/api/partners', async (req, res) => {
  const params = {
    TableName: 'partners',
  };

  console.log('Received request to get partners:', params);

  try {
    const data = await dynamodb.scan(params).promise();
    console.log('Successfully got partners:', data);
    res.json(data.Items);
  } catch (error) {
    console.error('Error getting partners:', error);
    res.status(500).json({ error: 'Error getting partners', details: error.message });
  }
});

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
