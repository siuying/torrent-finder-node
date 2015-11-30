"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base_scraper = require('./base_scraper');

var _base_scraper2 = _interopRequireDefault(_base_scraper);

function parseListBody($) {
  var rows = $("tr.tlr, tr.tlz");
  var results = rows.map(function (index, element) {
    var row = $(element);
    var name = row.find(".tli a").text().trim();
    var linkPath = row.find("td:nth-child(1) a").attr('href');
    var link = linkPath ? "http://extratorrent.cc" + linkPath : null;
    var size = row.find("td:nth-child(3)").text().trim();
    var category = null;
    var seeders = Number(row.find("td:nth-child(4)").text().trim());
    var leechers = Number(row.find("td:nth-child(5)").text().trim());
    return {
      name: name,
      link: link,
      category: category,
      size: size,
      seeders: seeders,
      leechers: leechers
    };
  }).toArray().filter(function (r) {
    return r.name && r.link;
  });
  return results;
}

function parseSearchBody($) {
  var rows = $("tr.tlr, tr.tlz");
  var results = rows.map(function (index, element) {
    var row = $(element);
    var name = row.find(".tli a").text().trim();
    var linkPath = row.find("td:nth-child(1) a").attr('href');
    var link = linkPath ? "http://extratorrent.cc" + linkPath : null;
    var size = row.find("td:nth-child(4)").text().trim();
    var categoryText = row.find("td:nth-child(2) a").attr('title');
    var category = categoryText ? categoryText.replace("Browse ", "") : null;
    var seeders = Number(row.find("td:nth-child(5)").text().trim());
    var leechers = Number(row.find("td:nth-child(6)").text().trim());

    return {
      name: name,
      link: link,
      category: category,
      size: size,
      seeders: seeders,
      leechers: leechers
    };
  }).toArray().filter(function (r) {
    return r.name && r.link;
  });
  return results;
}

var Extra = (function (_BaseScraper) {
  _inherits(Extra, _BaseScraper);

  function Extra() {
    _classCallCheck(this, Extra);

    _get(Object.getPrototypeOf(Extra.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Extra, [{
    key: "name",
    value: function name() {
      return "extra";
    }
  }, {
    key: "list",
    value: function list(page, callback) {
      if (page === undefined) page = 0;

      var url = "http://extratorrent.cc/";
      return this.requestAndParse(url, parseListBody, callback);
    }
  }, {
    key: "search",
    value: function search(terms, callback) {
      var query = encodeURIComponent(terms);
      var url = "http://extratorrent.cc/search/?search=" + query + "&new=1&x=0&y=0";
      return this.requestAndParse(url, parseSearchBody, callback);
    }
  }]);

  return Extra;
})(_base_scraper2["default"]);

exports["default"] = Extra;
module.exports = exports["default"];