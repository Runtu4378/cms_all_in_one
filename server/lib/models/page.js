'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
  route_id: { type: String, required: true }, // 所属路由id
  path: { type: String } // 页面生成路径
}, { collection: 'page' });

module.exports = PageSchema;
//# sourceMappingURL=page.js.map
