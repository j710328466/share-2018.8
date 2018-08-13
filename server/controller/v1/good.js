import goodModel from '../../models/v1/good'

class Good {
  constructor() {
  }

  sort(req, res, next) {
    goodModel.find(req.body)
      .then(result => {
        res.send(result)
      })
  }

  search (req, res, next) {
    goodModel.find({
      'title': { 
        $regex: req.body.title, 
        $options: 'i' 
      }
    }).then(result => {
        res.send(result)
    })
  }

  // 发布
  publish(req, res, next) {
    console.log(req.body)
    goodModel.create(req.body)
      .then((result) => {
        res.send(result)
      })
  }

  // 购买
  buy(req, res, next) {
    goodModel.updateOne({ _id: Object(req.body._id)}, {
      $set: {
        state: req.body.state,
        buyer: req.body.buyer
      }
    }).then(result => {
      console.log
      result.status = '1000'
      res.send(result)
    })
  }

  delete (req, res, next) {
    goodModel.deleteOne({ _id: Object(req.body._id) })
      .then(result => {
        res.send(result)
      })
  }

  // 已发布
  published(req, res, next) {

  }

  // 收藏的
  like(req, res, next) {

  }
}

export default new Good()
