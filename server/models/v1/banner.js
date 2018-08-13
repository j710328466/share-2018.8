import mongoose from 'mongoose'
import mongo from '../../mongo/mongo'

const Schema = mongoose.Schema;

const bannerSchema = new Schema({
  title: String,
  position: String,
  href: String,
  img: String
})

const Banner = mongo.model('Banner', bannerSchema);

export default Banner