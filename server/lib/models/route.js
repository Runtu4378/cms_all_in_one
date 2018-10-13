'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
  route_id: { type: String, required: true }, // 所属路由id
  path: { type: String } // 页面生成路径
});

var Component = new Schema({
  com_id: { type: Schema.Types.ObjectId, required: true }
});

var ComponentTree = new Schema({
  com_id: { type: Schema.Types.ObjectId, required: true },
  children: [Component]
});

var RouteSchema = new Schema({
  sid: { type: String, required: true }, // 路由所属站点id
  parent_id: { type: String }, // 父路由id
  name: { type: String, required: true }, // 路由名
  path: { type: String, required: true }, // 路由规则
  type: { type: String, required: true, enum: ['single', // 单页路由
    'page', // 分页路由
    'multi'] }, // 路由规则
  pages: { type: [PageSchema], default: [] },
  template: { type: [ComponentTree], default: [] }
}, { collection: 'route' });

module.exports = mongoose.model('Route', RouteSchema);
//# sourceMappingURL=route.js.map
