const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'First test blog maurilta',
    author: 'Tester One',
    url: 'http://example1.com',
    likes: 11
  },
  {
    title: 'Second test blog matilta',
    author: 'Tester Two',
    url: 'http://example2.com',
    likes: 12
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
