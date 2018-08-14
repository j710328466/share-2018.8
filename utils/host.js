const host = (() => {
  if (process.env.NODE_ENV === 'development') {
    return {
      apiUrl: 'http://localhost:8888'
    }
  } else if (process.env.NODE_ENV === 'production') {
    return {
      apiUrl: 'http://132.232.31.112:8888'
    }
  }
  return null
})()

export default host
