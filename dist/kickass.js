'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _es6Promise = require('es6-promise');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _kickassTorrent = require('kickass-torrent');

var _kickassTorrent2 = _interopRequireDefault(_kickassTorrent);

function mapper(data) {
  return data.list.map(function (element, index) {
    return {
      name: element.title,
      link: element.torrentLink,
      category: element.category,
      size: element.size,
      seeders: element.seeds,
      leechers: element.leechs
    };
  });
}

var Kickass = (function () {
  function Kickass() {
    _classCallCheck(this, Kickass);
  }

  _createClass(Kickass, [{
    key: 'name',
    value: function name() {
      return "kickass";
    }
  }, {
    key: 'list',
    value: function list(page, callback) {
      if (page === undefined) page = 0;

      return this.requestKickass("category:movies category:tv category:anime", callback);
    }
  }, {
    key: 'search',
    value: function search(terms, callback) {
      return this.requestKickass(terms, callback);
    }
  }, {
    key: 'requestKickass',
    value: function requestKickass(terms, callback) {
      if (typeof callback === 'function') {
        (0, _kickassTorrent2['default'])({ q: terms, field: 'seeders', url: 'https://kat.cr' }, function (error, data) {
          if (error) {
            callback(error);
            return;
          }

          var result = mapper(data);
          return callback(null, result);
        });
        return;
      }

      return new _es6Promise.Promise(function (resolve, reject) {
        var categories;
        (0, _kickassTorrent2['default'])({ q: terms, field: 'seeders', url: 'https://kat.cr' }, function (error, data) {
          if (error) {
            reject(error);
            return;
          }

          var result = mapper(data);
          return resolve(result);
        });
      });
    }
  }]);

  return Kickass;
})();

exports['default'] = Kickass;
module.exports = exports['default'];