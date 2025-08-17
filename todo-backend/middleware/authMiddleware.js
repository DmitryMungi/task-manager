const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'fallback_secret_key'

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Отсутствует токен авторизации' })
    }
  
    const token = authHeader.split(' ')[1]
  
    try {
      const decoded = jwt.verify(token, SECRET)
      req.userId = decoded.userId
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Неверный или просроченный токен' })
    }
  }
  
  module.exports = authMiddleware;
