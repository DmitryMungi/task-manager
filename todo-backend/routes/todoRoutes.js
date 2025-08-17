const express = require('express')
const Todo = require('../models/Todo')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// Все маршруты защищены авторизацией
router.use(authMiddleware)

/**
 * GET /api/todos
 * Получить все задачи текущего пользователя
 */
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(todos)
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения задач' })
  }
})

/**
 * POST /api/todos
 * Создать новую задачу
 */
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;

     // Валидация
     if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Поле "title" обязательно для заполнения' });
    }

    const todo = new Todo({ title, userId: req.userId })
    await todo.save()
    res.status(201).json(todo)
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при создании задачи' })
  }
})

/**
 * PUT /api/todos/:id
 * Обновить задачу (если принадлежит текущему пользователю)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    // Валидация
    if ('title' in req.body && (!req.body.title || req.body.title.trim() === '')) {
      return res.status(400).json({ message: 'Поле "title" обязательно для заполнения' })
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, completed },
      { new: true }
    )

    if (!todo) return res.status(404).json({ message: 'Задача не найдена или доступ запрещён' })

    res.json(todo)
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при обновлении задачи' })
  }
})

/**
 * DELETE /api/todos/:id
 * Удалить задачу (если принадлежит текущему пользователю)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const deleted = await Todo.findOneAndDelete({ _id: id, userId: req.userId })

    if (!deleted) return res.status(404).json({ message: 'Задача не найдена или доступ запрещён' })

    res.json({ message: 'Задача удалена' })
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при удалении задачи' })
  }
})

module.exports = router