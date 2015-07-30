import request from 'request'
import cheerio from 'cheerio'

const USER_AGENT = "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0"

function parseBody(body, callback) {
  var $ = cheerio.load(body)
  var rows = $("#index_maintable tr")
  var results = rows.map((index, element) => {
    var row = $(element)
    var name = row.find(".inde_tab_seedname a").text().trim()
    var link = row.find('td:nth-child(10) a').attr('href')
    var size = row.find("td:nth-child(5)").text().trim()
    var seeders = Number(row.find("td:nth-child(6)").text().trim())
    var leechers = Number(row.find("td:nth-child(7)").text().trim())
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

export default class Popgo {
  name() {
    return "popgo"
  }

  list(page=0, callback) {
    var url = (page == 0) ? "http://share.popgo.org/" : `http://share.popgo.org/search.php?title=&groups=&uploader=&sorts=&orderby=&page=${page+1}`
    request({uri: url, headers: {'User-Agent': USER_AGENT}, gzip: true}, (error, response, body) => {
      if (error) {
        callback(error, null)
        return
      }
      parseBody(body, callback)
    })
  }

  search(terms, callback) {
    var query = encodeURIComponent(terms)
    var url = `http://share.popgo.org/search.php?title=${query}&groups=&uploader=&sorts=&orderby=`
    request({uri: url, headers: {'User-Agent': USER_AGENT}, gzip: true}, (error, response, body) => {
      if (error) {
        callback(error, null)
        return
      }
      parseBody(body, callback)
    })
  }
}
