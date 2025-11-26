const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const app = express()

mongoose.set('strictQuery', false)

logger.info('Connecting to MongoDB…')

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error('Error connecting to MongoDB:', error.message))

// 🔥 These MUST come BEFORE routers
app.use(cors())
app.use(express.json())

// 🔥 Now request.body will work properly
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
