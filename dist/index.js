'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function parseBody(body, callback) {
  var $ = _cheerio2['default'].load(body);
  var rows = $("#topic_list tr");
  var results = rows.map(function (r) {
    var row = $(r);
    var title = row.find("td.title");
    $('.tag', title).remove();
    var name = title.find("a").text().trim();
    var magnetLink = row.find('a.arrow-magnet');
    var link = magnetLink.attr('href');
    return { name: name, link: link };
  }).filter(function (r) {
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

      url = page == 0 ? "http://share.dmhy.org/" : 'http://share.dmhy.org/topics/list/page/' + (page + 1);
      response = (0, _request2['default'])(url, function (error, response, body) {
        if (error) {
          callback(error);
          return;
        }
        parseBody(body, callback);
      });
    }
  }]);

  return DMHY;
})();
