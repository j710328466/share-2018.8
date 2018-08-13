// 通过 NODE_ENV 设置执行文件
module.exports = {
  port: 8888,
  url: 'mongodb://localhost:27017/share',
  session: {
    name: 'SID',
    secret: 'SID',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    }
  }
}
