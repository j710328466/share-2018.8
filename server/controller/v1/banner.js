import bannerModel from '../../models/v1/banner'

class Banner {
  constructor() {
  }
  
  sort(req, res, next) {
    bannerModel.find(req.body)
      .then(result => {
        res.send(result)
      })
  }
  // 发布
  publish(req, res, next) {
    console.log(req.body)
    bannerModel.create(req.body)
      .then((result) => {
        res.send(result)
      })
  }

  delete(req, res, next) {
    bannerModel.deleteOne({ _id: Object(req.body._id) })
      .then(result => {
        res.send(result)
      })
  }
}

export default new Banner()
