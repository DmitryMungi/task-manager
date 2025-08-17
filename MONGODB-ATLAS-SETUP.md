# 🍃 Настройка MongoDB Atlas для TODO приложения

## Шаг 1: Создание аккаунта MongoDB Atlas

1. Перейдите на https://www.mongodb.com/atlas
2. Нажмите **"Try Free"** или **"Start Free"**
3. Зарегистрируйтесь используя:
   - Email и пароль
   - Или через Google/GitHub аккаунт

## Шаг 2: Создание организации и проекта

1. После регистрации создайте **Organization** (например: "My TODO Apps")
2. Создайте **Project** (например: "TODO Production")

## Шаг 3: Создание кластера (БЕСПЛАТНЫЙ TIER)

1. Нажмите **"Build a Database"**
2. Выберите **"M0 Sandbox"** (FREE TIER)
   - 512 MB storage
   - Shared RAM and vCPU
   - No backup
   - Подходит для разработки и небольших проектов

3. **Выбор провайдера и региона:**
   - Provider: **AWS** (рекомендуется)
   - Region: **Frankfurt (eu-central-1)** или ближайший к вам
   - Cluster Name: `todo-cluster`

4. Нажмите **"Create Cluster"** (создание займет 1-3 минуты)

## Шаг 4: Настройка безопасности

### 4.1 Создание пользователя базы данных

1. В левом меню выберите **"Database Access"**
2. Нажмите **"Add New Database User"**
3. Заполните данные:
   ```
   Authentication Method: Password
   Username: todouser
   Password: [СГЕНЕРИРУЙТЕ СЛОЖНЫЙ ПАРОЛЬ]
   ```
4. **Database User Privileges:** выберите **"Read and write to any database"**
5. Нажмите **"Add User"**

⚠️ **ВАЖНО:** Сохраните username и password - они понадобятся для connection string!

### 4.2 Настройка Network Access (IP Whitelist)

1. В левом меню выберите **"Network Access"**
2. Нажмите **"Add IP Address"**
3. Выберите **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Это нужно для Render, так как у них динамические IP
4. Нажмите **"Confirm"**

## Шаг 5: Получение Connection String

1. Вернитесь в **"Database"** (левое меню)
2. Найдите ваш кластер и нажмите **"Connect"**
3. Выберите **"Connect your application"**
4. Выберите:
   - Driver: **Node.js**
   - Version: **4.1 or later**
5. Скопируйте connection string:
   ```
   mongodb+srv://todouser:<password>@todo-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Шаг 6: Настройка базы данных

1. В connection string замените:
   - `<password>` на ваш реальный пароль
   - Добавьте имя базы данных: `todo-app`

**Финальный connection string:**
```
mongodb+srv://todouser:ВАШ_ПАРОЛЬ@todo-cluster.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
```

## Шаг 7: Тестирование подключения (опционально)

Можете протестировать подключение локально:

1. Обновите `.env` файл:
   ```env
   MONGODB_URL=mongodb+srv://todouser:ВАШ_ПАРОЛЬ@todo-cluster.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
   ```

2. Запустите backend:
   ```bash
   cd todo-backend
   npm run dev
   ```

3. Проверьте логи - должно быть: "✅ Успешно подключено к MongoDB"

## 🎯 Что дальше?

После настройки MongoDB Atlas:
1. Сохраните connection string для настройки в Render
2. Переходите к деплою backend на Render
3. Затем деплой frontend на Vercel

## 📋 Чек-лист MongoDB Atlas

- [ ] Аккаунт создан
- [ ] Кластер M0 (free tier) создан
- [ ] Пользователь базы данных создан
- [ ] IP адреса разрешены (0.0.0.0/0)
- [ ] Connection string получен и сохранен
- [ ] Подключение протестировано (опционально)

---

**Время выполнения:** 10-15 минут  
**Стоимость:** Бесплатно (M0 tier)  
**Лимиты:** 512MB, 100 подключений одновременно
