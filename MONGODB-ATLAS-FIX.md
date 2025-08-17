# MongoDB Atlas - Исправление настроек для Render

## 🎯 Проблема
Backend на Render не может подключиться к MongoDB Atlas. Нужно настроить доступ.

## 🔧 Пошаговое исправление:

### 1. Зайти в MongoDB Atlas
- Открыть https://cloud.mongodb.com/
- Войти в аккаунт (mungalinio)
- Выбрать проект с кластером `todo-cluster`

### 2. Настроить Network Access (IP Whitelist)

**Шаги:**
1. В левом меню нажать **"Network Access"**
2. Нажать **"+ ADD IP ADDRESS"**
3. Выбрать **"ALLOW ACCESS FROM ANYWHERE"**
4. Или вручную добавить: `0.0.0.0/0`
5. Добавить комментарий: `Render deployment access`
6. Нажать **"Confirm"**

**Почему это нужно:**
- Render использует динамические IP адреса
- `0.0.0.0/0` разрешает доступ с любого IP
- Это стандартная практика для cloud deployment

### 3. Проверить Database Access (пользователя)

**Шаги:**
1. В левом меню нажать **"Database Access"**
2. Найти пользователя `mungalinio`
3. Проверить, что:
   - **Password**: `V5fh0EiuTmlcKbLj`
   - **Database User Privileges**: `Atlas admin` или `Read and write to any database`
   - **Status**: Active

**Если пользователя нет или пароль неверный:**
1. Нажать **"+ ADD NEW DATABASE USER"**
2. **Username**: `mungalinio`
3. **Password**: `V5fh0EiuTmlcKbLj`
4. **Database User Privileges**: выбрать `Read and write to any database`
5. Нажать **"Add User"**

### 4. Проверить Connection String

**Правильная строка подключения:**
```
mongodb+srv://mungalinio:V5fh0EiuTmlcKbLj@todo-cluster.g3rt8tp.mongodb.net/todo-app?retryWrites=true&w=majority&appName=todo-cluster
```

**Проверить в Atlas:**
1. Нажать **"Connect"** на кластере
2. Выбрать **"Connect your application"**
3. Скопировать connection string
4. Заменить `<password>` на `V5fh0EiuTmlcKbLj`
5. Добавить `/todo-app` после `.net`

### 5. После изменений в Atlas

**В Render Dashboard:**
1. Зайти в Web Service
2. Settings → Environment Variables
3. Проверить/обновить `MONGODB_URL`
4. Нажать **"Save Changes"**
5. Дождаться автоматического redeploy

### 6. Тестирование

**После redeploy проверить:**
```bash
curl -X POST https://task-manager-mbwa.onrender.com/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

**Ожидаемый результат:**
```json
{"message":"Пользователь зарегистрирован"}
```

## ⚠️ Важные моменты:

1. **Безопасность**: `0.0.0.0/0` открывает доступ всем, но MongoDB требует аутентификацию
2. **Время применения**: Изменения в Network Access применяются 1-2 минуты
3. **Redeploy**: После изменений в Render обязательно нужен redeploy

## 🔍 Диагностика проблем:

**Если все еще не работает:**
1. Проверить логи в Render Dashboard
2. Убедиться, что connection string точно совпадает
3. Проверить, что кластер активен в Atlas
4. Попробовать подключиться из MongoDB Compass с той же строкой

## 📞 Следующие шаги:
После исправления MongoDB Atlas → Redeploy в Render → Тестирование API → Деплой frontend на Vercel
