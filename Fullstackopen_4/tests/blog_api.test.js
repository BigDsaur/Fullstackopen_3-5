const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

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

test('unique identifier property of blogs is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes field',
    author: 'Tester',
    url: 'http://nolikes.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // Check the response
  expect(response.body.likes).toBe(0)

  // Optional: verify in database
  const blogsAtEnd = await helper.blogsInDb()
  const created = blogsAtEnd.find(b => b.title === 'Blog without likes field')
  expect(created.likes).toBe(0)
})


afterAll(async () => {
  await mongoose.connection.close()
})
