import request from 'request'
import cheerio from 'cheerio'

function parseBody(body, callback) {
  var $ = cheerio.load(body)
  var rows = $("#topic_list tr")
  var results = rows.map((index, element) => {
    var row = $(element)
    var name = row.find("td.title > a").text().trim()
    var link = row.find('a.arrow-magnet').attr('href')
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

export default class DMHY {
  name() {
    return "dmhy"
  }

  list(page=0, callback) {
    var url = (page == 0) ? "http://share.dmhy.org/" : `http://share.dmhy.org/topics/list/page/${page+1}`
    request(url, (error, response, body) => {
      if (error) {
        callback(error, null)
        return
      }
      parseBody(body, callback)
    })
  }

  search(terms, callback) {
    var url = "http://share.dmhy.org/topics/list"
    request({method: 'POST', uri: url, form: {keyword: terms}}, (error, response, body) => {
      if (error) {
        callback(error, null)
        return
      }
      parseBody(body, callback)
    })
  }
}
