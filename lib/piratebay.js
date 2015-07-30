import request from 'request'
import cheerio from 'cheerio'

function parseBody(body, callback) {
  var $ = cheerio.load(body)
  var rows = $("#searchResult tr")

  var results = rows.map((index, element) => {
    var row = $(element)
    var name = row.find(".detLink").text().trim()
    var link = row.find('*[alt="Magnet link"]').parent().attr('href')
    var description = row.find(".detDesc").text().trim()
    var matched = description.match(/Size ([0-9\.])+/)
    var size = matched ? matched[1] : null
    var seeders = Number(row.find("td:nth-child(3)").text().trim())
    var leechers = Number(row.find("td:nth-child(4)").text().trim())

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

export default class Piratebay {
  constructor(baseUrl) {
    this.baseUrl = baseUrl ? baseUrl : 'https://thepiratebay.gd'
  }

  name() {
    return "piratebay"
  }

  list(page=0, callback) {
    var url = (page == 0) ? `${this.baseUrl}/recent` : `${this.baseUrl}/recent/${page}`
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
    var url = `${this.baseUrl}/s/?q=${query}&page=0&orderby=99`
    request(url, (error, response, body) => {
      if (error) {
        callback(error, null)
        return
      }
      parseBody(body, callback)
    })
  }
}
