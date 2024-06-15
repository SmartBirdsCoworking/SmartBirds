# Используем базовый образ Node.js
FROM node:14

# Создаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Указываем порт, который будет использовать приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "dev"]
