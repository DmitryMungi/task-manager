# Этап 1: Сборка Angular приложения
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci && npm cache clean --force

# Копируем исходный код
COPY . .

# Собираем приложение для production
RUN npm run build

# Этап 2: Production образ с Nginx
FROM nginx:alpine AS production

# Копируем собранное приложение из предыдущего этапа
COPY --from=build /app/dist/todo-frontend/browser /usr/share/nginx/html

# Копируем кастомную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Создаем директории для логов
RUN mkdir -p /var/log/nginx

# Открываем порт 80
EXPOSE 80

# Добавляем health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
