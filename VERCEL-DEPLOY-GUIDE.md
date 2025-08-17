# ⚡ Деплой Frontend на Vercel

## Предварительные требования

- ✅ Backend успешно задеплоен на Render
- ✅ URL backend получен (например: https://todo-backend-xxxx.onrender.com)
- ✅ GitHub репозиторий с кодом проекта

## Шаг 1: Создание аккаунта Vercel

1. Перейдите на https://vercel.com
2. Нажмите **"Start Deploying"** или **"Sign Up"**
3. Выберите **"Continue with GitHub"** (рекомендуется)
4. Авторизуйте Vercel доступ к GitHub

## Шаг 2: Обновление environment файла

Перед деплоем обновите production environment с реальным URL backend:

```typescript
// todo-frontend/src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://todo-backend-xxxx.onrender.com/api'  // Замените на ваш реальный URL
};
```

Закоммитьте изменения:
```bash
git add todo-frontend/src/environments/environment.prod.ts
git commit -m "Update production API URL"
git push origin main
```

## Шаг 3: Импорт проекта в Vercel

1. В Vercel Dashboard нажмите **"Add New..."** → **"Project"**
2. Найдите ваш GitHub репозиторий `my-todo-app`
3. Нажмите **"Import"**

## Шаг 4: Настройка проекта

### 4.1 Основные настройки

```
Project Name: todo-frontend
Framework Preset: Angular
Root Directory: todo-frontend
```

### 4.2 Build настройки

Vercel автоматически определит настройки, но проверьте:

```
Build Command: npm run build
Output Directory: dist/todo-frontend
Install Command: npm install
```

### 4.3 Node.js версия

```
Node.js Version: 18.x (рекомендуется)
```

## Шаг 5: Environment Variables (если нужны)

Для Angular обычно не требуются environment variables в Vercel, так как все настройки компилируются в build time. Но если нужно:

```
NODE_ENV=production
```

## Шаг 6: Деплой

1. Нажмите **"Deploy"**
2. Vercel начнет автоматический build и deploy
3. Процесс займет 2-4 минуты
4. Следите за логами в реальном времени

### Ожидаемые логи при успешном деплое:

```
Running "npm run build"
✓ Building Angular app
✓ Compiled successfully
✓ Build completed
✓ Uploading build outputs
✓ Deployment ready
```

## Шаг 7: Получение URL и тестирование

1. После успешного деплоя получите URL:
   ```
   https://todo-frontend-xxxx.vercel.app
   ```

2. Протестируйте приложение:
   - Откройте URL в браузере
   - Проверьте регистрацию нового пользователя
   - Проверьте вход в систему
   - Проверьте создание/удаление/редактирование задач

## Шаг 8: Обновление CORS настроек в Backend

После получения URL frontend обновите CORS в Render:

1. Перейдите в Render Dashboard → ваш backend service
2. Откройте **"Environment"** tab
3. Обновите переменную `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://todo-frontend-xxxx.vercel.app
   ```
4. Сохраните изменения - Render автоматически перезапустит сервис

## Шаг 9: Настройка Custom Domain (опционально)

### 9.1 Бесплатный поддомен Vercel

Vercel предоставляет бесплатные поддомены:
```
https://your-app-name.vercel.app
```

### 9.2 Собственный домен

Если у вас есть собственный домен:

1. В Vercel Dashboard → Project → **"Settings"** → **"Domains"**
2. Добавьте ваш домен
3. Настройте DNS записи согласно инструкциям Vercel
4. Обновите CORS в backend на новый домен

## Шаг 10: Автоматические деплои

Vercel автоматически настраивает:
- **Production деплои** при push в `main` branch
- **Preview деплои** для pull requests
- **Instant rollbacks** при проблемах

## 🔧 Troubleshooting

### Проблема: Build Failed - Angular CLI not found

```bash
# Убедитесь что в package.json есть:
"devDependencies": {
  "@angular/cli": "^19.0.0"
}
```

### Проблема: 404 на роутах Angular

Vercel.json уже настроен для SPA:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Проблема: API calls не работают

```bash
# Проверьте:
# 1. environment.prod.ts содержит правильный URL
# 2. CORS настроен в backend
# 3. Backend сервис запущен в Render
```

### Проблема: Slow API responses

```bash
# Render free tier засыпает после 15 минут
# Первый запрос может занять 30-60 секунд
# Это нормально для бесплатного плана
```

## 📊 Performance оптимизации

### Автоматические оптимизации Vercel:

- ✅ **Global CDN** - контент доставляется из ближайшего сервера
- ✅ **Automatic compression** - Gzip/Brotli сжатие
- ✅ **Image optimization** - автоматическая оптимизация изображений
- ✅ **Edge caching** - кэширование на edge серверах
- ✅ **HTTP/2 & HTTP/3** - современные протоколы

### Angular оптимизации:

```bash
# Уже настроено в angular.json:
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "500kB",
    "maximumError": "1MB"
  }
]
```

## 📋 Чек-лист Vercel Deploy

- [ ] Backend URL обновлен в environment.prod.ts
- [ ] Изменения закоммичены в GitHub
- [ ] Vercel аккаунт создан
- [ ] Проект импортирован с правильными настройками
- [ ] Деплой прошел успешно
- [ ] URL получен и приложение протестировано
- [ ] CORS обновлен в backend
- [ ] Автоматические деплои настроены

## 🎯 Что дальше?

После успешного деплоя frontend:
1. Полное тестирование всего приложения
2. Настройка мониторинга (опционально)
3. Настройка analytics (опционально)
4. Планирование дальнейшего развития

## 💰 Стоимость и лимиты

### Vercel Free Plan:
- ✅ **100GB bandwidth** в месяц
- ✅ **Unlimited static sites**
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Preview deployments**
- ⚠️ **Commercial usage** требует Pro план ($20/месяц)

### Render Free Plan:
- ✅ **750 часов** в месяц
- ✅ **512MB RAM**
- ⚠️ **Automatic sleep** после 15 минут
- ⚠️ **Slow cold starts** (30-60 секунд)

---

**Время выполнения:** 10-15 минут  
**Стоимость:** Бесплатно  
**Performance:** Отличная (Global CDN, Edge caching)
