# 🧪 Тестирование и мониторинг облачного деплоя

## Предварительные требования

- ✅ MongoDB Atlas настроен и работает
- ✅ Backend задеплоен на Render
- ✅ Frontend задеплоен на Vercel
- ✅ CORS настройки обновлены

## 🔍 Полное функциональное тестирование

### 1. Тестирование Backend API

#### 1.1 Основные эндпоинты

```bash
# Замените YOUR_BACKEND_URL на ваш реальный URL
export BACKEND_URL="https://todo-backend-xxxx.onrender.com"

# Тест главной страницы
curl $BACKEND_URL
# Ожидаемый ответ: "👋 Добро пожаловать в ToDo backend!"

# Тест регистрации
curl -X POST $BACKEND_URL/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
# Ожидаемый ответ: {"message":"Пользователь зарегистрирован"}

# Тест входа
curl -X POST $BACKEND_URL/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
# Ожидаемый ответ: {"token":"...", "refreshToken":"..."}
```

#### 1.2 Тестирование с токеном

```bash
# Сохраните токен из предыдущего запроса
export TOKEN="ваш_полученный_токен"

# Тест получения задач
curl -X GET $BACKEND_URL/api/todos \
  -H "Authorization: Bearer $TOKEN"
# Ожидаемый ответ: []

# Тест создания задачи
curl -X POST $BACKEND_URL/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Тестовая задача"}'
# Ожидаемый ответ: {"_id":"...", "title":"Тестовая задача", ...}
```

### 2. Тестирование Frontend

#### 2.1 Базовая функциональность

1. **Откройте приложение** в браузере: `https://todo-frontend-xxxx.vercel.app`

2. **Тест регистрации:**
   - Перейдите на страницу регистрации
   - Введите username и password
   - Нажмите "Зарегистрироваться"
   - Проверьте успешное перенаправление

3. **Тест входа:**
   - Введите данные зарегистрированного пользователя
   - Нажмите "Войти"
   - Проверьте перенаправление на страницу задач

4. **Тест CRUD операций:**
   - Создайте новую задачу
   - Отметьте задачу как выполненную
   - Отредактируйте задачу
   - Удалите задачу

#### 2.2 Тестирование в разных браузерах

- ✅ **Chrome** (последняя версия)
- ✅ **Firefox** (последняя версия)
- ✅ **Safari** (если доступен)
- ✅ **Edge** (последняя версия)

#### 2.3 Мобильное тестирование

- ✅ **Responsive design** на разных размерах экрана
- ✅ **Touch interactions** работают корректно
- ✅ **Performance** на мобильных устройствах

### 3. Performance тестирование

#### 3.1 Frontend Performance (Vercel)

```bash
# Используйте Google PageSpeed Insights
https://pagespeed.web.dev/

# Или Lighthouse в Chrome DevTools
# Ожидаемые результаты:
# Performance: 90+
# Accessibility: 90+
# Best Practices: 90+
# SEO: 80+
```

#### 3.2 Backend Performance (Render)

```bash
# Тест времени ответа
time curl $BACKEND_URL/api/todos \
  -H "Authorization: Bearer $TOKEN"

# Ожидаемые результаты:
# Cold start (после сна): 30-60 секунд
# Warm requests: 200-500ms
```

## 📊 Мониторинг и логирование

### 1. Render мониторинг

#### 1.1 Встроенные метрики

В Render Dashboard доступны:
- **CPU usage**
- **Memory usage**
- **Response times**
- **Error rates**
- **Deployment logs**

#### 1.2 Настройка алертов

```bash
# В Render Dashboard → Settings → Notifications
# Настройте уведомления для:
# - Deploy failures
# - Service downtime
# - High error rates
```

### 2. Vercel мониторинг

#### 2.1 Analytics

```bash
# В Vercel Dashboard → Analytics
# Доступны метрики:
# - Page views
# - Unique visitors
# - Top pages
# - Performance metrics
```

#### 2.2 Real User Monitoring

