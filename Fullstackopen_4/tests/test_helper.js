const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First test blog maurilta',
    author: 'Tester One',
    url: 'http://example1.com',
    likes: 1,
  },
  {
    title: 'Second test blog matilta',
    author: 'Tester Two',
    url: 'http://example2.com',
    likes: 2,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}