// Скрипт инициализации MongoDB
// Создает пользователя для базы данных todo-app

db = db.getSiblingDB('todo-app');

// Создаем пользователя для приложения
db.createUser({
  user: 'todoapp',
  pwd: 'todoapp123',
  roles: [
    {
      role: 'readWrite',
      db: 'todo-app'
    }
  ]
});

// Создаем индексы для оптимизации
db.users.createIndex({ "username": 1 }, { unique: true });
db.todos.createIndex({ "userId": 1 });
db.todos.createIndex({ "createdAt": -1 });

print('MongoDB initialization completed successfully!');
