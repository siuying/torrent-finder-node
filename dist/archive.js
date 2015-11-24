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

function requestAndParse(url, callback) {
  if (typeof callback === 'function') {
    (0, _request2['default'])(url, function (error, response, body) {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, parser(body));
    });
    return;
  }

  return new _es6Promise.Promise(function (resolve, reject) {
    var categories;
    (0, _request2['default'])(url, function (error, response, body) {
      if (error) {
        reject(error);
        return;
      }
      resolve(parser(body));
    });
  });
}

var Archive = (function () {
  function Archive() {
    _classCallCheck(this, Archive);
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
      return requestAndParse(url, callback);
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
      return requestAndParse(url, callback);
    }
  }]);

  return Archive;
})();

exports['default'] = Archive;
module.exports = exports['default'];