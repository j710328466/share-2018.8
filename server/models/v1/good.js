import mongoose from 'mongoose'
import mongo from '../../mongo/mongo'

const Schema = mongoose.Schema;

const goodSchema = new Schema({
  user_id: String,
  buyer: Object,
  tel: Number,
  title: String,
  desc: String,
  pics: Array,
  price: Number,
  state: String,
  type: String,
  freight: String,
  publishAddr: String,
  createTime: String,
  UpdateTime: String,
  finishTime: String
})

const Good = mongo.model('Good', goodSchema);

export default Good