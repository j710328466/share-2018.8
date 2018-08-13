import mongoose from 'mongoose'
import mongo from '../../mongo/mongo'

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderNum: String,
  title: String,
  freight: Number,
  publisher: String,
  publishAddr: String,
  publishTel: String,
  buyer: String,
  buyerAddr: String,
  buyerTel: String,
  createTime: String,
  UpdateTime: String,
  finishTime: String
})

const Order = mongo.model('Order', orderSchema);

export default Order