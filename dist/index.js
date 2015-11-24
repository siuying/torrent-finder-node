'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _archive = require('./archive');

var _archive2 = _interopRequireDefault(_archive);

var _dmhy = require('./dmhy');

var _dmhy2 = _interopRequireDefault(_dmhy);

var _nyaa = require('./nyaa');

var _nyaa2 = _interopRequireDefault(_nyaa);

var _popgo = require('./popgo');

var _popgo2 = _interopRequireDefault(_popgo);

var _piratebay = require('./piratebay');

var _piratebay2 = _interopRequireDefault(_piratebay);

exports['default'] = {
  Archive: _archive2['default'], Dmhy: _dmhy2['default'], Nyaa: _nyaa2['default'], Popgo: _popgo2['default'], Piratebay: _piratebay2['default']
};
module.exports = exports['default'];