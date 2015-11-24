import BaseScraper from './base_scraper'
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

export default class Archive extends BaseScraper {
  name() {
    return "archive"
  }

  list(page=0, callback) {
    var url = "https://archive.org/advancedsearch.php?q="
    url = url + encodeURIComponent("mediatype:(movies)")
    url = url + "+AND+" + encodeURIComponent("format:(Archive BitTorrent)")
    url = url + "&fl[]=identifier,title,mediatype,format&rows=50&output=json"
    url = url + `&page=${page+1}`
    request(url, (error, response, body) => {
      if (error) {
        callback(error, null)
        return
      }
      callback(null, parser(body))
    })
  }

  search(terms, callback) {
    var query = encodeURIComponent(terms)
    var url = "https://archive.org/advancedsearch.php?q="
    url = url + query
    url = url + "+AND+" + encodeURIComponent("mediatype:(movies)")
    url = url + "+AND+" + encodeURIComponent("format:(Archive BitTorrent)")
    url = url + "&fl[]=identifier,title,mediatype,format&rows=50&output=json"
    request(url, (error, response, body) => {
      if (error) {
        callback(error, null)
        return
      }
      callback(null, parser(body))
    })
  }
}
