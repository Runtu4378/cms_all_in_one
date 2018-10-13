const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SiteSchema = new Schema({
  name: { type: String, required: true }, // 站点名
}, { collection: 'site' })

module.exports = mongoose.model('Site', SiteSchema)
