const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('creation succeeds with a fresh username', async () => {
  const usersAtStart = await User.find({})

  const newUser = {
    username: 'newuser',
    name: 'New User',
    password: 'mypassword'
  }

  await api.post('/api/users').send(newUser).expect(201)

  const usersAtEnd = await User.find({})
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

test('creation fails if username is too short', async () => {
  const newUser = {
    username: 'ab',
    password: '12345'
  }

  const result = await api.post('/api/users').send(newUser).expect(400)

  expect(result.body.error).toContain('username')
})

test('creation fails if password is too short', async () => {
  const newUser = {
    username: 'validname',
    password: '12'
  }

  const result = await api.post('/api/users').send(newUser).expect(400)

  expect(result.body.error).toContain('password')
})

afterAll(async () => {
  await mongoose.connection.close()
})
