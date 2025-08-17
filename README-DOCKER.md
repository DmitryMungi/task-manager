# TODO App - Docker Setup

Полная контейнеризация TODO приложения с Docker и docker-compose.

## 🐳 Архитектура

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    MongoDB      │
│  (Angular +     │◄──►│   (Node.js +    │◄──►│   (Database)    │
│    Nginx)       │    │   Express)      │    │                 │
│   Port: 80      │    │   Port: 3000    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Структура файлов

```
MY_TODO/
├── todo-backend/
│   ├── Dockerfile              # Backend контейнер
│   ├── .dockerignore
│   └── ... (код backend)
├── todo-frontend/
│   ├── Dockerfile              # Frontend контейнер (multi-stage)
│   ├── nginx.conf              # Nginx конфигурация
│   ├── .dockerignore
│   └── ... (код frontend)
├── docker-compose.yml          # Production setup
├── docker-compose.dev.yml      # Development setup
├── mongo-init.js               # Инициализация MongoDB
├── .env                        # Переменные окружения
└── .dockerignore
```

## 🚀 Быстрый старт

### Production режим:
```bash
# Сборка и запуск всех сервисов
docker-compose up --build

# В фоновом режиме
docker-compose up -d --build

# Остановка
docker-compose down
```

### Development режим:
```bash
# Запуск только backend + MongoDB (frontend запускается отдельно)
docker-compose -f docker-compose.dev.yml up --build

# Frontend запускается обычным способом:
cd todo-frontend && npm start
```

## 🌐 Доступ к приложению

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000
- **MongoDB**: localhost:27017

## 🔧 Команды Docker

### Основные команды:
```bash
# Просмотр запущенных контейнеров
docker ps

# Логи всех сервисов
docker-compose logs

# Логи конкретного сервиса
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Перестройка конкретного сервиса
docker-compose build backend
docker-compose build frontend

# Вход в контейнер
docker exec -it todo-backend sh
docker exec -it todo-mongodb mongosh
```

### Управление данными:
```bash
# Удаление всех контейнеров и volumes
docker-compose down -v

# Очистка неиспользуемых образов
docker system prune

# Просмотр volumes
docker volume ls
```

## 🔒 Переменные окружения

Настройте файл `.env` перед запуском:

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

## 🏗️ Особенности реализации

### Backend (Node.js):
- **Образ**: `node:18-alpine` (легкий)
- **Безопасность**: Запуск от непривилегированного пользователя
- **Health Check**: Проверка доступности API
- **Переменные окружения**: Полная конфигурация через env

### Frontend (Angular + Nginx):
- **Multi-stage build**: Сборка в Node.js, запуск в Nginx
- **Production оптимизация**: Минификация, gzip сжатие
- **Reverse Proxy**: API запросы проксируются к backend
- **SPA поддержка**: Правильная обработка Angular роутинга

### MongoDB:
- **Персистентность**: Данные сохраняются в Docker volume
- **Инициализация**: Автоматическое создание пользователя и индексов
- **Health Check**: Проверка доступности базы данных

## 🔍 Мониторинг и отладка

### Проверка состояния:
```bash
# Статус всех сервисов
docker-compose ps

# Health check статус
docker inspect todo-backend --format='{{.State.Health.Status}}'
docker inspect todo-frontend --format='{{.State.Health.Status}}'
docker inspect todo-mongodb --format='{{.State.Health.Status}}'
```

### Отладка:
```bash
# Подключение к MongoDB
docker exec -it todo-mongodb mongosh -u admin -p password123

# Просмотр логов в реальном времени
docker-compose logs -f backend

# Проверка сети
docker network ls
docker network inspect my_todo_todo-network
```

## 🚀 Деплой в production

1. **Измените секреты** в `.env` файле
2. **Настройте домен** в nginx.conf
3. **Добавьте SSL** сертификаты
4. **Настройте мониторинг** и логирование
5. **Создайте бэкапы** MongoDB

## 📊 Производительность

- **Frontend**: ~15MB (Nginx + статика)
- **Backend**: ~150MB (Node.js + зависимости)
- **MongoDB**: ~400MB (база данных)

Общий размер: ~565MB

## 🎯 Следующие шаги

- [ ] Настройка CI/CD pipeline
- [ ] Добавление мониторинга (Prometheus + Grafana)
- [ ] Настройка логирования (ELK Stack)
- [ ] Добавление Redis для кэширования
- [ ] Настройка SSL/TLS
- [ ] Автоматические бэкапы MongoDB
