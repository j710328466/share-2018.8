import OrderModel from '../../models/v1/order'

class Order {
  constructor () {

  }

  create (req, res, next) {
    OrderModel.create(req.body)
      .then((result) => {
        res.send(result)
      })
  }
}

export default new Order()
