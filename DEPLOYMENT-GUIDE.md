# 🚀 Руководство по облачному деплою TODO App

## 📋 План деплоя (бесплатный вариант)

### 🎯 Выбранные платформы:
- **База данных**: MongoDB Atlas (Free - 512MB)
- **Backend**: Render (Free tier)
- **Frontend**: Vercel (Free tier)

---

## 🗂️ Этап 1: Подготовка к деплою

### ✅ Что уже готово:
- [x] Docker контейнеры протестированы
- [x] Environment переменные настроены
- [x] Код оптимизирован для production

### 📝 Что нужно сделать:

#### 1. MongoDB Atlas
- [ ] Создать аккаунт на MongoDB Atlas
- [ ] Создать бесплатный кластер
- [ ] Настроить пользователя БД
- [ ] Получить connection string
- [ ] Настроить IP whitelist

#### 2. Backend на Render
- [ ] Создать аккаунт на Render
- [ ] Подключить GitHub репозиторий
- [ ] Настроить environment переменные
- [ ] Деплой backend сервиса
- [ ] Получить URL backend API

#### 3. Frontend на Vercel
- [ ] Создать аккаунт на Vercel
- [ ] Подключить GitHub репозиторий
- [ ] Настроить build команды
- [ ] Настроить environment переменные
- [ ] Деплой frontend приложения

#### 4. Финальная настройка
- [ ] Обновить CORS настройки
- [ ] Протестировать все функции
- [ ] Обновить документацию

---

## 🔧 Технические детали

### Environment переменные для production:

#### Backend (Render):
```
NODE_ENV=production
PORT=10000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/todo-app
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=https://your-app.vercel.app
```

#### Frontend (Vercel):
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

---

## 📚 Полезные ссылки:

- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Render](https://render.com/)
- [Vercel](https://vercel.com/)

---

## ⚠️ Важные моменты:

1. **Render Free tier** - засыпает через 15 минут неактивности
2. **MongoDB Atlas Free** - лимит 512MB данных
3. **Vercel Free** - лимит 100GB bandwidth/месяц
4. **CORS** - обязательно настроить правильные домены
5. **HTTPS** - все платформы автоматически предоставляют SSL

---

## 🎯 Ожидаемый результат:

После завершения деплоя получим:
- 🌐 **Frontend URL**: https://todo-app-username.vercel.app
- 🔧 **Backend URL**: https://todo-backend-username.onrender.com
- 🗄️ **Database**: MongoDB Atlas cluster
- 🔒 **HTTPS**: Автоматически на всех сервисах
- 📱 **Responsive**: Работает на всех устройствах

---

*Обновлено: 17.08.2025*
