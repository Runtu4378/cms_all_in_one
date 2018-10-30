const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropSchema = new Schema({
  name: { type: String, required: true },
  defaultValue: {}, // 任意类型的数据
  dsec: { type: String },
})

const ComponentSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: [
    'PURE', // 纯组件（不含子组件）
    'RICH',  // 富组件（可以拥有子组件）
  ] },
  code_type: { type: String, required: true, enum: [
    'artm',
    'vue',
  ]},
  html_code: String,
  html_transformer: { type: String, required: true, enum: [
    'html', // 纯html代码编译
    'artm',  // art-template编译
  ] },
  html_proptypes: [ PropSchema ],
  
  css_code: String,
  css_transformer: { type: String, required: true, enum: [
    'css', // 纯css代码编译
    'less',  // less编译
  ] },
  css_proptypes: [ PropSchema ],

  js_code: String,
  js_transformer: { type: String, required: true, enum: [
    'js', // 纯js代码编译
  ] },
  js_proptypes: [ PropSchema ],
}, { collection: 'component' })

module.exports = mongoose.model('Component', ComponentSchema)
