import {Promise} from 'es6-promise'
import request from 'request'

function parser(body) {
  var rows = JSON.parse(body)
  return rows.response.docs.map((f) => {
    return {
      name: f.title,
      link: `https://archive.org/download/${f.identifier}/${f.identifier}_archive.torrent`,
      category: f.mediatype
    }
  })
}

function requestAndParse(url, callback) {
  if (typeof callback === 'function') {
    request(url, (error, response, body) => {
      if (error) {
        callback(error, null)
        return
      }
      try {
        callback(null, parser(body))
      } catch (e) {
        reject(e)
      }
    })
    return
  }

  return new Promise(function(resolve, reject) {
      var categories;
      request(url, (error, response, body) => {
        if (error) {
          reject(error)
          return
        }
        try {
          resolve(parser(body))
        } catch (e) {
          reject(e)
        }        
      })
  });
}

export default class Archive {
  name() {
    return "archive"
  }

  list(page=0, callback) {
    var url = "https://archive.org/advancedsearch.php?q="
    url = url + encodeURIComponent("mediatype:(movies)")
    url = url + "+AND+" + encodeURIComponent("format:(Archive BitTorrent)")
    url = url + "&fl[]=identifier,title,mediatype,format&rows=50&output=json"
    url = url + `&page=${page+1}`
    return requestAndParse(url, callback)
  }

  search(terms, callback) {
    var url = "https://archive.org/advancedsearch.php?q="
    if (terms) {
      var query = encodeURIComponent(terms)
      url = url + query + "+AND+"
    }
    url = url + encodeURIComponent("mediatype:(movies)")
    url = url + "+AND+" + encodeURIComponent("format:(Archive BitTorrent)")
    url = url + "&fl[]=identifier,title,mediatype,format&rows=50&output=json"
    return requestAndParse(url, callback)
  }
}
