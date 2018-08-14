import userModel from '../../models/user/user'

class User {
  /*
    登录
  */
  login (req, res, next) {
    userModel.findOne({
      "data.userName": req.body.userName
    }).then(result => {
      if (result == null) {
        res.end(JSON.stringify({code: 1001, message: '账号不存在'}))
      } else {
        // console.log('登录成功')
        res.end(JSON.stringify(result))
      }
    })
  }

  /*
    注册
  */
  register (req, res) {
    userModel.find({
      "data.userName": req.body.userName
    }).then(result => {
      if (result.length === 0) {
        userModel.create({
          code: 200,
          data: req.body
        }).then(result => {
          res.end(JSON.stringify({
            code: 200,
            data: result.data
          }))
        })
      } else {
        res.end(JSON.stringify({code: 1002, message: '账号已存在！'}))
      }
    })
  }

  // 细节
  detail (req, res, next) {
    userModel.findOne(req.body)
      .then(result => {
        if (result) {
          res.send(result)
        }
      })
  }

  // 修改地址 push插入 pop删除 pull删除指定 set修改元素 addToSet和each组合使用插入多个
  addAddress (req, res, next) {
    console.log(req.body)
    userModel.updateOne(req.body.user, {
      $push: req.body.data
    }).then(result => {
      res.send(result)
    })
  }

  // 所有用户
  all (req, res, next) {
    userModel.find(req.body)
      .then(result => {
        res.send(result)
      })
  }

  del (req, res, next) {
    userModel.deleteOne({ _id: Object(req.body._id) })
      .then(result => {
        res.send(result)
      })
  }
}

export default new User()
