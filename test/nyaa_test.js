import mocha from 'mocha'
import expect from 'expect.js'
import Nyaa from '../lib/nyaa'

describe('Nyaa', () => {
  var scraper = null

  beforeEach(() => {
    scraper = new Nyaa()
  })

  describe('#name', () => {
    it('should be nyaa', () => {
      expect(scraper.name()).to.equal("nyaa")
    })
  })

  describe('#list', () => {
    it('should fetch page 0', (done) => {
      scraper.list(0, (error, result) => {
        expect(result).to.be.ok()
        expect(result.length > 0).to.be.ok()
        done()
      })
    })

    it('should fetch page 1', (done) => {
      scraper.list(1, (error, result) => {
        expect(result).to.be.ok()
        expect(result.length > 0).to.be.ok()
        done()
      })
    })
  })

  describe('#search', () => {
    it('should find something', (done) => {
      scraper.search('Arslan Senki', (error, results) => {
        expect(results).to.be.ok()
        expect(results.length > 0).to.be.ok()

        var result = results[0]
        expect(result.category).to.be.ok()
        expect(result.size).to.be.ok()
        expect(result.name).to.be.ok()
        expect(result.name).to.match(/Arslan/)
        expect(result.link).to.be.ok()
        done()
      })
    })
  })
})
