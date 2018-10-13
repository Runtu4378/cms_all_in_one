'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropSchema = new Schema({
  name: { type: String, required: true },
  defaultValue: {}, // 任意类型的数据
  dsec: { type: String }
});

var ComponentSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['PURE', // 纯组件（不含子组件）
    'RICH'] },
  html_code: String,
  html_transformer: { type: String, required: true, enum: ['html', // 纯html代码编译
    'artm'] },
  html_proptypes: [PropSchema],

  css_code: String,
  css_transformer: { type: String, required: true, enum: ['css', // 纯css代码编译
    'less'] },
  css_proptypes: [PropSchema],

  js_code: String,
  js_transformer: { type: String, required: true, enum: ['js'] },
  js_proptypes: [PropSchema]
}, { collection: 'component' });

module.exports = mongoose.model('Component', ComponentSchema);
//# sourceMappingURL=component.js.map
