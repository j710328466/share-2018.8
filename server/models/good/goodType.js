import mongoose from 'mongoose'
import mongo from '../../mongo/mongo'

const Schema = mongoose.Schema;

const goodTypeSchema = new Schema({
  user_id: Number,
  hugeType: String,
  microType: Array,
  createTime: String
})

const GoodType = mongo.model('GoodType', goodTypeSchema);

export default GoodType