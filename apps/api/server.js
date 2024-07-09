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
const miniappAddr = process.env.MINIAPP_ADDR || 'localhost:3001';

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
app.get('/partners', async (req, res) => {
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
app.post('/register', async (req, res) => {
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


//const qrcode = require('qrcode');

// Маршрут для генерации QR-кода
app.post('/api/generate-qr', async (req, res) => {
  const { userId, partnerId } = req.body;
  const qrData = `https://${miniappAddr}/validate?user_id=${userId}&partner_id=${partnerId}`;

  try {
    const qrCode = await qrcode.toDataURL(qrData);
    res.json({ qrCode });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Error generating QR code', details: error.message });
  }
});

// Маршрут для валидации QR-кодов
app.get('/api/validate', async (req, res) => {
  const { user_id, partner_id } = req.query;

  const user = await dynamodb.get({ TableName: 'users', Key: { id: user_id } }).promise();
  const partner = await dynamodb.get({ TableName: 'partners', Key: { id: partner_id } }).promise();

  if (user.Item && partner.Item) {
    const transaction = {
      TableName: 'transactions',
      Item: {
        id: `${user_id}-${partner_id}-${Date.now()}`,
        userId: user_id,
        partnerId: partner_id,
        date: new Date().toISOString(),
      },
    };

    try {
      await dynamodb.put(transaction).promise();
      res.json({ status: 'success', message: 'QR code validated and transaction recorded.' });
    } catch (error) {
      console.error('Error recording transaction:', error);
      res.status(500).json({ error: 'Error recording transaction', details: error.message });
    }
  } else {
    res.status(400).json({ status: 'error', message: 'Invalid QR code.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
