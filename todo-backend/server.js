// Загружаем переменные окружения
require('dotenv').config()

const express = require('express')         // Express — фреймворк для создания сервера
const mongoose = require('mongoose')       // Mongoose — для подключения к MongoDB
const cors = require('cors')               // CORS — чтоб фронтенд мог обращаться к нашему API

// Импортируем маршруты задач
const todoRoutes = require('./routes/todoRoutes') // ./routes — наша папка с API
const authRoutes = require('./routes/authRoutes')

// Создаем приложение
const app = express()
const port = process.env.PORT || 3000

// Middleware — обработчики между запросом и логикой
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  credentials: true
}))
app.use(express.json())            // Разрешаем читать JSON в теле запроса (req.body)

// Подключение к MongoDB
const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/todo-app'
mongoose.connect(mongoUrl)
.then(() => console.log('✅ Успешно подключено к MongoDB'))
.catch(err => console.error('❌ Ошибка подключения:', err))

// Простой тестовый маршрут (GET /)
app.get('/', (req, res) => {
  res.send('👋 Добро пожаловать в ToDo backend!')
})

// Роуты
app.use('/api', authRoutes)      // Роуты авторизации: /api/login, /api/register
app.use('/api/todos', todoRoutes) // CRUD задачи: /api/todos/*

// Запускаем сервер
app.listen(port, () => {
  console.log(`🚀 Сервер запущен: http://localhost:${port}`)
})
