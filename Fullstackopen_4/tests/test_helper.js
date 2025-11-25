const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "First blog",
    author: "John Doe",
    url: "http://example.com",
    likes: 5
  },
  {
    title: "Second blog",
    author: "Jane Doe",
    url: "http://example2.com",
    likes: 7
  }
]

// Returns all blogs in DB as plain JS objects
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}
