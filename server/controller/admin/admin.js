import AdminModel from '../../models/admin/admin'

class Admin {
  login (req, res, next) {
    AdminModel.findOne(req.body)
      .then(result => {
        console.log(result)
        if (result == null) {
          res.end('登录失败');
        } else {
          // console.log('登录成功')
          res.end(JSON.stringify(result));
        }
      })
  }

  register (req, res, next) {
    var filter = {
      name: req.body.name,
      pwd: req.body.pwd,
      id: req.body.id,
      createTime: req.body.createTime,
      admin: req.body.admin,
      status: req.body.status,  //1:普通管理、 2:超级管理员
      avatar: req.body.avatar
    }
    console.log(req.body)
    AdminModel.find(filter)
      .then(result => {
        if (result.length === 0) {
          console.log('管理员可注册！')
          AdminModel.create(req.body)
            .then(result => {
              res.end(JSON.stringify(result));
            })
        } else {
          res.end('该管理员账号已存在！');
        }
      })
  }

  // 管理员筛选
  sort (req, res, next) {
    AdminModel.find(req.body)
      .then(result => {
        res.send(result)
      })
  }

  delete (req, res, next) {
    AdminModel.deleteOne({ _id: Object(req.body._id) })
      .then(result => {
        res.send(result)
      })
  }
}

export default new Admin()
