import request from 'request'
import cheerio from 'cheerio'

function parseBody(body, callback) {
  var $ = cheerio.load(body)
  var rows = $(".tlist .tlistrow")
  var results = rows.map((index, element) => {
    var row = $(element)
    var name = row.find(".tlistname").text().trim()
    var link = row.find('.tlistdownload a').attr('href')
    var size = row.find(".tlistsize").text().trim()
    var seeders = Number(row.find(".tlistsn").text().trim())
    var leechers = Number(row.find(".tlistln").text().trim())
    return {
      name: name,
      link: link,
      size: size,
      seeders: seeders,
      leechers: leechers
    }
  }).toArray().filter((r) => r.name && r.link)
  callback(null, results)
}

export default class Nyaa {
  name() {
    return "nyaa"
  }

  list(page=0, callback) {
    var url = (page == 0) ? "http://www.nyaa.se/" : `http://www.nyaa.se/?offset=${page}`
    request(url, (error, response, body) => {
      if (error) {
        callback(error, null)
        return
      }
      parseBody(body, callback)
    })
  }

  search(terms, callback) {
    var query = encodeURIComponent(terms)
    var url = "http://www.nyaa.se/?page=search&term=" + query
    request({uri: url, form: {keyword: terms}}, (error, response, body) => {
      if (error) {
        callback(error, null)
        return
      }
      parseBody(body, callback)
    })
  }
}
