module.exports = {
  port: 8888,
  url: 'mongodb://132.232.31.112:27017/share',
  session: {
    name: 'SID',
    secret: 'SID',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  }
}
