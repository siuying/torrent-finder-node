'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _base_scraper = require('./base_scraper');

var _base_scraper2 = _interopRequireDefault(_base_scraper);

var _es6Promise = require('es6-promise');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function parser(body) {
  var rows = JSON.parse(body);
  return rows.response.docs.map(function (f) {
    return {
      name: f.title,
      link: 'https://archive.org/download/' + f.identifier + '/' + f.identifier + '_archive.torrent',
      category: f.mediatype
    };
  });
}

var Archive = (function (_BaseScraper) {
  _inherits(Archive, _BaseScraper);

  function Archive() {
    _classCallCheck(this, Archive);

    _get(Object.getPrototypeOf(Archive.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Archive, [{
    key: 'name',
    value: function name() {
      return "archive";
    }
  }, {
    key: 'list',
    value: function list(page, callback) {
      if (page === undefined) page = 0;

      var url = "https://archive.org/advancedsearch.php?q=";
      url = url + encodeURIComponent("mediatype:(movies)");
      url = url + "+AND+" + encodeURIComponent("format:(Archive BitTorrent)");
      url = url + "&fl[]=identifier,title,mediatype,format&rows=50&output=json";
      url = url + ('&page=' + (page + 1));
      (0, _request2['default'])(url, function (error, response, body) {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, parser(body));
      });
    }
  }, {
    key: 'search',
    value: function search(terms, callback) {
      var query = encodeURIComponent(terms);
      var url = "https://archive.org/advancedsearch.php?q=";
      url = url + query;
      url = url + "+AND+" + encodeURIComponent("mediatype:(movies)");
      url = url + "+AND+" + encodeURIComponent("format:(Archive BitTorrent)");
      url = url + "&fl[]=identifier,title,mediatype,format&rows=50&output=json";
      (0, _request2['default'])(url, function (error, response, body) {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, parser(body));
      });
    }
  }]);

  return Archive;
})(_base_scraper2['default']);

exports['default'] = Archive;
module.exports = exports['default'];