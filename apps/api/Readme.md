### SmartBirds
Файл package.json для бэкенда должен содержать зависимости для Express.js, AWS SDK и других необходимых библиотек. Также он должен включать скрипты для запуска и разработки сервера.


```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "Backend service for SmartBirds",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "aws-sdk": "^2.1000.0",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  },
  "author": "Your Name",
  "license": "MIT"
}
```

#### Объяснение зависимостей:
* aws-sdk: Библиотека для взаимодействия с AWS сервисами, включая DynamoDB.
* body-parser: Миддлвэр для обработки JSON-запросов.
* cors: Миддлвэр для настройки Cross-Origin Resource Sharing.
* express: Веб-фреймворк для Node.js.
* nodemon: Утилита для автоматического перезапуска сервера при изменении файлов (для разработки).

#### Установка зависимостей

После создания файла package.json в директории backend, установите зависимости:

```bash
cd backend
npm install
```

#### Запуск сервера
Запустите сервер в режиме разработки, используя nodemon:

```bash
npm run dev
```

Для запуска сервера в режиме продакшн, используйте:

```bash
npm start
```

### Test
```bash
curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d '{"partnerId": "test", "name": "Test Partner", "description": "Test Description"}'
```

### ECR

```bash
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 211125718438.dkr.ecr.eu-central-1.amazonaws.com
docker build --platform linux/amd64 -t smartbirds-api-dev .
docker tag smartbirds-api-dev:latest 211125718438.dkr.ecr.eu-central-1.amazonaws.com/smartbirds-api-dev:latest
docker push 211125718438.dkr.ecr.eu-central-1.amazonaws.com/smartbirds-api-dev:latest
```
