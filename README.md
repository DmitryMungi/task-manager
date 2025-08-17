# 🚀 TODO App - Full Stack с Docker

Полнофункциональное TODO приложение с современным стеком технологий и полной контейнеризацией.

## 🏗️ Архитектура

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    MongoDB      │
│  Angular 19 +   │◄──►│   Node.js +     │◄──►│   Database +    │
│    Nginx        │    │   Express       │    │   Persistence   │
│   Port: 80      │    │   Port: 3000    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Технологический стек

### Frontend:
- **Angular 19** - Современный фреймворк
- **Angular Material** - UI компоненты
- **TypeScript** - Типизированный JavaScript
- **Nginx** - Web сервер для production
- **Signals** - Реактивное состояние

### Backend:
- **Node.js 18** - JavaScript runtime
- **Express.js** - Web фреймворк
- **MongoDB** - NoSQL база данных
- **JWT** - Аутентификация
- **bcryptjs** - Хеширование паролей

### DevOps:
- **Docker** - Контейнеризация
- **Docker Compose** - Оркестрация
- **Multi-stage builds** - Оптимизация образов
- **Health checks** - Мониторинг состояния

## 🚀 Быстрый старт

### Предварительные требования:
- Docker Desktop
- Git

### Запуск приложения:

```bash
# Клонирование репозитория
git clone <your-repo-url>
cd MY_TODO

# Настройка переменных окружения
cp .env.example .env
# Отредактируйте .env файл с вашими настройками

# Запуск всех сервисов
docker-compose up --build

# Или в фоновом режиме
docker-compose up -d --build
```

### Доступ к приложению:
- **Веб-приложение**: http://localhost
- **API**: http://localhost:3000
- **MongoDB**: localhost:27017

## 📁 Структура проекта

```
MY_TODO/
├── todo-backend/                 # Backend API
│   ├── Dockerfile               # Backend контейнер
│   ├── server.js                # Главный файл сервера
│   ├── models/                  # Mongoose модели
│   ├── routes/                  # API маршруты
│   ├── middleware/              # Middleware функции
│   └── .env.example            # Пример переменных окружения
├── todo-frontend/               # Frontend приложение
│   ├── Dockerfile              # Frontend контейнер (multi-stage)
│   ├── nginx.conf              # Nginx конфигурация
│   ├── src/                    # Исходный код Angular
│   └── src/environments/       # Environment конфигурации
├── docker-compose.yml          # Production setup
├── docker-compose.dev.yml      # Development setup
├── mongo-init.js              # Инициализация MongoDB
└── .env                       # Переменные окружения
```

## 🔧 Команды разработки

### Production режим:
```bash
# Запуск всех сервисов
docker-compose up --build

# Остановка
docker-compose down

# Просмотр логов
docker-compose logs -f
```

### Development режим:
```bash
# Backend + MongoDB в Docker, Frontend локально
docker-compose -f docker-compose.dev.yml up --build

# В другом терминале - запуск frontend
cd todo-frontend
npm install
npm start
```

### Управление контейнерами:
```bash
# Просмотр статуса
docker-compose ps

# Перестройка конкретного сервиса
docker-compose build backend
docker-compose build frontend

# Очистка
docker-compose down -v
docker system prune
```

## 🔒 Безопасность

### Переменные окружения (.env):
```bash
# JWT настройки
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# MongoDB настройки
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password123
MONGO_APP_USERNAME=todoapp
MONGO_APP_PASSWORD=todoapp123

# Общие настройки
NODE_ENV=production
```

### Особенности безопасности:
- ✅ JWT токены с refresh механизмом
- ✅ Хеширование паролей с bcrypt
- ✅ CORS настройки
- ✅ Запуск контейнеров от непривилегированного пользователя
- ✅ Переменные окружения исключены из Git

## 🎯 Функциональность

### Пользователи:
- ✅ Регистрация и авторизация
- ✅ JWT аутентификация
- ✅ Автоматическое обновление токенов

### Задачи (TODO):
- ✅ Создание задач
- ✅ Редактирование задач
- ✅ Отметка выполнения
- ✅ Удаление задач
- ✅ Персональные списки (каждый пользователь видит только свои задачи)

### UI/UX:
- ✅ Современный Material Design
- ✅ Адаптивный дизайн
- ✅ Интуитивный интерфейс
- ✅ Обработка ошибок

## 📊 Производительность

### Размеры образов:
- **Frontend**: ~15MB (Nginx + статика)
- **Backend**: ~150MB (Node.js + зависимости)
- **MongoDB**: ~400MB (база данных)

### Оптимизации:
- Multi-stage builds для минимизации размера
- Gzip сжатие статических файлов
- Кэширование зависимостей Docker
- Health checks для надежности

## 🔍 Мониторинг и отладка

### Логи:
```bash
# Все сервисы
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Health checks:
```bash
# Проверка состояния
docker-compose ps

# Детальная информация
docker inspect todo-backend --format='{{.State.Health.Status}}'
```

### Подключение к базе данных:
```bash
# MongoDB shell
docker exec -it todo-mongodb mongosh -u admin -p password123
```

## 🚀 Деплой в production

### 🌐 Облачный деплой (Бесплатно)

**📖 Полное руководство:** [COMPLETE-DEPLOYMENT-GUIDE.md](./COMPLETE-DEPLOYMENT-GUIDE.md)

**Быстрый старт облачного деплоя:**
1. **MongoDB Atlas** (15 мин) - [Руководство](./MONGODB-ATLAS-SETUP.md)
2. **Backend → Render** (20 мин) - [Руководство](./RENDER-DEPLOY-GUIDE.md)
3. **Frontend → Vercel** (15 мин) - [Руководство](./VERCEL-DEPLOY-GUIDE.md)
4. **Тестирование** (15 мин) - [Руководство](./CLOUD-TESTING-GUIDE.md)

**Результат:** Production-ready приложение на бесплатных сервисах за 60 минут!

### 🐳 Docker деплой (Локально/VPS)

**Подготовка:**
1. Измените секреты в `.env`
2. Настройте домен в `nginx.conf`
3. Добавьте SSL сертификаты
4. Настройте мониторинг

**Рекомендации:**
- Используйте внешнюю MongoDB (Atlas)
- Настройте автоматические бэкапы
- Добавьте мониторинг (Prometheus/Grafana)
- Настройте логирование (ELK Stack)

## 🎯 Следующие шаги

- [ ] CI/CD pipeline (GitLab CI/GitHub Actions)
- [ ] Kubernetes деплой
- [ ] Мониторинг и алерты
- [ ] Автоматические тесты
- [ ] SSL/TLS сертификаты
- [ ] CDN для статических файлов

## 📝 Лицензия

MIT License

## 🤝 Вклад в проект

1. Fork проекта
2. Создайте feature branch
3. Commit изменения
4. Push в branch
5. Создайте Pull Request

---

**Создано для изучения современных технологий веб-разработки и DevOps практик** 🚀