```bash
# Vercel автоматически собирает:
# - Core Web Vitals
# - Page load times
# - Error rates
# - Geographic distribution
```

### 3. MongoDB Atlas мониторинг

#### 3.1 Встроенные метрики

```bash
# В MongoDB Atlas Dashboard → Monitoring
# Доступны:
# - Connection count
# - Operations per second
# - Query performance
# - Storage usage
```

#### 3.2 Настройка алертов

```bash
# В Atlas → Alerts
# Рекомендуемые алерты:
# - High connection count (>80)
# - Slow queries (>1000ms)
# - Storage usage (>80%)
# - Replica set elections
```

## 🚨 Troubleshooting распространенных проблем

### 1. Backend проблемы

#### Проблема: Service sleeping (Render Free)
```bash
# Симптомы: Первый запрос занимает 30-60 секунд
# Решение: Это нормально для Free tier
# Альтернатива: Upgrade до Starter план ($7/месяц)
```

#### Проблема: MongoDB connection timeout
```bash
# Проверьте:
# 1. Connection string правильный
# 2. IP whitelist включает 0.0.0.0/0
# 3. Пользователь БД существует и имеет права
# 4. Кластер не приостановлен (Atlas может приостанавливать неактивные кластеры)
```

#### Проблема: CORS errors
```bash
# Проверьте:
# 1. CORS_ORIGIN в Render environment variables
# 2. URL frontend точно совпадает (включая https://)
# 3. Нет лишних слешей в конце URL
```

### 2. Frontend проблемы

#### Проблема: API calls fail
```bash
# Проверьте:
# 1. environment.prod.ts содержит правильный backend URL
# 2. Backend сервис запущен и доступен
# 3. Network tab в DevTools для деталей ошибок
```

#### Проблема: 404 на Angular routes
```bash
# Убедитесь что vercel.json настроен:
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 3. Database проблемы

#### Проблема: Slow queries
```bash
# В Atlas → Performance Advisor
# Создайте индексы для часто используемых полей:
# - userId (для фильтрации задач по пользователю)
# - createdAt (для сортировки)
```

## 📈 Оптимизация производительности

### 1. Backend оптимизации

```javascript
// Добавьте в server.js для production
if (process.env.NODE_ENV === 'production') {
  // Compression middleware
  const compression = require('compression');
  app.use(compression());
  
  // Rate limiting
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use('/api/', limiter);
}
```

### 2. Frontend оптимизации

```typescript
// Lazy loading для роутов
const routes: Routes = [
  {
    path: 'todos',
    loadComponent: () => import('./pages/todos/todos.component').then(m => m.TodosComponent)
  }
];
```

### 3. Database оптимизации

```javascript
// Создание индексов в MongoDB
db.todos.createIndex({ userId: 1 });
db.todos.createIndex({ createdAt: -1 });
db.users.createIndex({ username: 1 }, { unique: true });
```

## 📋 Чек-лист финального тестирования

### Backend тестирование
- [ ] Основные API эндпоинты работают
- [ ] Аутентификация функционирует
- [ ] CRUD операции с задачами работают
- [ ] MongoDB подключение стабильно
- [ ] Логи не содержат критических ошибок

### Frontend тестирование
- [ ] Регистрация пользователей работает
- [ ] Вход в систему функционирует
- [ ] Все CRUD операции с задачами работают
- [ ] Responsive design корректен
- [ ] Performance метрики приемлемы

### Интеграционное тестирование
- [ ] Frontend успешно взаимодействует с Backend
- [ ] CORS настройки корректны
- [ ] Аутентификация работает end-to-end
- [ ] Данные корректно сохраняются в MongoDB

### Мониторинг
- [ ] Render метрики настроены
- [ ] Vercel analytics активирован
- [ ] MongoDB Atlas мониторинг настроен
- [ ] Алерты настроены для критических метрик

---

**Время выполнения тестирования:** 30-45 минут  
**Рекомендуемая частота проверок:** Еженедельно  
**Критические метрики для мониторинга:** Uptime, Response time, Error rate
