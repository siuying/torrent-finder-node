import {Promise} from 'es6-promise'
import request from 'request'
import kickass from 'kickass-torrent'

function mapper(data) {
  return data.list.map((element, index) => {
    return {
      name: element.title,
      link: element.torrentLink,
      category: element.category,
      size: element.size,
      seeders: element.seeds,
      leechers: element.leechs
    }
  })
}

export default class Kickass {
  name() {
    return "kickass"
  }

  list(page=0, callback) {
    return this.requestKickass("category:movies category:tv category:anime", callback)
  }

  search(terms, callback) {
    return this.requestKickass(terms, callback)
  }

  requestKickass(terms, callback) {
    if (typeof callback === 'function') {
      kickass({q: terms, field:'seeders', url: 'https://kat.cr'}, (error, data) => {
        if (error) {
          callback(error)
          return
        }

        var result = mapper(data)
        return callback(null, result)
      })
      return
    }

    return new Promise(function(resolve, reject) {
        var categories;
        kickass({q: terms, field:'seeders', url: 'https://kat.cr'}, (error, data) => {
          if (error) {
            reject(error)
            return
          }

          var result = mapper(data)
          return resolve(result)
        })
    });
  }
}
