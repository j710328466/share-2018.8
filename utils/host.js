const host = (() => {
  if (process.env.NODE_ENV === 'development') {
    return {
      apiUrl: 'http://localhost:8888'
    }
  } else if (process.env.NODE_ENV === 'production') {
    return {
    }
  }
  return null
})()

export default host
