import BaseScraper from './base_scraper'

function parseListBody($) {
  var rows = $("tr.tlr, tr.tlz")
  var results = rows.map((index, element) => {
    var row = $(element)
    var name = row.find(".tli a").text().trim()
    var linkPath = row.find("td:nth-child(1) a").attr('href')
    var link = linkPath ? `http://extratorrent.cc${linkPath}` : null
    var size = row.find("td:nth-child(3)").text().trim()
    var category = null
    var seeders = Number(row.find("td:nth-child(4)").text().trim())
    var leechers = Number(row.find("td:nth-child(5)").text().trim())
    return {
      name: name,
      link: link,
      category: category,
      size: size,
      seeders: seeders,
      leechers: leechers
    }
  }).toArray().filter((r) => r.name && r.link)
  return results
}

function parseSearchBody($) {
  var rows = $("tr.tlr, tr.tlz")
  var results = rows.map((index, element) => {
    var row = $(element)
    var name = row.find(".tli a").text().trim()
    var linkPath = row.find("td:nth-child(1) a").attr('href')
    var link = linkPath ? `http://extratorrent.cc${linkPath}` : null
    var size = row.find("td:nth-child(4)").text().trim()
    var categoryText = row.find("td:nth-child(2) a").attr('title')
    var category = categoryText ? categoryText.replace("Browse ", "") : null
    var seeders = Number(row.find("td:nth-child(5)").text().trim())
    var leechers = Number(row.find("td:nth-child(6)").text().trim())

    return {
      name: name,
      link: link,
      category: category,
      size: size,
      seeders: seeders,
      leechers: leechers
    }
  }).toArray().filter((r) => r.name && r.link)
  return results
}

export default class Extra extends BaseScraper {
  name() {
    return "extra"
  }

  list(page=0, callback) {
    var url = "http://extratorrent.cc/"
    return this.requestAndParse(url, parseListBody, callback)
  }

  search(terms, callback) {
    var query = encodeURIComponent(terms)
    var url = `http://extratorrent.cc/search/?search=${query}&new=1&x=0&y=0`
    return this.requestAndParse(url, parseSearchBody, callback)
  }
}
