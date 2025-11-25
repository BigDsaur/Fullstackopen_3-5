const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {

  const listWithOneBlog = [
    {
      title: 'Test blog',
      author: 'Tester',
      url: 'http://example.com',
      likes: 5
    }
  ]

  const listWithManyBlogs = [
    { title: 'a', author: 'x', url: '1', likes: 2 },
    { title: 'b', author: 'y', url: '2', likes: 8 },
    { title: 'c', author: 'z', url: '3', likes: 3 }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(13)
  })
})

describe('favorite blog', () => {

  const blogs = [
    { title: 'a', author: 'x', url: '1', likes: 2 },
    { title: 'b', author: 'y', url: '2', likes: 10 },
    { title: 'c', author: 'z', url: '3', likes: 5 }
  ]

  test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[1])
  })
})