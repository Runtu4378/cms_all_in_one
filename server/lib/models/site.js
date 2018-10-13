'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteSchema = new Schema({
  name: { type: String, required: true } // 站点名
}, { collection: 'site' });

module.exports = mongoose.model('Site', SiteSchema);
//# sourceMappingURL=site.js.map
