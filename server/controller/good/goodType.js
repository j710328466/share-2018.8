import GoodTypeModel from '../../models/good/goodType'

class GoodType {
  constructor () {

  }

  sort (req, res, next) {
    GoodTypeModel.find(req.body).then(goodTypes => {
      res.send(goodTypes)
    })
  }

  delete (req, res, next) {
    GoodTypeModel.find({_id: Object(req.body.id)}).then(goodType => {
      if (goodType) {
        GoodTypeModel.updateOne({ _id: Object(req.body.id) }, {$pull: {microType: goodType[0].microType[req.body.index]}}).then(result => {
          res.send(result)
        })
      }
    })
  }

  add (req, res, next) {
    // $elemMatch 对一条数据中的摸个数组属性进行遍历查询
    GoodTypeModel.find({ hugeType: req.body.hugeType}).then(goodTypes => {
      if (goodTypes.length) {
        let tF = goodTypes[0].microType.indexOf(req.body.microType)
        if (tF === -1) {
          GoodTypeModel.updateOne({ hugeType: req.body.hugeType }, {$push: {microType: req.body.microType}}).then(result => {
            res.send(result)
          })
        } else {
          res.send('该项目已存在！')
        }
      } else {
        console.log('新增')
        GoodTypeModel.create(req.body).then(result => {
          res.send(result)
        })
      }
    })
  }
}

export default new GoodType()