'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function parseBody(body, callback) {
  var $ = _cheerio2['default'].load(body);
  var rows = $("#topic_list tr");
  var results = rows.map(function (index, element) {
    var row = $(element);
    var name = row.find("td.title > a").text().trim();
    var link = row.find('a.arrow-magnet').attr('href');
    var size = row.find("td:nth-child(5)").text().trim();
    var seeders = Number(row.find("td:nth-child(6)").text().trim());
    var leechers = Number(row.find("td:nth-child(7)").text().trim());
    return {
      name: name,
      link: link,
      size: size,
      seeders: seeders,
      leechers: leechers
    };
  }).toArray().filter(function (r) {
    return r.name && r.link;
  });
  callback(null, results);
}

var DMHY = (function () {
  function DMHY() {
    _classCallCheck(this, DMHY);
  }

  _createClass(DMHY, [{
    key: 'name',
    value: function name() {
      return "dmhy";
    }
  }, {
    key: 'list',
    value: function list(page, callback) {
      if (page === undefined) page = 0;

      var url = page == 0 ? "http://share.dmhy.org/" : 'http://share.dmhy.org/topics/list/page/' + (page + 1);
      (0, _request2['default'])(url, function (error, response, body) {
        if (error) {
          callback(error, null);
          return;
        }
        parseBody(body, callback);
      });
    }
  }, {
    key: 'search',
    value: function search(terms, callback) {
      var url = "http://share.dmhy.org/topics/list";
      (0, _request2['default'])({ method: 'POST', uri: url, form: { keyword: terms } }, function (error, response, body) {
        if (error) {
          callback(error, null);
          return;
        }
        parseBody(body, callback);
      });
    }
  }]);

  return DMHY;
})();

exports['default'] = DMHY;
module.exports = exports['default'];
