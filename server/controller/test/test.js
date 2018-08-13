class Test {
  constructor(props) {

  }
  test(req, res, next) {
    console.log(req)
    res.send({
      status: 0,
      type: 'TEST',
      message: '测试接口'
    })
  }
}


export default new Test()