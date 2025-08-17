# 🚀 Деплой Backend на Render

## Предварительные требования

- ✅ MongoDB Atlas настроен и connection string получен
- ✅ GitHub репозиторий с кодом проекта
- ✅ Аккаунт на GitHub

## Шаг 1: Создание аккаунта Render

1. Перейдите на https://render.com
2. Нажмите **"Get Started for Free"**
3. Зарегистрируйтесь через **GitHub аккаунт** (рекомендуется)
4. Подтвердите email если требуется

## Шаг 2: Подготовка GitHub репозитория

### 2.1 Создание репозитория (если еще не создан)

1. Перейдите на https://github.com
2. Нажмите **"New repository"**
3. Заполните:
   ```
   Repository name: my-todo-app
   Description: Full-stack TODO app with Angular + Node.js + MongoDB
   Visibility: Public (для бесплатного плана)
   ```
4. Нажмите **"Create repository"**

### 2.2 Загрузка кода в репозиторий

```bash
# В корневой папке проекта MY_TODO
git init
git add .
git commit -m "Initial commit: Full-stack TODO app ready for deployment"
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/my-todo-app.git
git push -u origin main
```

## Шаг 3: Создание Web Service на Render

1. В Render Dashboard нажмите **"New +"**
2. Выберите **"Web Service"**
3. Подключите GitHub репозиторий:
   - Нажмите **"Connect account"** если нужно
   - Найдите репозиторий `my-todo-app`
   - Нажмите **"Connect"**

## Шаг 4: Настройка Web Service

### 4.1 Основные настройки

```
Name: todo-backend
Region: Frankfurt (EU Central) или ближайший
Branch: main
Root Directory: todo-backend
Runtime: Node
```

### 4.2 Build & Deploy настройки

```
Build Command: npm install
Start Command: npm start
```

### 4.3 Plan выбор

- Выберите **"Free"** план
- 512 MB RAM, 0.1 CPU
- Автоматический sleep после 15 минут неактивности
- 750 часов в месяц бесплатно

## Шаг 5: Настройка Environment Variables

В разделе **"Environment Variables"** добавьте:

```env
NODE_ENV=production
PORT=10000
MONGODB_URL=mongodb+srv://todouser:ВАШ_ПАРОЛЬ@todo-cluster.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
JWT_SECRET=ваш_супер_секретный_ключ_для_production
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=https://ваш-frontend.vercel.app
```

⚠️ **ВАЖНО:**
- Замените `ВАШ_ПАРОЛЬ` на реальный пароль от MongoDB
- Сгенерируйте новый `JWT_SECRET` для production
- `CORS_ORIGIN` пока оставьте как есть, обновим после деплоя frontend

### Генерация JWT_SECRET

Используйте один из способов:
```bash
# Способ 1: Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Способ 2: OpenSSL
openssl rand -hex 64

# Способ 3: Онлайн генератор
# https://generate-secret.vercel.app/64
```

## Шаг 6: Деплой

1. Нажмите **"Create Web Service"**
2. Render начнет автоматический деплой
3. Процесс займет 3-5 минут
4. Следите за логами в реальном времени

### Ожидаемые логи при успешном деплое:

```
==> Building...
npm install
==> Starting service...
npm start
🚀 Сервер запущен: http://localhost:10000
✅ Успешно подключено к MongoDB
```

## Шаг 7: Получение URL и тестирование

1. После успешного деплоя получите URL:
   ```
   https://todo-backend-xxxx.onrender.com
   ```

2. Протестируйте API:
   ```bash
   # Тест основного эндпоинта
   curl https://todo-backend-xxxx.onrender.com
   # Ответ: "👋 Добро пожаловать в ToDo backend!"

   # Тест регистрации
   curl -X POST https://todo-backend-xxxx.onrender.com/api/register \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","password":"testpass123"}'
   ```

## Шаг 8: Обновление CORS настроек

После получения URL backend:

1. Обновите environment variable `CORS_ORIGIN` в Render
2. Обновите `todo-frontend/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://todo-backend-xxxx.onrender.com/api'
   };
   ```

## 🔧 Troubleshooting

### Проблема: Build Failed
```bash
# Проверьте package.json в todo-backend
# Убедитесь что есть "start": "node server.js"
```

### Проблема: MongoDB Connection Error
```bash
# Проверьте:
# 1. Connection string правильный
# 2. IP whitelist включает 0.0.0.0/0
# 3. Пользователь БД имеет права на чтение/запись
```

### Проблема: Service Sleeping
```bash
# Free план засыпает после 15 минут
# Первый запрос после сна займет 30-60 секунд
# Для production рассмотрите платный план ($7/месяц)
```

## 📋 Чек-лист Render Deploy

- [ ] GitHub репозиторий создан и код загружен
- [ ] Render аккаунт создан
- [ ] Web Service создан с правильными настройками
- [ ] Environment variables настроены
- [ ] Деплой прошел успешно
- [ ] URL получен и протестирован
- [ ] CORS настройки обновлены

## 🎯 Что дальше?

После успешного деплоя backend:
1. Обновите frontend environment с реальным URL
2. Деплой frontend на Vercel
3. Финальное тестирование всего приложения

---

**Время выполнения:** 15-20 минут  
**Стоимость:** Бесплатно (Free tier)  
**Лимиты:** 512MB RAM, автоматический sleep, 750 часов/месяц
