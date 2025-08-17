const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

const SECRET = process.env.JWT_SECRET || 'fallback_secret_key'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d'

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Имя и пароль обязательны' });
    }

    const candidate = await User.findOne({ username })

    if (candidate) {
      return res.status(400).json({ message: 'Пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPassword })
    await user.save()

    res.status(201).json({ message: 'Пользователь зарегистрирован' })
  } catch (err) {
    console.error('Ошибка регистрации:', err)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// Логин
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный пароль' })
    }

    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId: user._id }, SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

    res.json({ token, refreshToken })
  } catch (err) {
    console.error('Ошибка входа:', err)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// REFRESH — обновление access токена
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Нет refresh токена' });
  }

  try {
    const payload = jwt.verify(refreshToken, SECRET);

    // можно сделать проверку на БД, IP и т.д.
    const newAccessToken = jwt.sign(
      { userId: payload.userId },
      SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ token: newAccessToken });
  } catch (err) {
    console.error('Ошибка refresh:', err);
    return res.status(401).json({ message: 'Недействительный refresh токен' });
  }
});

module.exports = router
